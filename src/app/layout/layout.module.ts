import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatTabLink, MatTabNav } from '@angular/material/tabs';
import { MatDivider } from '@angular/material/divider';

@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
    SidebarComponent
  ],
  imports: [
    MatIcon,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    RouterLink,
    MatDrawerContainer,
    MatDrawer,
    MatDivider,
    RouterLinkActive,
    MatTabLink,
    MatTabNav,
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule {}
