import { Component, inject, OnInit } from '@angular/core';
import { AccountingService } from '@home/services/accounting.service';
import { EventModel, ExtendedEventModel } from '@home/models/event.model';
import { map, Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent implements OnInit {
  eventIndex: string = '';
  event$: Observable<ExtendedEventModel> = of();

  private accountingService: AccountingService = inject(AccountingService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.event$ = this.route.paramMap.pipe(
      switchMap(paramMap => {
        const eventId: string = paramMap.get('id')!;
        this.eventIndex = paramMap.get('index')!;

        return this.accountingService.getEventById(eventId).pipe(
          switchMap((event: EventModel) => {
            return this.accountingService.getCategoryById(event.categoryId.toString()).pipe(
              map(category => {
                const extendedEvent: ExtendedEventModel = {
                  ...event,
                  category: category
                };
                return extendedEvent;
              })
            );
          })
        );
      })
    );
  }
}
