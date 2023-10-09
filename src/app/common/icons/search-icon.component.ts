import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-icon',
  standalone: true,
  template: `
  <svg
  [attr.height]="height"
  [attr.width]="width"
  fill="none"
  viewBox="0 0 24 28"
 >
  <rect
    fill="currentColor"
    height="2"
    opacity="1"
    rx="1"
    transform="rotate(45 17.0365 15.1223)"
    width="8.15546"
    x="17.0365"
    y="15.1223" />
  <path
    d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
    fill="currentColor" />
</svg>

  `,
})
export class SearchIconComponent {
  @Input() height = 16;
  @Input() width = 16;
}
