import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { TextTitleComponent } from '../common/components/text-title/text-title.component';
import { SidebarIconComponent } from '../common/icons/sidebar-icon.component';
import { DrawerComponent } from '../common/components/drawer/drawer.component';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { CompanyIconComponent } from '../common/icons/company-icon.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  templateUrl: './panel.component.html',
  imports: [
    CommonModule,
    TextTitleComponent,
    RouterOutlet,
    SidebarIconComponent,
    DrawerComponent,
    SidebarComponent,
    CompanyIconComponent,
  ],
})
export default class PanelComponent {
  @ViewChild('triggerButton', { static: true }) triggerButton: ElementRef = {} as ElementRef;
  activeRoute = '';
  routerSubscription = new Subscription();
  toggleSidebar = false;

  private router = inject(Router);
  // private overlayService = inject(OverlayService);

  ngOnInit() {
    this.getActiveRouteSegment();
    this.routerSubscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.getActiveRouteSegment();
    });
  }

  getActiveRouteSegment(): void {
    const urlSegments = this.router.url.split('/');
    this.activeRoute = urlSegments[2] || urlSegments[1];
  }

  onToggleSidebar() {
    this.toggleSidebar = !this.toggleSidebar;
  }

  // showOverlay(): void {
  //   this.overlayService.showOverlayForComponent(this.triggerButton);
  // }
}
