import { Component, DestroyRef, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CategoryEditFormModel } from '@home/models/form.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountingService } from '@home/services/accounting.service';
import { EventCategoryModel } from '@home/models/event.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-edit-category-modal',
  templateUrl: './edit-category-modal.component.html',
  styleUrl: './edit-category-modal.component.scss'
})
export class EditCategoryModalComponent {
  categoryEditForm: FormGroup<CategoryEditFormModel>;
  userId: string = JSON.parse(localStorage.getItem('user')!).id;

  data: { categories: EventCategoryModel[], category: EventCategoryModel } = inject(MAT_DIALOG_DATA);
  currentCategory: EventCategoryModel = this.data.category;

  private dialogRef: MatDialogRef<EditCategoryModalComponent> = inject(MatDialogRef);
  private accountingService: AccountingService = inject(AccountingService);
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor() {
    this.categoryEditForm = this.fb.group({
      id: [String(this.currentCategory.id), Validators.required],
      name: [this.currentCategory.name, Validators.required],
      capacity: [this.currentCategory.capacity, [Validators.required, Validators.pattern(/^\d+$/)]],
    });

    this.categoryEditForm.get('id')?.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((id) => {
      const selectedCategory: EventCategoryModel = this.data.categories.find((category) => String(category.id) === id)!;
      if (selectedCategory) {
        this.currentCategory = selectedCategory;
        this.categoryEditForm.patchValue({
          name: selectedCategory.name,
          capacity: selectedCategory.capacity,
        });
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.categoryEditForm.valid) {
      const category: EventCategoryModel = {
        id: Number(this.categoryEditForm.getRawValue().id),
        name: this.categoryEditForm.getRawValue().name,
        userId: Number(this.userId),
        capacity: Number(this.categoryEditForm.getRawValue().capacity),
      };
      this.accountingService.editCategory(category).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe();

      this.onClose();
    }
  }
}
