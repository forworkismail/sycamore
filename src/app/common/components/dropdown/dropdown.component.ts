import { Component, ElementRef, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

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
      '200ms ease-in-out',
      keyframes([
        style({ opacity: 1, transform: 'scale(1)', offset: 0 }),
        style({ opacity: 0, transform: 'scale(0.7)', offset: 1 }),
      ]),
    ),
  ]),
]);

@Component({
  selector: 'app-dropdown',
  standalone: true,
  template: `
    <div #trigger (click)="toggle()">
        <ng-content select="[dropdown-trigger]"></ng-content>
    </div>
  <ng-template>
      <div         [@overlayAnimation]="animationState" class="dropdown-content truncate rounded-lg border-2 border-primary bg-app p-1 shadow">
        <div class="dropdown-content-body p-2">
          <ng-content select="[dropdown-content]"></ng-content>
        </div>
      </div>
    </ng-template>
  `,
  animations: [overlayAnimation],
})
export class DropdownComponent {
  animationState: 'in' | 'void' = 'in';
  @ViewChild('trigger') trigger!: ElementRef;
  @ViewChild(TemplateRef) contentTemplate!: TemplateRef<any>;
  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay, private viewContainerRef: ViewContainerRef) {}
  toggle() {
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
      ]);

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
      setTimeout(() => {
        this.overlayRef?.detach();
        this.overlayRef = null;
      }, 200);
    }
  }

  ngOnDestroy() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
