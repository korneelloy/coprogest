import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { forkJoin, switchMap } from 'rxjs';


import { AgMinutes } from '../../../model/agminutes';
import { AgMinutesService } from '../../../services/agminutes/ag-minutes-service';

import { AgResolution } from '../../../model/agresolution';
import { AgResolutionService } from '../../../services/agResolution/ag-resolution-service';
import { AgNoticeService } from '../../../services/agnotice/ag-notice-service';

import { Person } from '../../../model/person';
import { PersonService } from '../../../services/person/person-service';

import { AgMinutesPresencePerson } from '../../../model/agminutespresenceperson';
import { AgminutespresencepersonService } from '../../../services/agminutespresenceperson/agminutespresenceperson-service';

import { AgResolutionPerson } from '../../../model/agresolutionperson';
import { AgResolutionPersonService } from '../../../services/agResolutionPerson/ag-resolution-person-service';

import { UnitGroup } from '../../../model/unitgroup';
import { UnitGroupService } from '../../../services/unit-groups/unit-group-service';

import { Share } from '../../../model/share';

import { ChargeLine } from '../../../model/chargeLine';
import { ChargeLineService } from '../../../services/chargeLine/charge-line-service';

import { RequiredMajorityLabelPipe } from '../../../label/requiredMajority/required-majority-label-pipe';
import { StatusLabelPipe } from '../../../label/status/status-label-pipe';
import { VoteLabelPipe } from '../../../label/vote/vote-label-pipe';


@Component({
  selector: 'app-ag-minutes-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, FormsModule, RequiredMajorityLabelPipe, StatusLabelPipe, VoteLabelPipe],
  templateUrl: './ag-minutes-form.html',
  styleUrl: './ag-minutes-form.scss'
})
export class AgMinutesForm implements OnInit {
  agMinutesForm: FormGroup;
  isEditMode = false;
  agMinutesId: string | null = null;
  agResolutions: AgResolution[] = [];
  agResolutionWithDetails: AgResolution[] = [];
  allNoticesWithoutMinutes: AgResolution[] = [];
  persons$!: Observable<Person[]>;
  persons: Person[] = [];
  uniquePersons: Person[] = [];
  
  unitGroup$!: Observable<UnitGroup[]>;
  unitGroup: UnitGroup[] = [];
  unitGroupDict: { [id: string]: string } = {};
  unitGroupShares: { [groupId: string]: number } = {};

  votes$!: Observable<AgResolutionPerson[]>;
  votes: AgResolutionPerson[] = [];

  selectedVotes: { [agResolutionId: string]: { [personId: string]: string } } = {};

  presence: string = "";
  
  selectedPersonsOnly: AgMinutesPresencePerson[] = [];
  selectedPersonsIdOnly: string[] = [];

  deletedMessage: string | null = null;
  updatedMessage: string | null = null;
 
  incompleteVotesMessages: Record<string, string | null> = {};

  resolution: AgResolution = {} as AgResolution;

  formatVote(vote: string | null): string {
    switch (vote) {
      case 'for': return 'Pour';
      case 'against': return 'Contre';
      case 'abstention': return 'Abstention';
      default: return '—';
    }
  }
  
  formatStatus(status: string | null): string {
    switch (status) {
      case 'accepted':
        return 'Cette résolution a été définitivement adoptée.';
      case 'rejected':
        return 'Cette résolution a été définitivement rejetée.';
      default:
        return 'Statut non défini.';
    }
  }

  shares: Share[] = [];
 

  formValidation = { valid: true, message: '' };

  presenceChange: boolean = false;

  voteMessage: { [agResolutionId: string]: string } = {};
  voteError: { [agResolutionId: string]: string } = {};


