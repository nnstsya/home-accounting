import { Component, inject, OnInit } from '@angular/core';
import { AccountingService } from '@home/services/accounting.service';
import { EventModel } from '@home/models/event.model';
import { Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent implements OnInit {
  eventIndex: string = '';
  event$: Observable<EventModel> = of();

  private accountingService: AccountingService = inject(AccountingService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.event$ = this.route.paramMap.pipe(
      switchMap(paramMap => {
        const id: string = paramMap.get('id')!;
        this.eventIndex = paramMap.get('index')!;
        return this.accountingService.getEventById(id);
      })
    );
  }
}
