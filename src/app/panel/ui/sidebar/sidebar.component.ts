import { Component, EventEmitter, Output } from '@angular/core';
import { NgClass, NgComponentOutlet, NgFor } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { CloseIconComponent } from 'app/common/icons/close-icon.component';
import { TabBarItem } from '../../../common/components/tab-bar/tab-bar.config';
import { ColorsIconComponent } from 'app/common/icons/colors-icon.component';
import { CompanyIconComponent } from 'app/common/icons/company-icon.component';
import { TableIconComponent } from 'app/common/icons/table.icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgClass,
    NgFor,
    NgComponentOutlet,
    CloseIconComponent,
    RouterLink,
    CompanyIconComponent,
    TableIconComponent,
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Output() close = new EventEmitter<void>();

  activeRoute: string = '';
  routerSubscription: Subscription = new Subscription();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getActiveRouteSegment();

    this.routerSubscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.getActiveRouteSegment();
    });
  }

  getActiveRouteSegment(): void {
    const urlSegments = this.router.url.split('/');
    this.activeRoute = urlSegments[2];
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  menu: TabBarItem[] = [
    {
      label: 'Colors',
      icon: ColorsIconComponent,
      link: 'colors',
    },
    {
      label: 'Tables',
      icon: TableIconComponent,
      link: 'tables',
    },
  ];

  onClose() {
    this.close.emit();
  }
}
