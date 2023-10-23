import { NgClass, NgComponentOutlet, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TabBarItem } from './tab-bar.config';

@Component({
  selector: 'app-vertical-tab-bar',
  standalone: true,
  imports: [NgFor, RouterLink, NgClass, NgComponentOutlet],
  template: `
 <div class="space-y-1" >
      <a
      *ngFor="let tab of tabs"
        [routerLink]="['/panel', tab.link]"
        routerLinkActive="menu-active-link"
        class="me-4 flex cursor-pointer items-center space-x-2 rtl:space-x-reverse rounded p-2 hover:bg-tertiary"
        [ngClass]="tab.link === activeRoute ? 'bg-tertiary font-bold' : ''"
        (click)="getActiveRouteSegment()">
        <ng-container [ngComponentOutlet]="tab.icon"></ng-container>
        <div class="w-[70%] truncate">{{tab.label }}</div>
      </a>
    </div>
      
  `,
})
export class VerticalTabBarComponent {
  @Input({ required: true }) tabs: TabBarItem[] = [];
  @Input({ required: true }) activeRoute: string = '';

  getActiveRouteSegment() {
    // this.activeRoute = window.location.pathname.split('/').pop();
  }
}
