import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-icon',
  standalone: true,
  template: `<svg
  fill="none"
  [attr.height]="height"
  [attr.width]="width"
  stroke="currentColor"
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width="2"
  viewBox="0 0 24 24">
  <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
  <line x1="9" x2="9" y1="3" y2="21" />
</svg>
  `,
})
export class SidebarIconComponent {
  @Input() height = '24';
  @Input() width = '24';
}
