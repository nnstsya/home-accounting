import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EventCategoryModel } from '@home/models/event.model';
import { AccountingService } from '@home/services/accounting.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryModalComponent } from '@home/modals/add-category-modal/add-category-modal.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { v4 as uuidv4 } from 'uuid';
import { CategoryFormModel } from '@home/models/form.model';
import { FormGroup } from '@angular/forms';
import { modalConfig } from '@home/modals/modal-config';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss'
})
export class RecordsComponent implements OnInit {
  userCategories$: Observable<EventCategoryModel[]> = of();

  userId: string = JSON.parse(localStorage.getItem('user')!).id;

  private accountingService: AccountingService = inject(AccountingService);
  private dialog: MatDialog = inject(MatDialog);
  private destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit() {
    this.userCategories$ = this.accountingService.getCurrentUserCategories(this.userId);
  }

  saveCategory(formData: FormGroup<CategoryFormModel>) {
    if (formData.value) {
      const category: EventCategoryModel = {
        ...formData.getRawValue(),
        id: uuidv4(),
        userId: this.userId,
      };

      this.accountingService.createCategory(category).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe();
      }
  }

  openAddCategoryModal(): void {
    this.dialog.open(AddCategoryModalComponent, {
      ...modalConfig,
    }).afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((formData: FormGroup<CategoryFormModel>) => {
      this.saveCategory(formData);
    });
  }
}
