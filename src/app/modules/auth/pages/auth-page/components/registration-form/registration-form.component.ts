import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';
import { Router } from '@angular/router';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { LoaderService } from '@shared/services/loader.service';
import { User } from '@models/user'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface RegistrationForm {
  email: FormControl<string>;
  password: FormControl<string>;
  name: FormControl<string>;
  check: FormControl<boolean>;
}

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent {
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private authService: AuthService = inject(AuthService);
  private loaderService: LoaderService = inject(LoaderService);
  private router: Router = inject(Router);
  private destroyRef: DestroyRef = inject(DestroyRef);

  isLoading$: Observable<boolean> = this.loaderService.isLoading$;
  passwordCount: number = 0;
  serverErrorMessage: string = '';

  registrationForm: FormGroup<RegistrationForm> = this.fb.group({
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

    const formData: Omit<User, 'id'> = this.registrationForm.getRawValue();
    this.loaderService.setLoading(true);

    this.handleCheckEmailUniqueness(formData);
  }

  handleCheckEmailUniqueness(formData: Omit<User, 'id'>): void {
    this.authService.checkEmailUniqueness(formData.email).pipe(
      delay(400),
      takeUntilDestroyed(this.destroyRef),
      catchError(() => {
        return of(false);
      }),
      map((emailIsUnique: boolean) => {
        if (emailIsUnique) {
          this.handleSignUp(formData);
        } else {
          this.handleError('User with this email is already registered.');
          this.loaderService.setLoading(false)
        }
      })
    ).subscribe();
  }

  handleSignUp(formData: Omit<User, 'id'>): void {
    this.loaderService.setLoading(true);

    this.authService.signUp({ ...formData, id: Date.now() }).pipe(
      delay(400),
      takeUntilDestroyed(this.destroyRef),
      catchError(() => {
        this.handleError('An error occurred during registration.');
        return of();
      }),
      map(() => {
        this.loaderService.setLoading(false);
        this.router.navigate(['home']).then(() => location.reload())
      })
    ).subscribe();
  }

  private handleError(message: string): void {
    this.serverErrorMessage = message;
    setTimeout(() => (this.serverErrorMessage = ''), 5000);
  }
}
