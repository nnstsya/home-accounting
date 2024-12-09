import { Component, inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EventCategoryModel } from '@home/models/event.model';
import { AccountingService } from '@home/services/accounting.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss'
})
export class RecordsComponent implements OnInit {
  userCategories$: Observable<EventCategoryModel[]> = of();

  userId: string = JSON.parse(localStorage.getItem('user')!).id;

  private accountingService: AccountingService = inject(AccountingService);

  ngOnInit() {
    this.userCategories$ = this.accountingService.getCurrentUserCategories(this.userId);
  }
}
