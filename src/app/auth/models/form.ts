import { AbstractControl, FormControl } from '@angular/forms';

export type AbstractForm = Record<string, AbstractControl>;

export interface SignUpForm extends AbstractForm {
  email: FormControl<string>;
  password: FormControl<string>;
  name: FormControl<string>;
  check: FormControl<boolean>;
}

export interface SignInForm extends AbstractForm {
  email: FormControl<string>;
  password: FormControl<string>;
}
