import { Directive, DestroyRef, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { Router } from '@angular/router';
import { AbstractForm } from '@auth/models/form';

@Directive()
export abstract class AuthDirective<DataType, FormType extends AbstractForm> {
  fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  destroyRef: DestroyRef = inject(DestroyRef);

  isLoading: boolean = false;
  serverErrorMessage: string = '';
  passwordCount: number = 0;

  abstract form: FormGroup<FormType>

  onSubmit(): void {
    if (this.form.invalid) return;

    const formData: Omit<DataType, 'id'> = this.form.getRawValue() as DataType;
    this.isLoading = true;

    this.validateFormBeforeSend(formData);
  }

  handleError(errorMessage: string): void {
    this.serverErrorMessage = errorMessage;
    this.isLoading = false;
    setTimeout(() => {
      this.serverErrorMessage = '';
    }, 5000);
  }

  updatePasswordCount(): void {
    const password: string = this.form.get('password')?.value || '';
    this.passwordCount = password.length;
  }

  protected abstract validateFormBeforeSend(formData: Omit<DataType, 'id'>): void
}
