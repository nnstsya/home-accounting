import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { LayoutModule } from '@layout/layout.module';
import { HomeRoutingModule } from '@home/home-routing.module';
import { BillingComponent } from './billing/billing.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe, DatePipe, DecimalPipe, KeyValuePipe, NgClass } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { HistoryComponent } from './history/history.component';
import { MatButton } from '@angular/material/button';
import { HistoryTableComponent } from '@home/history/history-table/history-table.component';
import { HistoryChartComponent } from '@home/history/history-chart/history-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatPaginator } from '@angular/material/paginator';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { EventDetailsComponent } from './event-details/event-details.component';
import { RecordsComponent } from './records/records.component';
import { RecordsTableComponent } from './records/records-table/records-table.component';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { DeleteCategoryModalComponent } from './modals/delete-category-modal/delete-category-modal.component';

@NgModule({
  declarations: [
    HomeComponent,
    BillingComponent,
    HistoryComponent,
    HistoryTableComponent,
    HistoryChartComponent,
    EventDetailsComponent,
    RecordsComponent,
    RecordsTableComponent,
    DeleteCategoryModalComponent
  ],
  imports: [
    LayoutModule,
    HomeRoutingModule,
    MatTable,
    MatHeaderRow,
    MatRow,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatIcon,
    AsyncPipe,
    DecimalPipe,
    KeyValuePipe,
    MatRowDef,
    MatHeaderRowDef,
    DatePipe,
    MatDivider,
    MatButton,
    HighchartsChartModule,
    MatButton,
    NgClass,
    MatPaginator,
    MatFormField,
    MatInput,
    MatLabel,
    MatSort,
    MatSortHeader,
    MatDialogTitle,
    MatDialogClose,
    ReactiveFormsModule,
    MatRadioButton,
    MatError,
    MatDialogActions,
    MatRadioGroup,
    MatOption,
    MatSelect,
    MatDialogContent
  ],
  providers: []
})
export class HomeModule {}
