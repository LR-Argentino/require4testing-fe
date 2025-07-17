import {Component, inject} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthenticationService} from '../core/services/authentication-service';
import {LoginRequest} from '../../shared/models/login-request';
import {Spinner} from '../../shared/spinner/spinner';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    Spinner
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginForm {
  private readonly fb = inject(FormBuilder);
  protected readonly authService = inject(AuthenticationService);

  protected readonly loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  protected get usernameControl(): AbstractControl<string, string> {
    return this.loginForm.get('username')!;
  }

  protected get passwordControl(): AbstractControl<string, string> {
    return this.loginForm.get('password')!;
  }

  protected onSubmit(): void {
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      const loginResponse: LoginRequest = {username: username, password: password};

      this.authService.login(loginResponse);

      // TODO: Navigate to the home page or show a success message
    } else {
      this.loginForm.markAllAsTouched();
      this.loginForm.updateValueAndValidity();
    }
  }
}
