import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BUTTON_TYPES, ButtonType } from './button.config';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  standalone: true,
  imports: [NgClass],
})
export class ButtonComponent {
  @Input() type: ButtonType = 'primary';
  @Output() click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }

  getButtonClass(): string {
    return BUTTON_TYPES[this.type].class;
  }
}
