import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-draft-icon',
  standalone: true,
  template: `
    <svg height="24" viewBox="0 0 24 24" [attr.height]="height" [attr.width]="width">
  <path
    d="M17,21 L17,23 L15,23 L15,21 L17,21 Z M19,21 L21,21 C21,22.1045695 20.1045695,23 19,23 L19,21 Z M13,21 L13,23 L11,23 L11,21 L13,21 Z M9,21 L9,23 L7,23 L7,21 L9,21 Z M5,21 L5,23 C3.8954305,23 3,22.1045695 3,21 L5,21 Z M19,13 L21,13 L21,15 L19,15 L19,13 Z M19,11 L19,9 L15,9 C13.8954305,9 13,8.1045695 13,7 L13,3 L5,3 L5,11 L3,11 L3,3 C3,1.8954305 3.8954305,1 5,1 L15.4142136,1 L21,6.58578644 L21,11 L19,11 Z M5,13 L5,15 L3,15 L3,13 L5,13 Z M19,17 L21,17 L21,19 L19,19 L19,17 Z M5,17 L5,19 L3,19 L3,17 L5,17 Z M15,3.41421356 L15,7 L18.5857864,7 L15,3.41421356 Z"
    fill-rule="evenodd" />
</svg>
  `,
})
export class DraftIconComponent {
  @Input() height: string = '18';
  @Input() width: string = '18';
}
