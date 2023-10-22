import { Component, ElementRef, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

const overlayAnimation = trigger('overlayAnimation', [
  state('in', style({ opacity: 1 })),
  transition('void => in', [style({ opacity: 0 }), animate('300ms ease-in-out')]),
  state('out', style({ opacity: 0 })),
  transition('in => out', [animate('300ms ease-in-out')]),
]);

@Component({
  selector: 'app-overlay',
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
  imports: [CommonModule],
  animations: [overlayAnimation], // Add the animation trigger
})
export class OverlayComponent {
  animationState: 'in' | 'out' = 'in';
  @ViewChild('trigger') trigger!: ElementRef;
  @ViewChild(TemplateRef) contentTemplate!: TemplateRef<any>;
  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay, private viewContainerRef: ViewContainerRef) {}
  toggle() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.close();
    } else {
      console.log('open');
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
      this.animationState = 'out';
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
