import { AfterViewInit, Component, input, InputSignal } from '@angular/core';
import { EventCategoryModel } from '@home/models/event.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-records-table',
  templateUrl: './records-table.component.html',
  styleUrl: './records-table.component.scss'
})
export class RecordsTableComponent implements AfterViewInit {
  data: InputSignal<EventCategoryModel[]> = input.required<EventCategoryModel[]>();

  displayedColumns: string[] = ['index', 'category', 'capacity', 'actions'];
  dataSource: MatTableDataSource<EventCategoryModel> = new MatTableDataSource();

  ngAfterViewInit(): void {
    this.dataSource.data = this.data();
  }
}
