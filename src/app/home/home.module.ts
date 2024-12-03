import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { LayoutModule } from '@layout/layout.module';
import { HomeRoutingModule } from '@home/home-routing.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    LayoutModule,
    HomeRoutingModule
  ],
  providers: []
})
export class HomeModule {}
