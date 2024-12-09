import { FormControl } from '@angular/forms';

export interface EventFormModel {
  type: FormControl<string>;
  amount: FormControl<number>;
  categoryId: FormControl<number>;
  description: FormControl<string>;
}

export interface CategoryFormModel {
  name: FormControl<string>;
  capacity: FormControl<number>;
}

export interface CategoryEditFormModel {
  id: FormControl<string>;
  name: FormControl<string>;
  capacity: FormControl<number>;
}
