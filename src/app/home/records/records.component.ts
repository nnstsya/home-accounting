import { Component, inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EventCategoryModel } from '@home/models/event.model';
import { AccountingService } from '@home/services/accounting.service';
import { MatDialog } from '@angular/material/dialog';
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

  ngOnInit() {
    this.userCategories$ = this.accountingService.getCurrentUserCategories(this.userId);
  }

  openAddEventModal(): void {
    this.dialog.open(AddEventModalComponent, {
      width: '400px',
      disableClose: true,
      data: { categories: this.userCategories$ }
    });
  }
}
