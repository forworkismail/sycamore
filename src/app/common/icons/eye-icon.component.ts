import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-eye-icon',
  standalone: true,
  template: `
      <svg
          fill="none"
          height="18"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          width="18">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
      </svg>
  `,
})
export class EyeIconComponent {
  @Input() height = 14;
  @Input() width = 14;
}
