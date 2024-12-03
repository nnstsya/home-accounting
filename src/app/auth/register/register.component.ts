import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { UserFullInfo } from '@auth/models/user'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SignUpForm } from '@auth/models/form';
import { AuthDirective } from '@auth/directives/auth.directive';

@Component({
  selector: 'app-registration-form',
  templateUrl: './register.component.html',
  styleUrl: '../auth.scss'
})
export class RegisterComponent extends AuthDirective<UserFullInfo, SignUpForm> {
  form: FormGroup<SignUpForm> = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    name: ['', Validators.required],
    check: [false, Validators.requiredTrue],
  });

  protected validateFormBeforeSend(formData: Omit<UserFullInfo, 'id'>): void {
    this.authService.isEmailRegistered(formData.email).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError((err) => {
        this.handleError(err.message);
        return of(null);
      })
    ).subscribe((emailExists: boolean | null) => {
      if (emailExists) {
        this.handleError('User with this email is already registered');
      } else if (emailExists === false) {
        this.handleSignUp(formData);
      }
    });
  }

  private handleSignUp(formData: Omit<UserFullInfo, 'id'>): void {
    this.isLoading = true;

    this.authService.signUp({ ...formData, id: Date.now() }).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError((err) => {
        this.handleError(err.message);
        return of();
      })
    ).subscribe(() => {
      this.isLoading = false;
      this.router.navigateByUrl('home');
    });
  }
}
