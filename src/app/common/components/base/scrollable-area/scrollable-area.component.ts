import { Component, Input } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-scrollable-area',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './scrollable-area.component.html',
})
export class ScrollableAreaComponent {
  @Input() height = '300px';
  @Input() scrollBehavior: 'always' | 'onHover' = 'always';
}
