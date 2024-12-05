import { Component } from '@angular/core';
import { UserModel } from '@auth/models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  user: UserModel = JSON.parse(localStorage.getItem('user')!);
}
