import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FireAuthService } from '../../core/services/fireauth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  submitted = false;
  loading = false;
  loginFormgroup = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  constructor(private authService: FireAuthService, private router: Router) {}

  get isEmailInvalid() {
    return (
      (this.loginFormgroup.controls['email'].touched || this.submitted) &&
      this.loginFormgroup.controls['email'].errors
    );
  }

  get isPasswordInvalid() {
    return (
      (this.loginFormgroup.controls['password'].touched || this.submitted) &&
      this.loginFormgroup.controls['password'].errors
    );
  }

  onSubmit() {
    this.submitted = true;
    const email = this.loginFormgroup.value.email!;
    const password = this.loginFormgroup.value.password!;
    this.loading = true;
    this.authService
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Signed up successfully');
        if (this.authService.getRole() === 'admin') {
          console.log('Redirecting to admin page');
          this.router.navigate(['/admin'], { replaceUrl: true });
        } else {
          console.log('Redirecting to member page');
          this.router.navigate(['/member'], { replaceUrl: true });
        }
      })
      .finally(() => (this.loading = false));
  }

  onRegister() {
    this.loading = true;
    const email = 'admin@example.com';
    const password = 'admin123';
    this.authService
      .signUpWithEmailAndPassword(email, password)
      .then(
        () => {
          console.log('Signed up successfully');
          if (this.authService.getRole() === 'admin') {
            console.log('Redirecting to admin page');
            this.router.navigate(['/admin'], { replaceUrl: true });
          } else {
            console.log('Redirecting to member page');
            this.router.navigate(['/member'], { replaceUrl: true });
          }
        },
        (err) => {
          alert(err.message);
        }
      )
      .finally(() => (this.loading = false));
  }
}
