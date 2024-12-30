import { FormControl } from '@angular/forms';

export interface EventFormModel {
  type: FormControl<string>;
  amount: FormControl<number>;
  categoryId: FormControl<string>;
  description: FormControl<string>;
}

export interface CategoryFormModel {
  id: FormControl<string>;
  name: FormControl<string>;
  capacity: FormControl<number>;
}
