import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayService } from './overlay.service';
import { DocumentClickDirective } from 'app/common/directives/document-click.directive';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class OverlayComponent {}
