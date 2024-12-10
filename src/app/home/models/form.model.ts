import { FormControl } from '@angular/forms';

export interface CategoryFormModel {
  name: FormControl<string>;
  capacity: FormControl<number>;
}
