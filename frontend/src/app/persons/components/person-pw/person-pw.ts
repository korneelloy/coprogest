import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonService } from '../../../services/person/person-service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Role } from '../../../model/role';


@Component({
  selector: 'app-person-pw',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './person-pw.html',
  styleUrls: ['./person-pw.scss']
})
export class PersonPw implements OnInit {
  personForm!: FormGroup;
  isEditMode = false;
  personId: string | null = null;

  roles: Role[] = [];
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private personService: PersonService,
  ) {}

  ngOnInit(): void {  
    this.personForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]]
    });
  }
  
  onSubmit(): void {
    const formData = this.personForm.value;
    if (this.personForm.invalid) return;

    this.personService.updatePw(formData.email, formData.password).subscribe(() => {
      this.router.navigate(['/persons']);
    });

    
  }
}
