import { FormControl } from '@angular/forms';

export interface EventFormModel {
  type: FormControl<string>;
  amount: FormControl<number>;
  categoryId: FormControl<string>;
  description: FormControl<string>;
}
