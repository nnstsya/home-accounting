import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EventCategoryModel, EventModel } from '@home/models/event.model';
import { AccountingService } from '@home/services/accounting.service';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { v4 as uuidv4 } from 'uuid';
import { CategoryFormModel } from '@home/models/form.model';
import { EventFormModel } from '@home/models/form.model';
import { FormGroup } from '@angular/forms';
import { modalConfig } from '@home/modals/modal-config';
import { CategoryModalComponent } from '@home/modals/category-modal/category-modal.component';
import { AddEventModalComponent } from '@home/modals/add-event-modal/add-event-modal.component';

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

  createCategory(formData: FormGroup<CategoryFormModel>) {
    if (formData) {
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

  openCreateCategoryModal(category?: EventCategoryModel): void {
    this.dialog.open(CategoryModalComponent, {
      ...modalConfig,
      data: {
        category: category || null,
      }
    }).afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((formData: FormGroup<CategoryFormModel>) => {
      this.createCategory(formData);
    });
  }

  saveEvent(formData: FormGroup<EventFormModel>) {
    if (formData.value) {
      const event: EventModel = {
        ...formData.getRawValue(),
        id: uuidv4(),
        date: new Date().toLocaleString(),
        userId: this.userId,
        amount: Number(formData.value.amount),
      };

      this.accountingService.createEvent(event).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe();
    }
  }

  openAddEventModal(): void {
    this.dialog.open(AddEventModalComponent, {
      ...modalConfig,
      data: {categories: this.userCategories$}
    }).afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((formData: FormGroup<EventFormModel>) => {
      this.saveEvent(formData);
    });
  }
}
