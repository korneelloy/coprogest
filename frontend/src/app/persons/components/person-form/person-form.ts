import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../../services/person/person-service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Person } from '../../../model/person';
import { RouterModule } from '@angular/router';
import { Role } from '../../../model/role';
import { RoleService } from '../../../services/role/role-service';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './person-form.html',
  styleUrls: ['./person-form.scss']
})
export class PersonForm implements OnInit {
  personForm!: FormGroup;
  isEditMode = false;
  personId: string | null = null;

  roles: Role[] = [];
  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.personId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.personId;
  
    this.personForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      first_name: [ '', this.isEditMode ? [Validators.required] : [] ],
      last_name: [ '', this.isEditMode ? [Validators.required] : [] ],
      telephone: [ '', this.isEditMode ? [Validators.required] : [] ],
      street: [ '', this.isEditMode ? [Validators.required] : [] ],
      postal_code: [ '', this.isEditMode ? [Validators.required] : [] ],
      city: [ '', this.isEditMode ? [Validators.required] : [] ],
      password: [''],
      id_role: ['']
    });
  
    this.roleService.fetchAll().subscribe((data: Role[]) => {
      this.roles = data;
    });
  
    if (this.isEditMode) {
      this.personService.fetchById(this.personId!).subscribe((person: Person) => {
        this.personForm.patchValue({
          email: person.email,
          first_name: person.first_name,
          last_name: person.last_name,
          telephone: person.telephone,
          street: person.street,
          postal_code: person.postal_code,
          city: person.city,
          id_role: person.id_role
        });
      });
    }
  }
  
  onSubmit(): void {
    const formData = this.personForm.value;
    if (this.personForm.invalid) return;

    if (this.isEditMode) {
      this.personService.update(this.personId!, formData).subscribe(() => {
        this.router.navigate(['/persons', this.personId], { queryParams: { updated: 'true' } });
      });
      
    } else {
      if (
        this.personForm.get('email')?.invalid ||
        this.personForm.get('id_role')?.invalid
      ) return;
      
      this.personService.create(formData).subscribe(() => {
        this.router.navigate(['/persons'], { queryParams: { created: 'true' } });
      });
    }
  }
}
