import { Component, inject, output, OutputEmitterRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  onToggleDrawer: OutputEmitterRef<void> = output<void>();
  router: Router = inject(Router);

  toggleDrawer(): void {
    this.onToggleDrawer.emit();
  }

  handleLogout(): void {
    localStorage.removeItem('user');
    this.router.navigateByUrl('auth');
  }
}
