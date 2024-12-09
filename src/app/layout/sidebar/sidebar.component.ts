import { Component, inject, OnInit } from '@angular/core';
import { UserModel } from '@auth/models/user';
import { Router } from '@angular/router';

interface link {
  url: string;
  title: string
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
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
  activeLink: string = '';

  private router: Router = inject(Router);

  ngOnInit() {
    this.setActiveLink(this.router.url)
  }

  setActiveLink(link: string): void {
    this.activeLink = link;
  }
}
