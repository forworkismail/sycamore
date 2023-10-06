import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-icon',
  standalone: true,
  template: `
  <svg [attr.height]="height" [attr.width]="width" viewBox="0 0 256 256">
  <rect fill="none" height="256" width="256" />
  <path
    d="M32,56H224a0,0,0,0,1,0,0V192a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V56A0,0,0,0,1,32,56Z"
    fill="none"
    stroke="#000"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="12" />
  <line
    fill="none"
    stroke="#000"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="12"
    x1="32"
    x2="224"
    y1="104"
    y2="104" />
  <line
    fill="none"
    stroke="#000"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="12"
    x1="32"
    x2="224"
    y1="152"
    y2="152" />
  <line
    fill="none"
    stroke="#000"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="12"
    x1="88"
    x2="88"
    y1="104"
    y2="200" />
</svg>
  `,
})
export class TableIconComponent {
  @Input() height: string = '22';
  @Input() width: string = '18';
}
