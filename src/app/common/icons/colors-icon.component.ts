import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-colors-icon',
  standalone: true,
  template: `
  <svg [attr.width]="width" [attr.height]="height" viewBox="0 0 32 32">
  <defs>
    <style>
      .cls-1{fill:none;}
    </style>
  </defs>
  <circle cx="10" cy="12" r="2" />
  <circle cx="16" cy="9" r="2" />
  <circle cx="22" cy="12" r="2" />
  <circle cx="23" cy="18" r="2" />
  <circle cx="19" cy="23" r="2" />
  <path
    d="M16.54,2A14,14,0,0,0,2,16a4.82,4.82,0,0,0,6.09,4.65l1.12-.31A3,3,0,0,1,13,23.24V27a3,3,0,0,0,3,3A14,14,0,0,0,30,15.46,14.05,14.05,0,0,0,16.54,2Zm8.11,22.31A11.93,11.93,0,0,1,16,28a1,1,0,0,1-1-1V23.24a5,5,0,0,0-5-5,5.07,5.07,0,0,0-1.33.18l-1.12.31A2.82,2.82,0,0,1,4,16,12,12,0,0,1,16.47,4,12.18,12.18,0,0,1,28,15.53,11.89,11.89,0,0,1,24.65,24.32Z" />
  <rect class="cls-1" data-name="&lt;Transparent Rectangle&gt;" height="32" id="_Transparent_Rectangle_" width="32" />
</svg>

  `,
})
export class ColorsIconComponent {
  @Input() height: string = '18';
  @Input() width: string = '18';
}
