import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BUTTON_TYPES, ButtonType } from './button.config';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  template: `
              <button [ngClass]="getButtonClass()" (click)="onClick()">
                <span class="flex space-x-1 rtl:space-x-reverse items-center justify-items-start">
                  <ng-content></ng-content>
                </span>
              </button>
  `,
  standalone: true,
  imports: [NgClass],
})
export class ButtonComponent {
  @Input() type: ButtonType = 'primary';
  @Input() customClasses = '';
  @Output() click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }

  getButtonClass(): string {
    return BUTTON_TYPES[this.type].class + ' ' + this.customClasses;
  }
}
