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
import { AsyncPipe, DatePipe, DecimalPipe, KeyValuePipe } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { MatError } from '@angular/material/form-field';

@NgModule({
  declarations: [
    HomeComponent,
    BillingComponent
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
    MatError
  ],
  providers: []
})
export class HomeModule {}
