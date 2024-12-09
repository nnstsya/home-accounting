import { Component, DestroyRef, inject } from '@angular/core';
import { EventCategoryModel } from '@home/models/event.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountingService } from '@home/services/accounting.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-delete-category-modal',
  templateUrl: './delete-category-modal.component.html',
  styleUrl: './delete-category-modal.scss'
})
export class DeleteCategoryModalComponent {
  data: { currentCategory: EventCategoryModel } = inject(MAT_DIALOG_DATA);

  private dialogRef: MatDialogRef<DeleteCategoryModalComponent> = inject(MatDialogRef);
  private accountingService: AccountingService = inject(AccountingService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.accountingService.deleteCategory(Number(this.data.currentCategory.id)).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();

    this.onClose();
  }
}
