import { FormControl } from '@angular/forms';

export interface SignUpForm {
  email: FormControl<string>;
  password: FormControl<string>;
  name: FormControl<string>;
  check: FormControl<boolean>;
}
