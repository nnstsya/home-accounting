import { Component } from '@angular/core';
import { UserModel } from '@auth/models/user';

interface link {
  url: string;
  title: string
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  user: UserModel = JSON.parse(localStorage.getItem('user')!);
  links: link[] = [
    {
      url: '/home/billing',
      title: 'Billing'
    },
    {
      url: '/home/history',
      title: 'History'
    },
    {
      url: '/home/records',
      title: 'Records'
    }
  ];
  activeLink: string = this.links[0].url;

  setActiveLink(link: string): void {
    this.activeLink = link;
  }
}
