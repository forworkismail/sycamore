import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { NgClass, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [NgIf, NgStyle, NgClass],
  template: `
  @if (isOpen) {
<div class="overlay" (click)="closeDrawer()"></div>
}
  <div class="drawer-container rounded-e-lg bg-app" [ngClass]="position" [ngStyle]="getStyle()">
    <ng-content></ng-content>
  </div>
  `,
  styleUrls: ['./drawer.component.css'],
})
export class DrawerComponent {
  @Input() position: 'start' | 'end' = 'start';
  @Input() width: number = 270;
  @Input() isOpen: boolean = false;
  @Output() drawerClosed = new EventEmitter<void>();

  getStyle() {
    const isStart =
      (this.position === 'start' && document.dir !== 'rtl') || (this.position === 'end' && document.dir === 'rtl');

    let transformValue = 'translateX(0%)';

    if (!this.isOpen) {
      transformValue = isStart ? 'translateX(-100%)' : 'translateX(100%)';
    }

    return { transform: transformValue, width: this.width + 'px' };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['position'] && !changes['position'].isFirstChange()) {
      this.isOpen = false;
    }
  }

  closeDrawer() {
    this.isOpen = false;
    this.drawerClosed.emit();
  }
}
