import { Directive, ElementRef, EventEmitter, Output, OnDestroy, Input, HostListener } from '@angular/core';
import { Subscription, fromEvent, filter } from 'rxjs';

@Directive({
  selector: '[appDocumentClick]',
  standalone: true,
})
export class DocumentClickDirective {
  @Input() excludeInsideElement = false;
  @Output() documentClick = new EventEmitter();

  private subscription: Subscription;

  constructor(private elementRef: ElementRef) {
    this.subscription = fromEvent<MouseEvent>(document, 'click').subscribe((event: MouseEvent) => {
      if (!this.excludeInsideElement || !this.isInsideElement(event.target)) {
        this.documentClick.emit();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      console.log('unsubscribe');
      this.subscription.unsubscribe();
    }
  }

  private isInsideElement(target: EventTarget | null): boolean {
    if (target instanceof Node) {
      return this.elementRef.nativeElement.contains(target);
    }
    return false;
  }
}
