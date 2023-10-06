import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-close-icon',
  template: `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" [style.width]="width" [style.height]="height">
  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" />
  <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" />
</svg>`,
  standalone: true,
})
export class CloseIconComponent {
  @Input() height: string = '18';
  @Input() width: string = '18';

  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
