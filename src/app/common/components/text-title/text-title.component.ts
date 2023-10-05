import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { TEXT_TITLE_STYLES, TextTitleType } from './text-title.options';

@Component({
  selector: 'app-text-title',
  standalone: true,
  imports: [NgClass],
  templateUrl: './text-title.component.html',
})
export class TextTitleComponent {
  @Input() type: TextTitleType = 'title';
  @Output() click = new EventEmitter<void>();

  getClass(): string {
    return TEXT_TITLE_STYLES[this.type].class;
  }
}
