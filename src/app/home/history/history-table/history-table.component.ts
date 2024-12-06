import { Component, input, InputSignal, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ExtendedEventModel } from '@home/models/event.model';

type IndexedData = ExtendedEventModel & { index: number };

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrl: 'history-table.component.scss'
})
export class HistoryTableComponent implements OnInit {
  data: InputSignal<ExtendedEventModel[]> = input.required<ExtendedEventModel[]>();

  displayedColumns: string[] = ['index', 'amount', 'date', 'category', 'type', 'actions'];
  dataSource: MatTableDataSource<IndexedData> = new MatTableDataSource();

  ngOnInit() {
    const dataWithIndex: IndexedData[] = this.data().map((item, index) => ({
      ...item,
      index: index + 1,
    }));

    this.dataSource = new MatTableDataSource(dataWithIndex);
  }
}
