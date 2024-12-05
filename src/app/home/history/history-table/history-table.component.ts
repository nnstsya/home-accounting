import { Component, input, InputSignal, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ExtendedEventModel } from '@home/models/event.model';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrl: 'history-table.component.scss'
})
export class HistoryTableComponent implements OnInit {
  data: InputSignal<ExtendedEventModel[]> = input.required<ExtendedEventModel[]>();

  displayedColumns: string[] = ['id', 'amount', 'date', 'category', 'type', 'actions'];
  dataSource: MatTableDataSource<ExtendedEventModel> = new MatTableDataSource();

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data());
  }
}
