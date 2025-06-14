import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitService } from '../../../services/unit/unit-service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Unit } from '../../../model/unit';
import { RouterModule } from '@angular/router';
import { Person } from '../../../model/person';
import { PersonService } from '../../../services/person/person-service';


@Component({
  selector: 'app-unit-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './unit-form.html',
  styleUrls: ['./unit-form.scss']
})
export class UnitForm implements OnInit {
  unitForm: FormGroup;
  isEditMode = false;
  unitId: string | null = null;

  persons: Person[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private unitService: UnitService,
    private personService: PersonService
  ) {
    this.unitForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      id_person: ['', Validators.required],
      shares: ['',[Validators.required, Validators.pattern(/^\d+(,\d{1,2})?$/)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.personService.fetchAll().subscribe((data: Person[]) => {
          this.persons = data;
    });
    this.unitId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.unitId;

    if (this.isEditMode) {
      this.unitService.fetchById(this.unitId!).subscribe((unit: Unit) => {
        this.unitForm.patchValue({
          name: unit.name,
          id_person: unit.id_person,
          shares: unit.shares,
          description: unit.description
        });
      });
    }
  }

  onSubmit(): void {
    if (this.unitForm.invalid) return;

    const formData = this.unitForm.value;
    console.log(formData);

    formData.shares = Number(formData.shares);
    
    if (this.isEditMode) {
      this.unitService.update(this.unitId!, formData).subscribe(() => {
        this.router.navigate(['/units', this.unitId], { queryParams: { updated: 'true' } });
      });
      
    } else {
      this.unitService.create(formData).subscribe(() => {
        this.router.navigate(['/units'], { queryParams: { created: 'true' } });
      });
    }
  }
}
