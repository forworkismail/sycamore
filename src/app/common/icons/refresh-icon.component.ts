import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-refresh-icon',
  standalone: true,
  template: `
<svg
    viewBox="0 0 32 32"
    [attr.height]="height"
    [attr.width]="width"
>
    <path
        d="M28,16c-1.219,0-1.797,0.859-2,1.766C25.269,21.03,22.167,26,16,26c-5.523,0-10-4.478-10-10S10.477,6,16,6  c2.24,0,4.295,0.753,5.96,2H20c-1.104,0-2,0.896-2,2s0.896,2,2,2h6c1.104,0,2-0.896,2-2V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v0.518  C21.733,2.932,18.977,2,16,2C8.268,2,2,8.268,2,16s6.268,14,14,14c9.979,0,14-9.5,14-11.875C30,16.672,28.938,16,28,16z"
        stroke="currentColor"
        stroke-width="0.05"
    />
</svg>

  `,
})
export class RefreshIconComponent {
  @Input() height = 14;
  @Input() width = 13;
}
