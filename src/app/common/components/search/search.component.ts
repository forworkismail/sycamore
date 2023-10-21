import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { SearchIconComponent } from '../../icons/search-icon.component';
import { OverlayService } from '../base/overlay/overlay.service';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  imports: [CommonModule, ButtonComponent, SearchIconComponent],
})
export class SearchComponent {
  @ViewChild('overlayTrigger', { static: true }) overlayTrigger: ElementRef = {} as ElementRef;
  private overlayService = inject(OverlayService);

  // showOverlay(): void {
  //   this.overlayService.showOverlayForComponent(this.overlayTrigger, SearchCustomersComponent);
  // }
}
