import { FormControl } from '@angular/forms';

export interface CategoryFormModel {
  id: FormControl<string>;
  name: FormControl<string>;
  capacity: FormControl<number>;
}
