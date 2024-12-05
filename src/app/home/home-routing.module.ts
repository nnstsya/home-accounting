import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@home/home.component';
import { BillingComponent } from '@home/billing/billing.component';
import { HistoryComponent } from '@home/history/history.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'billing',
        component: BillingComponent
      },
      {
        path: 'history',
        component: HistoryComponent
      },
      {
        path: '**',
        redirectTo: 'billing',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
