import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './pages/auth-page/components/registration-form/registration-form.component';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

@NgModule({
  declarations: [
    RegistrationFormComponent,
    AuthPageComponent
  ],
  imports: [
    CommonModule,
    MatFormField,
    MatInput,
    MatCheckbox,
    MatButton,
    MatLabel,
    RouterModule.forChild([
      {
        path: '',
        component: AuthPageComponent
      }
    ]),
    ReactiveFormsModule,
    MatError,
    HttpClientModule,
    MatProgressSpinner
  ],
  providers: [
    AuthService,
  ]
})
export class AuthModule {}
