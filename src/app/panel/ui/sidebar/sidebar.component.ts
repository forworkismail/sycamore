import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { CloseIconComponent } from 'app/common/icons/close-icon.component';
import { SidebarMenuItem } from './sidebar.config';
import { ColorsIconComponent } from 'app/common/icons/colors-icon.component';
import { CompanyIconComponent } from 'app/common/icons/company-icon.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, CloseIconComponent, RouterLink, CompanyIconComponent],
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

  menu: SidebarMenuItem[] = [
    {
      name: 'Colors',
      icon: ColorsIconComponent,
      route: 'colors',
    },
  ];

  onClose() {
    this.close.emit();
  }
}
