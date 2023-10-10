import { Component, ElementRef, Injectable } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay) {}

  showOverlayForComponent(target: ElementRef, componentToOverlay: ComponentType<Component>): void {
    const positionStrategy = this.getPosition(target);
    const overlayConfig = new OverlayConfig({
      positionStrategy: positionStrategy,
    });
    this.overlayRef = this.overlay.create(overlayConfig);
    this.overlayRef.attach(new ComponentPortal(componentToOverlay));
  }

  private getPosition(target: ElementRef): PositionStrategy {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(target)
      .withFlexibleDimensions(false)
      .withViewportMargin(8)
      .withPositions([
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
        },
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
        },
        {
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
        },
        {
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
        },
      ]);

    return positionStrategy;
  }

  close(): void {
    if (this.overlayRef) {
      // Detach the content from the overlay but don't destroy it
      this.overlayRef.detach();
    }
  }
}
