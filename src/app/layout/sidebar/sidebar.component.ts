import { Component, OnInit } from '@angular/core';
import { UserModel } from '@auth/models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  user: UserModel = <UserModel>{};

  ngOnInit() {
    const storedUser: string | null = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : this.getDefaultUser();
  }

  private getDefaultUser(): UserModel {
    return {
      id: Date.now(),
      name: 'Guest',
      email: 'guest@example.com',
    };
  }
}
