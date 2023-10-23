import { Component, ElementRef, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NgStyle } from '@angular/common';
import { ScrollableAreaComponent } from '../base/scrollable-area/scrollable-area.component';
import { CloseIconComponent } from '../../icons/close-icon.component';
import { ButtonComponent } from '../button/button.component';

const overlayAnimation = trigger('overlayAnimation', [
  state('in', style({ opacity: 1, transform: 'scale(1)' })),
  transition('void => in', [
    animate(
      '200ms ease-in-out',
      keyframes([
        style({ opacity: 0, transform: 'scale(0.7)', offset: 0 }),
        style({ opacity: 1, transform: 'scale(1.05)', offset: 0.8 }),
        style({ opacity: 1, transform: 'scale(1)', offset: 1 }),
      ]),
    ),
  ]),
  transition('in => void', [
    animate(
      '100ms ease-in',
      keyframes([
        style({ opacity: 1, transform: 'scale(1)', offset: 0 }),
        style({ opacity: 0, transform: 'scale(0.7)', offset: 1 }),
      ]),
    ),
  ]),
]);

@Component({
  selector: 'app-dropdown-window',
  standalone: true,
  template: `
    <div #trigger  (click)="toggle()">
        <ng-content select="[dropdown-trigger]"></ng-content>
    </div>
  <ng-template>
    <div  [@overlayAnimation]="animationState" [ngStyle]="{'width': this.width }" class="dropdown-content border truncate rounded bg-app shadow">
  <div class="sticky border-b top-0 z-50 flex flex-row-reverse font-bold">
    <app-button [type]="'icon'" (click)="toggle()" >
      <app-close-icon [height]="'12'" [width]="'12'"></app-close-icon>
    </app-button>
  </div>
        <app-scrollable-area [height]="height">
          <ng-content select="[dropdown-content]"></ng-content>
        </app-scrollable-area>
        </div>
        
    </ng-template>
  `,
  animations: [overlayAnimation],
  imports: [NgStyle, ScrollableAreaComponent, CloseIconComponent, ButtonComponent],
})
export class DropdownWindowComponent {
  @Input({ required: true }) width = 'auto';
  @Input({ required: true }) height = 'auto';

  animationState: 'in' | 'void' = 'in';
  @ViewChild('trigger') trigger!: ElementRef;
  @ViewChild(TemplateRef) contentTemplate!: TemplateRef<any>;
  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay, private viewContainerRef: ViewContainerRef) {}
  toggle() {
    event?.stopPropagation();
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.close();
    } else {
      this.openOverlay();
    }
  }

  private openOverlay() {
    if (this.overlayRef) {
      return;
    }
    this.animationState = 'in';
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.trigger)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
      ])
      .withViewportMargin(10)
      .withTransformOriginOn('.dropdown-content');

    const config = new OverlayConfig({
      positionStrategy: positionStrategy,
    });

    this.overlayRef = this.overlay.create(config);
    this.overlayRef.attach(new TemplatePortal(this.contentTemplate, this.viewContainerRef));
    this.overlayRef.backdropClick().subscribe(() => this.close());
  }

  close() {
    if (this.overlayRef) {
      this.animationState = 'void';
      this.overlayRef.detach();
      this.overlayRef = null;
    }
  }

  ngOnDestroy() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
