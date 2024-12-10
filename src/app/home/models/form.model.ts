import { FormControl } from '@angular/forms';

export interface CategoryEditFormModel {
  id: FormControl<string>;
  name: FormControl<string>;
  capacity: FormControl<number>;
}
