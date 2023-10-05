import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
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

  // menu: ISideBarMenu[] = [
  //   { name: 'portfolio', icon: PortfolioIconComponent, route: 'portfolio' },
  //   {
  //     name: 'programs',
  //     icon: ProgramsIconComponent,
  //     route: 'programs',
  //   },
  //   {
  //     name: 'projects',
  //     icon: ProjectsIconComponent,
  //     route: 'projects',
  //   },
  //   { name: 'statements', icon: StatementsIconComponent, route: 'statements' },
  //   { name: 'reports', icon: ReportsIconComponent, route: 'reports' },
  //   {
  //     name: 'customers',
  //     icon: CustomersIconComponent,
  //     route: 'customers',
  //   },
  // ];

  onClose() {
    this.close.emit();
  }
}
