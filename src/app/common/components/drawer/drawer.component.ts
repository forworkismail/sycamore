import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css'],
})
export class DrawerComponent {
  @Input() position: 'start' | 'end' = 'start';
  @Input() isOpen: boolean = false;
  @Output() drawerClosed = new EventEmitter<void>();

  getStyle() {
    const isStart =
      (this.position === 'start' && document.dir !== 'rtl') || (this.position === 'end' && document.dir === 'rtl');

    let transformValue = 'translateX(0%)';

    if (!this.isOpen) {
      transformValue = isStart ? 'translateX(-100%)' : 'translateX(100%)';
    }

    return { transform: transformValue };
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
