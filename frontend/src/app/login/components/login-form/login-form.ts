import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
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
  loginErrorMessage: string | null = null;

 
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
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
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/home';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.loginError = 'Email ou mot de passe invalide.';
        this.loginErrorMessage = "Erreur dans email ou mot de passe";
        setTimeout(() => this.loginErrorMessage = null, 5000);
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