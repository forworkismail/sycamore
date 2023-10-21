import { Directionality } from '@angular/cdk/bidi';
import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

@Component({
  selector: 'app-chevron-icon',
  template: `
  <svg
  [attr.width]="width" [attr.height]="height"
  [ngStyle]="getRotationStyle()"
  viewBox="0 0 16 16"
  fill="none"
  stroke="currentColor"
  xmlns="http://www.w3.org/2000/svg"
  >
  <path d="M2 11l6 -6l6 6" stroke-width="2"></path>
  </svg>
`,
  standalone: true,
  imports: [NgStyle],
})
export class ChevronIconComponent {
  @Input() direction: 'up' | 'down' | 'left' | 'right' = 'down';
  @Input() height: string = '12';
  @Input() width: string = '12';

  private readonly directionality = inject(Directionality);

  getRotationStyle() {
    const isRtl = this.directionality.value === 'rtl';

    switch (this.direction) {
      case 'down':
        return { transform: 'rotate(180deg)' };
      case 'left':
        return { transform: isRtl ? 'rotate(90deg)' : 'rotate(-90deg)' };
      case 'right':
        return { transform: isRtl ? 'rotate(-90deg)' : 'rotate(90deg)' };
      case 'up':
      default:
        return {};
    }
  }
}
