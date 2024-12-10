import { AfterViewInit, Component, DestroyRef, inject, input, InputSignal } from '@angular/core';
import { EventCategoryModel } from '@home/models/event.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryModalComponent } from '@home/modals/edit-category-modal/edit-category-modal.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { CategoryEditFormModel } from '@home/models/form.model';
import { AccountingService } from '@home/services/accounting.service';

@Component({
  selector: 'app-records-table',
  templateUrl: './records-table.component.html',
  styleUrl: './records-table.component.scss'
})
export class RecordsTableComponent implements AfterViewInit {
  data: InputSignal<EventCategoryModel[]> = input.required<EventCategoryModel[]>();

  displayedColumns: string[] = ['index', 'category', 'capacity', 'actions'];
  dataSource: MatTableDataSource<EventCategoryModel> = new MatTableDataSource();
  userId: string = JSON.parse(localStorage.getItem('user')!).id;

  private dialog: MatDialog = inject(MatDialog);
  private accountingService: AccountingService = inject(AccountingService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    this.dataSource.data = this.data();
  }

  editCategory(formData: FormGroup<CategoryEditFormModel>) {
    const category: EventCategoryModel = {
      id: formData.value.id!,
      name: formData.value.name!,
      userId: this.userId,
      capacity: Number(formData.value.capacity),
    };
    this.accountingService.editCategory(category).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  openEditCategoryModal(category: EventCategoryModel): void {
    this.dialog.open(EditCategoryModalComponent, {
      width: '400px',
      disableClose: true,
      data: { categories: this.data(), category: category }
    }).afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((formData: FormGroup<CategoryEditFormModel>) => {
      if (formData) {
        this.editCategory(formData);
      }
    });
  }
}
