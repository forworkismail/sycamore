import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plus-icon',
  standalone: true,
  template: `
        <svg [attr.fill]="'currentColor'" [attr.height]="height" [attr.width]="width" viewBox="0 0 512 512">
        <polygon points="448,224 288,224 288,64 224,64 224,224 64,224 64,288 224,288 224,448 288,448 288,288 448,288 " />
      </svg>
  `,
})
export class PlusIconComponent {
  @Input() height = 16;
  @Input() width = 14;
}
