import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { SignInForm } from '@auth/models/form';
import { UserCredentials } from '@auth/models/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthDirective } from '@auth/directives/auth.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: '../auth.scss'
})
export class LoginComponent extends AuthDirective<UserCredentials, SignInForm> {
  form: FormGroup<SignInForm> = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  protected validateFormBeforeSend(formData: Omit<UserCredentials, 'id'>): void {
    this.authService.isEmailRegistered(formData.email).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError((err) => {
        this.handleError(err.message);
        return of(null);
      })
    ).subscribe((emailExists: boolean | null) => {
      if (emailExists) {
        this.validatePassword(formData);
      } else if (emailExists === false) {
        this.handleError('This user does not exists');
      }
    });
  }

  private validatePassword(formData: Omit<UserCredentials, 'id'>): void {
    this.authService.validatePassword(formData.email, formData.password).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError((err) => {
        this.handleError(err.message);
        return of(null);
      })
    ).subscribe((passwordMatches: boolean | null) => {
      if (passwordMatches) {
        this.handleSignIn(formData);
      } else if (passwordMatches === false) {
        this.handleError('Password is not correct');
      }
    });
  }

  private handleSignIn(formData: Omit<UserCredentials, 'id'>): void {
    this.isLoading$.next(true);

    this.authService.signIn(formData.email).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError((err) => {
        this.handleError(err.message);
        return of();
      })
    ).subscribe(() => {
      this.isLoading$.next(false);
      this.router.navigateByUrl('home');
    });
  }
}
