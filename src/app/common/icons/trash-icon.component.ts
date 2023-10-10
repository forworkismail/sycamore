import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trash-icon',
  standalone: true,
  template: `
<svg viewBox="0 0 256 256" [attr.height]="height" [attr.width]="width">
  <rect fill="none" height="256" width="256"/>
  <line fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" x1="216" x2="40" y1="56" y2="56"/>
  <line fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" x1="104" x2="104" y1="104" y2="168"/>
  <line fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" x1="152" x2="152" y1="104" y2="168"/>
  <path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
  <path d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
</svg>
  `,
})
export class TrashIconComponent {
  @Input() height = 16;
  @Input() width = 16;
}
