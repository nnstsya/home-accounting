import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    MatFormField,
    MatInput,
    MatCheckbox,
    MatButton,
    MatLabel,
    ReactiveFormsModule,
    MatError,
    MatProgressSpinner,
    AuthRoutingModule
  ],
  providers: [
    AuthService,
  ]
})
export class AuthModule {}
