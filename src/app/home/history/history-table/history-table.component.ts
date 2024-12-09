import { AfterViewInit, Component, input, InputSignal, Signal, viewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExtendedEventModel } from '@home/models/event.model';

interface IndexedData extends Omit<ExtendedEventModel, 'category'> {
  index: number;
  category: string;
}

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrl: './history-table.component.scss'
})
export class HistoryTableComponent implements AfterViewInit {
  data: InputSignal<ExtendedEventModel[]> = input.required<ExtendedEventModel[]>();

  displayedColumns: string[] = ['index', 'amount', 'date', 'category', 'type', 'actions'];
  dataSource: MatTableDataSource<IndexedData> = new MatTableDataSource();

  paginator: Signal<MatPaginator | undefined> = viewChild<MatPaginator>(MatPaginator);
  sort: Signal<MatSort> = viewChild.required<MatSort>(MatSort);

  ngAfterViewInit(): void {
    const dataWithIndex: IndexedData[] = this.data().map((item, index) => ({
      ...item,
      category: item.category.name,
      index: index + 1,
    }));

    this.dataSource = new MatTableDataSource(dataWithIndex);

    this.dataSource.paginator = this.paginator() ?? null;
    this.dataSource.sort = this.sort();
  }

  applyFilter(event: Event) {
    const filterValue: string = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
