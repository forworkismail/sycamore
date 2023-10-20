import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-uparrow-icon',
  standalone: true,
  template: `
    <svg [attr.height]="height" [attr.width]="width" viewBox="0 0 512 512">
      <path d="M256,34,432,210l-21.2,21.21L271,91.4V478H241V91.4L101.16,231.25,80,210Z"/>
    </svg>
  `,
})
export class UpArrowIconComponent {
  @Input() height = 14;
  @Input() width = 16;
}
