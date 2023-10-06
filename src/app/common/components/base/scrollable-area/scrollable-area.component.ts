import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scrollable-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scrollable-area.component.html',
})
export class ScrollableAreaComponent {
  @Input() height = 'calc(100vh - 100px)';
}
