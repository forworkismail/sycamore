import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { TextTitleComponent } from '../common/components/text-title/text-title.component';
import { SidebarIconComponent } from '../common/icons/sidebar-icon.component';
import { DrawerComponent } from '../common/components/drawer/drawer.component';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { CompanyIconComponent } from '../common/icons/company-icon.component';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { TrashIconComponent } from '../common/icons/trash-icon.component';
import { SearchIconComponent } from '../common/icons/search-icon.component';
import { ConfigurationIconComponent } from '../common/icons/configuration-icon.component';
import { ButtonComponent } from '../common/components/button/button.component';
import { ListComponent } from '../common/components/list/list.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  templateUrl: './panel.component.html',
  imports: [
    TitleCasePipe,
    TextTitleComponent,
    RouterOutlet,
    SidebarIconComponent,
    DrawerComponent,
    SidebarComponent,
    CompanyIconComponent,
    TrashIconComponent,
    SearchIconComponent,
    ConfigurationIconComponent,
    ButtonComponent,
    ListComponent,
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
  abc() {
    console.log('ABC');
  }
}