  changeNextVoteCheckFor_25_1: string = "";
  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private agMinutesService: AgMinutesService,
    private agResolutionService: AgResolutionService,
    private agNoticeService : AgNoticeService,
    private personService: PersonService,
    private agminutespresencepersonService: AgminutespresencepersonService,
    private agResolutionPersonService: AgResolutionPersonService,
    private unitGroupService: UnitGroupService,
    private chargeLineService: ChargeLineService,
  ) {
    this.agMinutesForm = this.fb.group({
      ag_date: [''],
      ag_time: [''],
      place: [''],
      notice_id: [''],
      uniquePersons:['']
    });
  }

  ngOnInit(): void {
    
    /** check if id > edit or create */
    this.agMinutesId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.agMinutesId;

    /** if creation mode > get the list of AG Notices which do not yet have a Ag Minute */

    if (!this.isEditMode){
      this.agResolutionService.fetchAllNoticesWithoutMinutes().subscribe((data: AgResolution[]) => {
        this.allNoticesWithoutMinutes = data;
        console.log("allNoticesWithoutMinutes", this.allNoticesWithoutMinutes);
      });     
      
      /** set validator only for creation mode - basicaly 2 different forms in reality*/
      this.agMinutesForm.get('notice_id')?.setValidators([Validators.required]);

    /** else if change mode: */
    } else if (this.isEditMode) {
      
      /** handling of messages for deleting or updating ag minutes */
      this.route.queryParams.subscribe(params => {
        if (params['deleted'] === 'true') {
          this.deletedMessage = "Le compte rendu a été supprimée avec succès.";
        } else if (params['updated'] === 'true') {
          this.updatedMessage = "Le compte rendu a été mise à jour avec succès.";
          setTimeout(() => {
            this.updatedMessage = null;
            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: { updated: null },
              queryParamsHandling: 'merge'
            });
          }, 5000);
        }
      });

      /** set validator only for change mode - basicaly 2 different forms in reality*/
      this.agMinutesForm.get('ag_date')?.setValidators([Validators.required]);
      this.agMinutesForm.get('ag_time')?.setValidators([Validators.required]);
      this.agMinutesForm.get('place')?.setValidators([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255)
      ])

      /** fetch the basic ag minutes info from the database to prefill the form */
      this.agMinutesService.fetchById(this.agMinutesId!).subscribe((agMinutes: AgMinutes) => {
        const dateObj = new Date(agMinutes.minutes_date);
        const pad = (n: number) => n.toString().padStart(2, '0');

        const datePart = `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(dateObj.getDate())}`;
        const timePart = `${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}`;
        this.agMinutesForm.patchValue({
          place: agMinutes.place,
          ag_date: datePart,
          ag_time: timePart
        });
      });

      /** everybody with at least one unit */
      this.persons$ = this.personService.getAllWithUnitInfo();

      /**list of unique persons */
      this.persons$.subscribe(data => {
        this.uniquePersons = data;
        this.uniquePersons = this.uniquePersons.filter(
          (person, index, self) =>
            index === self.findIndex(p => p.id === person.id)
        );
      });
     

      /**
       * Create a persons array with:
       * Level 1: An array of all persons who own at least one unit
       * Level 2: For each person, an array of all units they own
       * Level 3: For each unit, an array of all unit groups the unit belongs to
       * 
       */

      this.persons$.subscribe(data => {
        const personMap = new Map<string, any>();
      
        for (const row of data) {
          // Create person if not already present
          if (!personMap.has(row.id)) {
            personMap.set(row.id, {
              id: row.id,
              email: row.email,
              first_name: row.first_name,
              last_name: row.last_name,
              units: []
            });
          }
      
          const person = personMap.get(row.id);
      
          // Check if unit already added to this person
          let unit = person.units.find((u: any) => u.id === row.unit_id);
          if (!unit) {
            unit = {
              id: row.unit_id,
              name: row.unit_name,
              shares: row.unit_shares,
              unit_groups: []
            };
            person.units.push(unit);
          }
      
          // Add unit group if present and not already added
          if (row.unit_group_name) {
            const exists = unit.unit_groups.some((g: any) => g.name === row.unit_group_name);
            if (!exists) {
              unit.unit_groups.push({
                name: row.unit_group_name,
                id: row.unit_group_id,
                special_shares: row.unit_group_special_shares,
                adjusted_shares: row.adjusted_shares
              });
            }
          }
        }
      
        this.persons = Array.from(personMap.values());
      });

       /** get presence from database and keep them in local memory */
       this.agminutespresencepersonService.fetchAllByMinutes(this.agMinutesId!).subscribe((agMinutesPresencePerson: AgMinutesPresencePerson[]) => {
        agMinutesPresencePerson.forEach(presence => {
          this.selectedPersonsOnly.push({
            id_person: presence.id_person,
            id_ag_minutes: this.agMinutesId!,
            presence: presence.presence,
            represented_by: presence.represented_by
          });
          this.selectedPersonsIdOnly.push(presence.id_person);
        });
      });

      /** get all resolutions for this ag minute */  
      this.agResolutionService.fetchAllByAgMinutes(this.agMinutesId!).subscribe((agResolutions: AgResolution[]) => {
        this.agResolutions = agResolutions;
      });

      /** fetch all unit groups asynchronously and on data arrival, map unit group IDs to their names.*/
      this.unitGroup$ = this.unitGroupService.fetchAll();
      this.unitGroup$.subscribe(data =>{
        data.forEach(row => {
          if (!this.unitGroupDict[row.id]) {
            this.unitGroupDict[row.id] = row.name;
          }
        });
      });

      /** counting weight of unit groups (total 'tantiemes' per group)y*/
      this.unitGroupShares = {};
      this.unitGroup$.subscribe(data => {
        data.forEach(row => {
          const groupId = row.id;
          const specialShares = row.special_shares;

          if (!this.unitGroupShares[groupId]) {
            this.unitGroupShares[groupId] = 0;
          }

          if (specialShares === 1) {
            if (row.adjusted_shares) {
              this.unitGroupShares[groupId] += Number(row.adjusted_shares);
            }
          } else {
            if (row.unit_shares) {
              this.unitGroupShares[groupId] += Number(row.unit_shares);
            }
          }
        });
      });

      /** get votes from database and store them in memmeory in easy to handle structure */
      this.votes$ = this.agResolutionPersonService.fetchAll();
      this.votes$.subscribe(data => {
        this.votes = data;
        this.selectedVotes = {};

        this.votes.forEach(vote => {
          if (!this.selectedVotes[vote.id_ag_resolution]) {
            this.selectedVotes[vote.id_ag_resolution] = {};
          }
          this.selectedVotes[vote.id_ag_resolution][vote.id_person] = vote.vote;
        });      
      });
      this.updateFormValidation();
    }
  }

  getSelectedVote(resolutionId: string, personId: string): string | null {
    return this.selectedVotes[resolutionId]?.[personId] || null;
  }
  
  onSubmit(): void {
    if (this.agMinutesForm.invalid) return;

    const formData = this.agMinutesForm.value;

    const combinedDateTimeStr = `${formData.ag_date}T${formData.ag_time}:00`;

    const finalData: AgMinutes = {
      ...formData,
      minutes_date: combinedDateTimeStr,
    };


    if (this.isEditMode) { 
      this.agMinutesService.update(this.agMinutesId!, finalData).subscribe(() => {
        // Step 1: Delete existing presence records
        this.agminutespresencepersonService.deleteAllByMinutes(this.agMinutesId!).subscribe(() => {    
          // Step 2: Create new presence records
          const creations = this.selectedPersonsOnly.map(item =>
            this.agminutespresencepersonService.create(item)
          );
          // Step 3: Wait for all creations to complete
          forkJoin(creations).subscribe(() => {
            // Step 4: Navigate after all is done
            this.router.navigate(['/agminutes', this.agMinutesId, 'edit'], {
              queryParams: { updated: 'true' }
            })
              .then(() => {
                this.agMinutesForm.reset(this.agMinutesForm.value);
                this.presenceChange = false;
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              });
            

          });
        });
      });    
   } else {
      this.agNoticeService.fetchById(finalData.notice_id!).subscribe((agNotice) => {
        finalData.place = agNotice.place;
        finalData.minutes_date = agNotice.ag_date;
        this.agMinutesService.create(finalData).subscribe((createdMinutes) => {
          const newMinutesId = createdMinutes.id;      
          this.agResolutionService.fetchAllByAgNotice(finalData.notice_id!).subscribe((resolutions) => {
            resolutions.forEach((resolution) => {
              resolution.id_ag_minutes = newMinutesId;
              this.agResolutionService.updateMinutesLink(resolution.id, newMinutesId).subscribe();
            });
            this.router.navigate(['/agminutes'], { queryParams: { created: 'true' } });
          });
        });
      });
    }
  }

  getPresenceValue(personId: string): string {
    for (const row of this.selectedPersonsOnly) {
      if (row.id_person === personId) {
        return row.presence;
      }
    }
    return '';
  }
  
  getRepresentedValue(personId: string): string {
    for (const row of this.selectedPersonsOnly) {
      if (row.id_person === personId) {
        return row.represented_by;
      }
    }
    return '';
  }

  updateList(personId: string): void {
    this.presenceChange = true;
    let isChecked : Boolean = false;
    let presence: string = "";
    let representedby: string = "";

    const inListEl = document.getElementById('list-' + personId);
    const presenceEl = document.getElementById('presence-' + personId);
    const representedbyEl =  document.getElementById('representedby-' + personId);

    if(inListEl && (inListEl as HTMLInputElement).value) {
      const inList = document.getElementById('list-' + personId) as HTMLInputElement;
      isChecked = inList.checked;
    }

    if(presenceEl && (presenceEl as HTMLInputElement).value) {
      presence = (presenceEl as HTMLInputElement).value;
    }

    if(representedbyEl && (representedbyEl as HTMLInputElement).value) {
      representedby = (representedbyEl as HTMLInputElement).value;
    }

    /** in any case: try to take out of the list(s) to start from scratch */
    const indexEl = this.selectedPersonsOnly.findIndex(p => p.id_person === personId);
    if (indexEl !== -1) {
      this.selectedPersonsOnly.splice(indexEl, 1);
    }
    const indexId = this.selectedPersonsIdOnly.indexOf(personId);
    if (indexId !== -1) {
      this.selectedPersonsIdOnly.splice(indexId, 1);
    }
    
    /** if checked and not marked as absent*/
    if (isChecked && presence !== 'absent') {
      /**create a new  presence, null if var doesn't exists*/
      const newPresence: AgMinutesPresencePerson = {
        id_person: personId,
        id_ag_minutes: this.agMinutesId!,
        presence: presence,
        represented_by: representedby
      };
      /**push on list (s) */
      this.selectedPersonsOnly.push(newPresence);    
      this.selectedPersonsIdOnly.push(personId);
    }
    this.updateFormValidation(); 
  }

  getperson(personId: string): string {
    const found = this.persons.find(p => p.id === personId);
    if (found) {
      if (found.first_name || found.last_name){
        return (found.first_name + " " + found.last_name);
      } else if (found.email) {
        return(found.email);
      } 
    }
    return ("Nom de ce copropriétaire non disponible");
  }

  getvote(personId: string): string {
    const found = this.votes.find(p => p.id_person === personId);
    if (found) {
      if (found.vote){
        return (found.vote);
      }
    }
    return ("Vote non disponible");
  }


  registerVote(agResolutionId: string, idUnitGroup: string, required_majority: string) {
      const elements = document.getElementsByClassName("vote-" + agResolutionId);
      let votesInFavor: number = 0;
      let votesAgainst: number = 0;
      let votesAbstention: number = 0;
      let nbOfForVotes: number = 0;
      let votesUnexpressed: number = 0;
      let nbOfMembers: number = 0;

      const newVotes: AgResolutionPerson[] = [];

      const keepingTrackOfPeopleVoting: string []= [];


      for (let i = 0; i < elements.length; i++) {
        const select = elements[i] as HTMLSelectElement;
        const voter = select.id.split("_")[2]; 
        const vote = select.value;

        newVotes.push({
          id_person: voter,
          id_ag_resolution: agResolutionId,
          vote: vote
        });
      }


      if (!this.areAllVotesFilled(newVotes)) {
        this.incompleteVotesMessages[agResolutionId] = "Merci de remplir tous les votes avant d'enregistrer.";
        return;
      }
      this.incompleteVotesMessages[agResolutionId] = null;
  
      if (confirm("Êtes-vous sûr de vouloir enregistrer ce vote ? Une fois validé, il ne sera plus possible de le modifier. La résolution sera considérée comme définitivement votée ou rejetée, et si elle prévoit des appels de charges, ceux-ci seront automatiquement déclenchés.")) {
  
      this.agResolutionService.fetchById(agResolutionId).subscribe((data: AgResolution[]) => {
        this.agResolutionWithDetails = data;
        console.log("this.agResolutionWithDetails", this.agResolutionWithDetails);

        this.agResolutionPersonService.deleteAllByAgResolution(agResolutionId).pipe(
          switchMap(() => {
            const createObservables = newVotes.map(vote => this.agResolutionPersonService.create(vote));
            return forkJoin(createObservables);
          })
        ).subscribe({
          next: () => {
            this.voteMessage[agResolutionId] = 'Vote enregistré avec succès';
            this.voteError[agResolutionId] = '';  
            
            /** LEVEL 1 check all persons eligeable to vote*/
            for (const person of this.persons) {
              /**LEVEL 2 : if the person was in the meeting AG meeting */
              const personVote = newVotes.find(vote => vote.id_person === person.id);
              if (personVote) {
                /** LEVEL 3 check all the unite of this person */
                for (const unit of person.units!){
                  /** LEVEL 4 check all unit groups of this unit */
                  for (const group of unit.unit_groups!){
                    /** LEVEL 5 and if the unit group matches the unit group of the resolution */
                    if (group.id === idUnitGroup) {
                      /** LEVEL 6 if no special shares */
                      if (group.special_shares === 0){
                        //** LEVEL 7a : parallel action to construct a library with information about unit : shares */
                        const personId =  person.id;
                        const newShareValue = Number(unit.shares);
                        const existing = this.shares.find(s => s.unitId === unit.id);
                        if (existing) {
                          existing.share += newShareValue;
                        } else {
                          const newShare: Share = { unitId: unit.id, share: newShareValue, };
                          this.shares.push(newShare);
                          //** LEVEL 8 : parallel action to keep track of the number of unique persons voting in favor, important for some majority calculations */
                          if (personVote.vote === "for" && !keepingTrackOfPeopleVoting.some(people => people === personVote.id_person)) {
                            nbOfForVotes = nbOfForVotes + 1;
                            keepingTrackOfPeopleVoting.push(personVote.id_person);
                          }
                        }
                        //** LEVEL 7b : vote check */
                        if (personVote.vote === "for") {
                          votesInFavor += newShareValue;
                        } else if (personVote.vote === "against") {
                          votesAgainst += newShareValue;
                        } else if (personVote.vote === "abstention") {
                          votesAbstention += newShareValue;
                        }
                      } else {
                      /** LEVEL 6 if special shares */
                        //** LEVEL 7a : parallel action to construct a library with information about unit : shares */
                        const personId =  person.id;
                        const newShareValue = Number(group.adjusted_shares);
                        const existing = this.shares.find(s => s.unitId === unit.id);
                        if (existing) {
                          existing.share += newShareValue;
                        } else {
                          const newShare: Share = { unitId: unit.id, share: newShareValue, };
                          this.shares.push(newShare);
                          //** LEVEL 8 : parallel action to keep track of the number of unique persons voting in favor, important for some majority calculations */
                          if (personVote.vote === "for" && !keepingTrackOfPeopleVoting.some(people => people === personVote.id_person)) {
                            nbOfForVotes = nbOfForVotes + 1;
                            keepingTrackOfPeopleVoting.push(personVote.id_person);
                          }
                        }
                        //** LEVEL 7b : vote check */
                        if (personVote.vote === "for") {
                          votesInFavor += Number(group.adjusted_shares);
                          //** LEVEL 8 : parallel action to keep track of the number of votes in favor, important for some majority calculations */
                          nbOfForVotes = nbOfForVotes + 1;
                        } else if (personVote.vote === "against") {
                          votesAgainst += Number(group.adjusted_shares);
                        } else if (personVote.vote === "abstention") {
                          votesAbstention += Number(group.adjusted_shares);
                        }
                      }
                    }
                  }
                }
                    
                /** LEVEL 2 : if the person was not in the AG meeting */
                } else {
                  /** LEVEL 3 check all the unite of this person */
                  for (const unit of person.units!){
                    /** LEVEL 4 check all unit groups of this unit */
                    for (const group of unit.unit_groups!){
                      /** LEVEL 5 and if the unit group matches the unit group of the resolution */
                      if (group.id === idUnitGroup) {
                        /** LEVEL 6 if no special shares */
                        if (group.special_shares === 0){
                           //** LEVEL 7a : parallel action to construct a library with information about unit : shares */
                           const personId =  person.id;
                           const newShareValue = Number(unit.shares);
                           const existing = this.shares.find(s => s.unitId === unit.id);
                           if (existing) {
                             existing.share += newShareValue;
                           } else {
                             const newShare: Share = { unitId: unit.id, share: newShareValue, };
                             this.shares.push(newShare);
                           }
                           //** LEVEL 7b : no vote > add to unexpreesed vote */
                          votesUnexpressed += Number(newShareValue);
                        } else {
                          /** LEVEL 6 if special shares */
                          //** LEVEL 7a : parallel action to construct a library with information about unit : shares */
                          const personId =  person.id;
                          const newShareValue = Number(group.adjusted_shares);
                          const existing = this.shares.find(s => s.unitId === unit.id);
                          if (existing) {
                            existing.share += newShareValue;
                          } else {
                            const newShare: Share = { unitId: unit.id, share: newShareValue, };
                            this.shares.push(newShare);
                          }
                          //** LEVEL 7b : no vote > add to unexpreesed vote */
                          votesUnexpressed += newShareValue;
                        }
                      }
                    }
                  }
                }
              }
              
                  
                
              
         
            const totalShares = this.getShares(idUnitGroup); 
            nbOfMembers = this.getNbOfUniquePersonsInGroup(idUnitGroup);


            /** 
            console.log("this.shares", this.shares);

            console.log("votesInFavor", votesInFavor);
            console.log("votesAgainst", votesAgainst);
            console.log("votesAbstention", votesAbstention);
            console.log("votesUnexpressed", votesUnexpressed);

            console.log("totalShares", totalShares);
            console.log("required_majority", required_majority);
      
            console.log('nbOfForVotes', nbOfForVotes);
            console.log('this.persons', this.persons.length);
            console.log('nbOfMembers', nbOfMembers);
            */
      
            const resultVote = this.checkVote(votesInFavor, votesAgainst, votesAbstention, totalShares, required_majority, nbOfForVotes, nbOfMembers, agResolutionId);
            
            if (resultVote === 'accepted') {
              this.voteMessage[agResolutionId] = 'Cette résolution a été définitivement adoptée.';
              this.voteError[agResolutionId] = '';  
              if(this.agResolutionWithDetails[0].budget === 1) {
                this.changeStatus(agResolutionId, 'accepted', 1);
              
                if(this.agResolutionWithDetails[0].instalments === 1) {
                  const creations = this.agResolutionWithDetails.flatMap(item =>
                    this.shares.map(share =>
                      this.chargeLineService.create({
                        amount: Number(((Number(item.budget_amount) / this.agResolutionWithDetails.length / totalShares * share.share).toFixed(2))),
                        call_date: item.call_date_date!, 
                        id_unit: share.unitId,
                        id_ag_resolution: agResolutionId,
                      })
                    )
                  );
              
                  forkJoin(creations).subscribe(() => {
                    this.router.navigate(['/agminutes', this.agMinutesId, 'edit'], {
                      queryParams: { updated: 'true' }
                    });
                  });
                }


              } else {
                this.changeStatus(agResolutionId, 'accepted', 0);
              }
              
            
              for (let i = 0; i < elements.length; i++) {
                const select = elements[i] as HTMLSelectElement;
                select.disabled = true;
                select.classList.add('bg-gray-200', 'text-gray-500', 'cursor-not-allowed');
              }
      
      
            } else if (resultVote === 'rejected') {
              this.voteMessage[agResolutionId] = 'Cette résolution a été définitivement rejetée.';
              this.voteError[agResolutionId] = '';  
              this.changeStatus(agResolutionId, 'rejected', 0);   
              for (let i = 0; i < elements.length; i++) {
                const select = elements[i] as HTMLSelectElement;
                select.disabled = true;
                select.classList.add('bg-gray-200', 'text-gray-500', 'cursor-not-allowed');
              } 

            } else if (resultVote === 'new_vote') {
              const revote = confirm("La résolution n'as pas été voté à la majorité 25. Souhaitez-vous revoter la résolution à la majortité 25-1 ?");
              if (revote) {
                this.changeNextVoteCheckFor_25_1 = agResolutionId;        
              }
            }
            

          },
          error: err => {
            this.voteMessage[agResolutionId] = '';
            this.voteError[agResolutionId] = "Erreur lors de l'enregistrement";
          }
        });
        /** 
        console.log("newVotes", newVotes);
        console.log("this.unitGroupShares", this.unitGroupShares);
        console.log("this.persons", this.persons);
        */
      });
    } 
  }

  checkVote(votesInFavor: number, votesAgainst: number, votesAbstention: number, totalShares: number, required_majority: string, nbOfForVotes: number, nbOfMembers: number, agResolutionId: string){
    if (required_majority === '24') {
      if (votesInFavor >= votesAgainst) {
        return 'accepted';
      } else {
        return 'rejected';
      }
    } else if (required_majority === '25') {
      if (votesInFavor * 2 >= totalShares) {
        return 'accepted';
      } else {
        return 'rejected';
      }
    } else if (required_majority === '25-1') {
      if (this.changeNextVoteCheckFor_25_1 === agResolutionId) {
        if (votesInFavor >= votesAgainst) {
          return 'accepted';
        } else {
          return 'rejected';
        }
      } else if (votesInFavor * 2 >= totalShares) {
        return 'accepted';
      } else {
        if (votesInFavor * 3 >= totalShares) {
          return 'new_vote';
        } else {
          return 'rejected';
        }
      }
    } else if (required_majority === '26') {
      if (votesInFavor * 1.5 >= totalShares && nbOfForVotes * 2 > nbOfMembers) {
        return 'accepted';
      } else {
        return 'rejected';
      }
    } else if (required_majority === 'unanimity') {
      if (votesInFavor === totalShares) {
        return 'accepted';
      } else {
        return 'rejected';
      }
    }
    return 'rejected';
  }

  getNbOfUniquePersonsInGroup(groupId: string): number {
    const uniquePersonIds = new Set<string>();
  
    for (const person of this.persons) {
      for (const unit of person.units!) {
        if (unit.unit_groups?.some(ug => ug.id === groupId)) {
          uniquePersonIds.add(person.id);
          break;
        }
      }
    }
  
    return uniquePersonIds.size;
  }
  
  checkPersonUnitsByGroup(personId: string, unitGroupId: string) {
    const person = this.persons.find(p => p.id === personId);
  
    if (!person) {
      console.warn('Person not found');
      return [];
    }
    // Return all units that contain the requested unit group
    const matchingUnits = person.units!.filter(unit =>
      unit.unit_groups!.some(group => group.id === unitGroupId)
    );  
    return matchingUnits;
  }

  shouldDisplayPerson(personId: string, groupId: string): boolean {
    const units = this.checkPersonUnitsByGroup(personId, groupId);
    return units.some(unit =>
      unit.unit_groups?.some(group =>
        group.id === groupId &&
        (!group.special_shares || +group.adjusted_shares! > 0)
      )
    );
  }
  
  updateFormValidation(): void {
    for (const id of this.selectedPersonsIdOnly) {
      const presence = this.getPresenceValue(id);
      if (!presence) {
        this.formValidation = {
          valid: false,
          message: 'Veuillez sélectionner un statut de présence pour toutes les personnes cochées.'
        };
        return;
      }
      if (presence === 'represented') {
        const representedBy = this.getRepresentedValue(id);
        if (!representedBy || representedBy.trim() === '') {
          this.formValidation = {
            valid: false,
            message: 'Veuillez remplir le champ "Représenté par" pour les personnes représentées.'
          };
          return;
        }
      }
    }
    this.formValidation = { valid: true, message: '' };
  }
  
  getGroupName(idUnitGroup: string) {
    return this.unitGroupDict[idUnitGroup] || 'Nom de group inconnu';
  }
 
  getShares(idUnitGroup: string) {
    return this.unitGroupShares[idUnitGroup] || 0;
  }

  submitForm() {
    if (this.agMinutesForm.valid) {
      this.onSubmit();
    } else {
      this.formValidation = {
        valid: false,
        message: 'Veuillez remplir tous les champs requis.'
      };
    }
  }

  changeStatus(agResolutionId: string, statut: string, budgetActifStatus: number) {
    this.agResolutionService.updateStatus(agResolutionId, statut, budgetActifStatus).subscribe({
      next: (res) => {
        console.log("Statut mis à jour:", res);
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour du statut:", err);
      }
    });
  }

  areAllVotesFilled(newVotes: AgResolutionPerson[]): boolean {
    for (const vote of newVotes) {
      const v = vote.vote;
      if (v !== 'for' && v !== 'against' && v !== 'abstention') {
        return false;
      }
    }
    return true;
  }
}
