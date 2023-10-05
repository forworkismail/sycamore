import { EventEmitter, Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayComponent } from './overlay.component';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private overlayRef: OverlayRef | null = null;
  private triggerElement: HTMLElement = {} as HTMLElement;
  backdropClicked = new EventEmitter<void>();

  constructor(private overlay: Overlay) {}

  toggleOverlay(triggerElement: HTMLElement) {
    this.closeOverlay();
    this.triggerElement = triggerElement;

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        disposeOnNavigation: true,
        positionStrategy: this.overlay
          .position()
          .flexibleConnectedTo(this.triggerElement)
          .withPositions([
            {
              originX: 'start',
              originY: 'bottom',
              overlayX: 'center',
              overlayY: 'bottom',
            },
          ]),
        scrollStrategy: this.overlay.scrollStrategies.block(),
      });
    }

    const overlayPortal = new ComponentPortal(OverlayComponent);
    this.overlayRef.attach(overlayPortal);
  }

  closeOverlay() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
      this.overlayRef = null;
      this.backdropClicked.emit();
    }
  }

  private getOverlayPosition(triggerRect: DOMRect, overlayWidth: number, overlayHeight: number): any {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    let originX: string = 'center';
    let originY: string = 'bottom';
    let overlayX: string = 'center';
    let overlayY: string = 'top';

    if (triggerRect.bottom + overlayHeight > viewportHeight) {
      originY = 'top';
      overlayY = 'bottom';
    }

    if (triggerRect.left + overlayWidth > viewportWidth) {
      originX = 'end';
      overlayX = 'start';
    }

    if (triggerRect.left - overlayWidth < 0) {
      originX = 'start';
      overlayX = 'end';
    }

    return {
      originX,
      originY,
      overlayX,
      overlayY,
    };
  }
}
