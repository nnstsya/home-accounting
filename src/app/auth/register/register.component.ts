import { Component, DestroyRef, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { UserSignUpModel } from '@auth/models/user'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SignUpForm } from '@auth/models/form';

@Component({
  selector: 'app-registration-form',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private destroyRef: DestroyRef = inject(DestroyRef);

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  passwordCount: number = 0;
  serverErrorMessage: string = '';

  registrationForm: FormGroup<SignUpForm> = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    name: ['', Validators.required],
    check: [false, Validators.requiredTrue],
  });

  updatePasswordCount(): void {
    const password: string = this.registrationForm.get('password')?.value || '';
    this.passwordCount = password.length;
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) return;

    const formData: Omit<UserSignUpModel, 'id'> = this.registrationForm.getRawValue();
    this.isLoading$.next(true);

    this.checkEmailUniqueness(formData);
  }

  checkEmailUniqueness(formData: Omit<UserSignUpModel, 'id'>): void {
    this.authService.checkEmailUniqueness(formData.email).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError((err) => {
        this.handleError(err.message);
        this.isLoading$.next(false);
        return of(null);
      })
    ).subscribe((emailIsUnique: boolean | null) => {
      if (emailIsUnique) {
        this.handleSignUp(formData);
      } else if (emailIsUnique === false) {
        this.handleError('User with this email is already registered.');
        this.isLoading$.next(false);
      }
    });
  }

  handleSignUp(formData: Omit<UserSignUpModel, 'id'>): void {
    this.isLoading$.next(true);

    this.authService.signUp({ ...formData, id: Date.now() }).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError((err) => {
        this.handleError(err.message);
        this.isLoading$.next(false);
        return of();
      })
    ).subscribe(() => {
      this.isLoading$.next(false);
      this.router.navigateByUrl('home');
    });
  }

  private handleError(errorMessage: string): void {
    this.serverErrorMessage = errorMessage;
    setTimeout(() => (this.serverErrorMessage = ''), 5000);
  }
}
