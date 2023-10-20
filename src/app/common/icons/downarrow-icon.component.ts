import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-downarrow-icon',
  standalone: true,
  template: `
<svg [attr.height]="height" [attr.width]="width" viewBox="0 0 512 512">
  <path d="M256,478,80,302l21.2-21.21L241,420.6V34h30V420.6L410.84,280.75,432,302Z"/>
</svg>
  `,
})
export class DownArrowIconComponent {
  @Input() height = 14;
  @Input() width = 16;
}
