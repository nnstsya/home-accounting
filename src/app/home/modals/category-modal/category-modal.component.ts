import { Component, DestroyRef, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CategoryFormModel } from '@home/models/form.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventCategoryModel } from '@home/models/event.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.scss'
})
export class CategoryModalComponent {
  categoryForm: FormGroup<CategoryFormModel>;
  data: { categories?: EventCategoryModel[], category?: EventCategoryModel } = inject(MAT_DIALOG_DATA);
  isInEditMode: boolean = !!this.data.category?.id;

  private dialogRef: MatDialogRef<CategoryModalComponent> = inject(MatDialogRef);
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor() {
    this.categoryForm = this.fb.group({
      id: [this.data.category?.id || ''],
      name: [this.data.category?.name || '', Validators.required],
      capacity: [this.data.category?.capacity || 0, [Validators.required, Validators.pattern(/^\d+$/)]],
    });

    this.categoryForm.get('id')?.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((id) => {
      const selectedCategory: EventCategoryModel = this.data.categories?.find((category) => category.id === id)!;
      if (selectedCategory) {
        this.data.category = selectedCategory;
        this.categoryForm.patchValue({
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
    if (this.categoryForm.valid) {
      this.dialogRef.close(this.categoryForm);
    }
  }
}
