import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { forkJoin } from 'rxjs';


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

@Component({
  selector: 'app-ag-minutes-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './ag-minutes-form.html',
  styleUrl: './ag-minutes-form.scss'
})
export class AgMinutesForm implements OnInit {
  agMinutesForm: FormGroup;
  isEditMode = false;
  agMinutesId: string | null = null;
  agResolutions$!: Observable<AgResolution[]>;
  allNoticesWithoutMinutes: AgResolution[] = [];
  persons$!: Observable<Person[]>;
  persons: Person[] = [];
  uniquePersons: Person[] = [];
  

  votes$!: Observable<AgResolutionPerson[]>;
  votes: AgResolutionPerson[] = [];

  selectedVotes: { [personId: string]: string } = {};


  presence: string = "";
  
  selectedPersonsOnly: AgMinutesPresencePerson[] = [];
  selectedPersonsIdOnly: string[] = [];

  deletedMessage: string | null = null;
  updatedMessage: string | null = null;
 
  requiredMajorityLabels: { [key: string]: string } = {
    "24": 'Article 24',
    "25": 'Article 25',
    "25-1": 'Article 25-1',
    "26": 'Article 26',
    "unanimiy": 'Unanimité',
    "no_vote": 'Sans vote',
  };

  formValidation = { valid: true, message: '' }; // default value


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
    
    this.agMinutesId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.agMinutesId;

    if (this.agMinutesId) {
      this.route.queryParamMap.subscribe(params => {
        if (params.get('updated') === 'true') {
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
    }

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
              adjusted_shares: row.unit_unit_group_adjusted_shares
            });
          }
        }
      }
    
      this.persons = Array.from(personMap.values());
    });


    this.votes$ = this.agResolutionPersonService.fetchAll();
    this.votes$.subscribe(data => {
      this.votes = data;

      this.votes.forEach(vote => {
        this.selectedVotes[vote.id_person] = vote.vote;
      });
    });

    if (!this.isEditMode){
      this.agResolutionService.fetchAllNoticesWithoutMinutes().subscribe((data: AgResolution[]) => {
        this.allNoticesWithoutMinutes = data;
      });      

      this.agMinutesForm.get('notice_id')?.setValidators([Validators.required]);

    } else if (this.isEditMode) {
      this.route.queryParams.subscribe(params => {
        if (params['deleted'] === 'true') {
          this.deletedMessage = "Le compte rendu a été supprimée avec succès.";
        }
      });

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
           
      
      this.agMinutesForm.get('ag_date')?.setValidators([Validators.required]);
      this.agMinutesForm.get('ag_time')?.setValidators([Validators.required]);
      this.agMinutesForm.get('place')?.setValidators([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255)
      ])
      
      this.agResolutions$ = this.agResolutionService.fetchAllByAgMinutes(this.agMinutesId!);


      /**
       * 
       *       
       * this.agResolutions$ = this.agResolutionService.fetchAllByAgMinutes(this.agMinutesId!);
       
      
      do for each reasilution 

      this.agResolutionPersonService.fetchAllByAgResolution(id).subscribe((agResolutionPerson: AgResolutionPerson[]) => {
      
      }     

      this.agResolutions$ = this.agResolutionService
        .fetchAllByAgMinutes(this.agMinutesId!)
        .pipe(
          switchMap((resolutions: AgResolution[]) => {
            const resolutionWithVotes$ = resolutions.map(resolution =>
              this.agResolutionPersonService
                .fetchAllByAgResolution(resolution.id)
                .pipe(
                  map((votes: AgResolutionPerson[]) => ({
                    ...resolution,
                    votes 
                  }))
                )
            );

            return forkJoin(resolutionWithVotes$);
          })
        );
      */


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
    }
    this.updateFormValidation();
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
    
    /** if checked */
    if (isChecked) {
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


  registerVote(agResolutionId: string){
    const elements = document.getElementsByClassName("vote-" + agResolutionId);

    for (let i = 0; i < elements.length; i++) {
        const select = elements[i] as HTMLSelectElement;
        console.log(select.id); 
        console.log(select.value);
    }
  }


    /** 
  checkPersonUnitsByGroup(personId: string, unitGroupId: string) {
  
    tourner sur person, tourner sur unit et lister les units qui correspondent a id_unit_group
    si pas de correspondance: ne pas afficher

    Create a persons array with:
     * Level 1: An array of all persons who own at least one unit
     * Level 2: For each person, an array of all units they own
     * Level 3: For each unit, an array of all unit groups the unit belongs to
     * 

    const person = this.persons.find(p => p.id === personId);
    
  
    if (!person) {
      console.log('Person not found');
      return [];
    }
  
    const matchingUnits = person.unit_id!.filter(unit => {
      return unit.unit_groups.some(group => group.id === unitGroupId);
    });
  
    return matchingUnits;
  }
        */ 

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
        (!group.special_shares || +group.adjusted_shares > 0)
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
  
  
  
}
