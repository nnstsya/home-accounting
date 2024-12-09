import { AfterViewInit, Component, inject, input, InputSignal } from '@angular/core';
import { EventCategoryModel } from '@home/models/event.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryModalComponent } from '@home/modals/edit-category-modal/edit-category-modal.component';
import { DeleteCategoryModalComponent } from '@home/modals/delete-category-modal/delete-category-modal.component';

interface IndexedData extends EventCategoryModel {
  index: number;
}

@Component({
  selector: 'app-records-table',
  templateUrl: './records-table.component.html',
  styleUrl: './records-table.component.scss'
})
export class RecordsTableComponent implements AfterViewInit {
  data: InputSignal<EventCategoryModel[]> = input.required<EventCategoryModel[]>();

  displayedColumns: string[] = ['index', 'category', 'capacity', 'actions'];
  dataSource: MatTableDataSource<IndexedData> = new MatTableDataSource();

  private dialog: MatDialog = inject(MatDialog);

  ngAfterViewInit(): void {
    this.dataSource.data = this.data().map((item, index) => ({
      ...item,
      index: index + 1,
    }));
  }

  openEditCategoryModal(categoryId: number): void {
    this.dialog.open(EditCategoryModalComponent, {
      width: '400px',
      disableClose: true,
      data: { categories: this.data(), currentCategoryId: categoryId }
    });
  }

  openDeleteCategoryModal(category: EventCategoryModel): void {
    this.dialog.open(DeleteCategoryModalComponent, {
      width: '400px',
      disableClose: true,
      data: { currentCategory: category }
    });
  }
}
