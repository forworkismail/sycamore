import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { ChevronIconComponent } from 'app/common/icons/chevron-icon.component';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  imports: [NgIf, NgStyle, ButtonComponent, ChevronIconComponent],
})
export class PaginationComponent {
  @Input() pagination = {
    currentPage: 0,
    totalPages: 0,
  };
  @Output() pageChange = new EventEmitter<number>();

  decrementPage() {
    event?.stopPropagation();
    if (this.pagination.currentPage > 1) {
      this.pageChange.emit(this.pagination.currentPage - 1);
    }
  }

  incrementPage() {
    event?.stopPropagation();
    if (this.pagination.currentPage < this.pagination.totalPages) {
      this.pageChange.emit(this.pagination.currentPage + 1);
    }
  }
}
