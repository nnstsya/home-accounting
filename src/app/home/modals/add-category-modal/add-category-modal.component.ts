import { Component, DestroyRef, inject } from '@angular/core';
import { EventCategoryModel } from '@home/models/event.model';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CategoryFormModel } from '@home/models/form.model';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountingService } from '@home/services/accounting.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrl: './add-category-modal.component.scss'
})
export class AddCategoryModalComponent {
  categoryForm: FormGroup<CategoryFormModel>;
  userId: string = JSON.parse(localStorage.getItem('user')!).id;

  private dialogRef: MatDialogRef<AddCategoryModalComponent> = inject(MatDialogRef);
  private accountingService: AccountingService = inject(AccountingService);
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      capacity: [0, [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const category: EventCategoryModel = {
        id: Date.now(),
        name: this.categoryForm.getRawValue().name,
        userId: Number(this.userId),
        capacity: Number(this.categoryForm.getRawValue().capacity),
      };
      this.accountingService.createCategory(category).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe();

      this.onClose();
    }
  }
}
