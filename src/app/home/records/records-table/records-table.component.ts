import { AfterViewInit, Component, DestroyRef, inject, input, InputSignal } from '@angular/core';
import { EventCategoryModel } from '@home/models/event.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AccountingService } from '@home/services/accounting.service';
import { DeleteCategoryModalComponent } from '@home/modals/delete-category-modal/delete-category-modal.component';
import { modalConfig } from '@home/modals/modal-config';
import { FormGroup } from '@angular/forms';
import { CategoryFormModel } from '@home/models/form.model';
import { EditCategoryModalComponent } from '@home/modals/edit-category-modal/edit-category-modal.component'

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

  editCategory(formData: FormGroup<CategoryFormModel>) {
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
    ).subscribe((formData: FormGroup<CategoryFormModel>) => {
      if (formData) {
        this.editCategory(formData);
      }
    });
  }

  deleteCategory(categoryId: string) {
    this.accountingService.deleteCategory(categoryId).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  openDeleteCategoryModal(categoryId: string, categoryName: string): void {
    this.dialog.open(DeleteCategoryModalComponent, {
      ...modalConfig,
      data: { currentCategory: categoryName }
    }).afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((result: boolean) => {
      if (result) {
        this.deleteCategory(categoryId);
      }
    });
  }
}
