import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CategoryFormModel } from '@home/models/form.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrl: './add-category-modal.component.scss'
})
export class AddCategoryModalComponent {
  categoryForm: FormGroup<CategoryFormModel>;
  userId: string = JSON.parse(localStorage.getItem('user')!).id;

  private dialogRef: MatDialogRef<AddCategoryModalComponent> = inject(MatDialogRef);
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);

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
      this.dialogRef.close(this.categoryForm);
    }
  }
}
