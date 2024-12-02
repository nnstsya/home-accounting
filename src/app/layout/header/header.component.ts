import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  router: Router = inject(Router);

  handleLogout(): void {
    localStorage.removeItem('user');
    this.router.navigateByUrl('auth');
  }
}
