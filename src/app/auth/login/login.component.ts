import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { catchError, of, switchMap } from 'rxjs';
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
      catchError((err) => {
        this.handleError(err.message);
        return of(null);
      }),
      switchMap((emailExists: boolean | null) => {
        if (emailExists) {
          return this.authService.validatePassword(formData.email, formData.password).pipe(
            catchError((err) => {
              this.handleError(err.message);
              return of(null);
            })
          );
        } else if (emailExists === false) {
          this.handleError('This user does not exist');
          return of(null);
        }
        return of(null);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((passwordMatches: boolean | null) => {
      if (passwordMatches) {
        this.handleSignIn(formData);
      } else if (passwordMatches === false) {
        this.handleError('Password is not correct');
      }
    });
  }

  private handleSignIn(formData: Omit<UserCredentials, 'id'>): void {
    this.isLoading = true;

    this.authService.signIn(formData.email).pipe(
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
