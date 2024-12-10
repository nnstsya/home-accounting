import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-category-modal',
  templateUrl: './delete-category-modal.component.html',
  styleUrl: './delete-category-modal.scss'
})
export class DeleteCategoryModalComponent {
  data: { currentCategory: string } = inject(MAT_DIALOG_DATA);

  private dialogRef: MatDialogRef<DeleteCategoryModalComponent> = inject(MatDialogRef);

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(true);
  }
}
