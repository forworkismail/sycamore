import { Component, ElementRef, Input } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-scrollable-area',
  standalone: true,
  imports: [NgClass, NgStyle],
  template: `
  <div
  [ngStyle]="containerStyle"
        [ngClass]="{
            'overflow-y-auto overflow-x-auto': scrollBehavior === 'always', 
            'overflow-hidden hover:overflow-auto': scrollBehavior === 'onHover'
        }">
        <ng-content></ng-content>
    </div>
  `,
})
export class ScrollableAreaComponent {
  @Input() scrollBehavior: 'always' | 'onHover' = 'always';
  @Input() height: string | null = null;
  containerStyle: { height?: string; width?: string } = {};
  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    if (!this.height) {
      const positionFromTop = this.elRef.nativeElement.getBoundingClientRect().top;
      this.containerStyle.height = `calc(100vh - ${positionFromTop}px - 10px)`;
    } else {
      this.containerStyle.height = this.height;
    }
    const parentWidth = this.elRef.nativeElement.parentElement.getBoundingClientRect().width;
    this.containerStyle.width = `${parentWidth}px`;
  }
}
