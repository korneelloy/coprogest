import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../services/auth/auth-service';



@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss'
})
export class LoginForm implements OnInit{
  loginForm!: FormGroup;
  loginError = '';
  emailFocused = false;
  passwordFocused = false;
 
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {  
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]]
    });
  }
  

  onSubmit() {
    const formData = this.loginForm.value;
    
    if (this.loginForm.invalid) return;
    
    console.log('Login submitted:', formData.email, formData.password);

    this.authService.login(formData).subscribe({
      next: (res) => {
        console.log('Login success:', res);
        this.loginError = '';
      },
      error: (err) => {
        console.error('Login error:', err);
        this.loginError = 'Email ou mot de passe invalide.';
      }
    });
  }

  focusEmailInput() {
    const input = document.querySelector('input[formControlName="email"]') as HTMLInputElement;
    input?.focus();
  }
  
  focusPasswordInput() {
    const input = document.querySelector('input[formControlName="password"]') as HTMLInputElement;
    input?.focus();
  }
}