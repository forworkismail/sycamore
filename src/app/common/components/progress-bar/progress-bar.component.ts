import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [@loadingState]="loading ? 'loading' : 'loaded'" class="h-[2px] w-full"></div>
  `,
  styles: [
    `
      :host {
        overflow: hidden;
      }
    `,
  ],
  animations: [
    trigger('loadingState', [
      state(
        'loading',
        style({
          width: '90%',
          backgroundColor: 'red',
        }),
      ),
      state(
        'loaded',
        style({
          width: '100%',
          backgroundColor: 'transparent',
        }),
      ),
      transition('* => loading', [
        style({ width: '0%', backgroundColor: 'red' }),
        animate(
          '5s ease-in-out',
          keyframes([
            style({ width: '20%', offset: 0.1 }),
            style({ width: '30%', offset: 0.2 }),
            style({ width: '50%', offset: 0.4 }),
            style({ width: '60%', offset: 0.6 }),
            style({ width: '75%', offset: 0.7 }),
            style({ width: '85%', offset: 0.9 }),
            style({ width: '90%', offset: 1.0 }),
          ]),
        ),
      ]),
      transition('loading => loaded', animate('0.2s ease-in-out')),
    ]),
  ],
})
export class ProgressBarComponent {
  @Input() loading = false;
}
