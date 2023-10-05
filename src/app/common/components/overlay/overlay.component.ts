import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayService } from './overlay.service';
import { DocumentClickDirective } from 'app/common/directives/document-click/document-click.directive';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css'],
  standalone: true,
  imports: [CommonModule, DocumentClickDirective],
})
export class OverlayComponent {
  @Input({ required: true })
  height: number = 0;
  @Input({ required: true })
  width: number = 0;
  showOverlay = false;

  private overlayService = inject(OverlayService);

  ngOnInit() {
    this.overlayService.backdropClicked.subscribe(() => {
      this.showOverlay = false;
    });
  }

  toggleOverlay(event: MouseEvent) {
    if (!this.showOverlay) {
      const triggerElement = event.target as HTMLElement;
      this.overlayService.toggleOverlay(triggerElement);
      this.showOverlay = true;
    } else {
      this.overlayService.closeOverlay();
      this.showOverlay = false;
    }
  }
}
