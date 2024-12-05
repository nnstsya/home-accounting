import { Component, inject, OnInit } from '@angular/core';
import { AccountingService } from '@home/services/accounting.service';
import { EventCategoryModel, EventModel, ExtendedEventModel } from '@home/models/event.model';
import { combineLatest, map, Observable, of } from 'rxjs';

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

  ngOnInit() {
    this.getData()
  }

  getData(): void {
    this.getUserCategories();
    this.getEventsData();
    this.getExtendedEventsData();
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
            category: category || { id: 0, name: 'Unknown', capacity: 0, userId: 0 }
          };
        });
      })
    );
  }
}
