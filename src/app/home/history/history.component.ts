import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AccountingService } from '@home/services/accounting.service';
import { EventCategoryModel, EventModel, ExtendedEventModel } from '@home/models/event.model';
import { combineLatest, map, Observable, of } from 'rxjs';
import { AddEventModalComponent } from '@home/modals/add-event-modal/add-event-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { EventFormModel } from '@home/models/form.model';
import { v4 as uuidv4 } from 'uuid';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { modalConfig } from '@home/modals/modal-config';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  userCategories$: Observable<EventCategoryModel[]> = of();
  eventsData$: Observable<EventModel[]> = of();
  extendedEventsData$: Observable<ExtendedEventModel[]> = of();

  userId: string = JSON.parse(localStorage.getItem('user')!).id;

  private accountingService: AccountingService = inject(AccountingService);
  private dialog: MatDialog = inject(MatDialog);
  private destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit() {
    this.getData()
  }

  getData(): void {
    this.getUserCategories();
    this.getEventsData();
    this.getExtendedEventsData();
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
      ).subscribe(() => {
        this.getData();
      });
    }
  }

  openAddEventModal(): void {
    this.dialog.open(AddEventModalComponent, {
      ...modalConfig,
      data: {
        categories: this.userCategories$
      }
    }).afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((formData: FormGroup<EventFormModel>) => {
      this.saveEvent(formData);
    });
  }

  private getUserCategories(): void {
    this.userCategories$ = this.accountingService.getCurrentUserCategories(this.userId);
  }

  private getEventsData(): void {
    this.eventsData$ = this.accountingService.getCurrentUserEvents(this.userId);
  }

  private getExtendedEventsData(): void {
    this.extendedEventsData$ = combineLatest([this.userCategories$, this.eventsData$]).pipe(
      map(([categories, events]: [EventCategoryModel[], EventModel[]]) => {
        return events.map((event: EventModel) => {
          const category: EventCategoryModel | undefined = categories.find((c: EventCategoryModel) => c.id == event.categoryId);
          return {
            ...event,
            category: category || { id: '0', name: 'Unknown', capacity: 0, userId: '0' }
          };
        });
      })
    );
  }
}
