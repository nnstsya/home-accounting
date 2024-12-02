import { Component, Signal, viewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: 'layout.component.scss'
})
export class LayoutComponent {
  drawer: Signal<MatDrawer> = viewChild.required<MatDrawer>('drawer');

  toggleDrawer() {
    this.drawer().toggle();
  }
}
