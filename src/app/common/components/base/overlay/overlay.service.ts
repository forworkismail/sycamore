import { ElementRef, EventEmitter, Injectable } from '@angular/core';
import {
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayComponent } from './overlay.component';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay) {}

  showOverlayForComponent(target: ElementRef): void {
    const positionStrategy = this.getPosition(target);
    const overlayConfig = new OverlayConfig({
      positionStrategy: positionStrategy,
    });

    this.overlayRef = this.overlay.create(overlayConfig);
    this.overlayRef.attach(new ComponentPortal(OverlayComponent));
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef?.detach());
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
}
