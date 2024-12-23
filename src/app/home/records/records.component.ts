import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { EventCategoryModel, EventModel } from '@home/models/event.model';
import { AccountingService } from '@home/services/accounting.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEventModalComponent } from '@home/modals/add-event-modal/add-event-modal.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { v4 as uuidv4 } from 'uuid';
import { EventFormModel } from '@home/models/form.model';
import { FormGroup } from '@angular/forms';
import { modalConfig } from '@home/modals/modal-config';
import { BillingModel } from '@home/models/billing.model';

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

  saveEvent(formData: FormGroup<EventFormModel>) {
    if (formData.valid) {
      const event: EventModel = {
        ...formData.getRawValue(),
        id: uuidv4(),
        date: new Date().toLocaleString(),
        userId: this.userId,
        amount: Number(formData.value.amount),
      };

      const updateBalance = event.type === 'Income'
        ? event.amount
        : -event.amount;

      this.accountingService.createEvent(event).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(() => {
        this.updateUserBalance(updateBalance);
      });
    }
  }

  updateUserBalance(amount: number): void {
    this.accountingService.getCurrentUserBill(this.userId).pipe(
      switchMap((bill: BillingModel) => {
        const updatedBalance = bill.value + amount;
        const updatedBilling = { ...bill, value: updatedBalance };

        return this.accountingService.updateUserBill(updatedBilling);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
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
