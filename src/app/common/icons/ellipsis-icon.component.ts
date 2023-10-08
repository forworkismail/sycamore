import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ellipsis-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg [attr.height]="height" [attr.width]="width" viewBox="0 0 10 20">
      <circle cx="5" cy="3" fill="currentColor" r="1.5" />
      <circle cx="5" cy="10" fill="currentColor" r="1.5" />
      <circle cx="5" cy="17" fill="currentColor" r="1.5" />
    </svg>
  `,
})
export class EllipsisIconComponent {
  @Input() height = 16;
  @Input() width = 16;
}
