import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgFor, NgIf, NgStyle, TitleCasePipe } from '@angular/common';
import { ScrollableAreaComponent } from '../base/scrollable-area/scrollable-area.component';
import { ButtonComponent } from '../button/button.component';
import { TrashIconComponent } from 'app/common/icons/trash-icon.component';
import { EllipsisIconComponent } from 'app/common/icons/ellipsis-icon.component';
import { Directionality } from '@angular/cdk/bidi';
import { EyeIconComponent } from '../../icons/eye-icon.component';
import { Sort, TableColumn } from 'app/common/store/table/table.state';
import { DownArrowIconComponent } from 'app/common/icons/downarrow-icon.component';
import { UpArrowIconComponent } from '../../icons/uparrow-icon.component';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  imports: [
    NgFor,
    NgStyle,
    NgClass,
    TitleCasePipe,
    ScrollableAreaComponent,
    ButtonComponent,
    TrashIconComponent,
    EllipsisIconComponent,
    EyeIconComponent,
    NgIf,
    DownArrowIconComponent,
    UpArrowIconComponent,
  ],
})
export class ListComponent<T extends { id: number }> {
  @Input() columns: TableColumn<T>[] = [];
  @Input() rows: T[] = [];
  @Input() selectedItems: number[] = [];

  @Input() sortColumn: Sort<T> | null = {
    column: {} as keyof T,
    direction: 'asc',
  };

  @Output() sortColumnChange = new EventEmitter<Sort<T>>();
  @Output() itemSelected = new EventEmitter<number>();
  @Output() allSelected = new EventEmitter<boolean>();

  selectAll: boolean = false;

  constructor(public dir: Directionality) {}

  getColumnWidthClass(column: TableColumn<T>, totalColumns: number): string {
    const fraction = column.width ? column.width : 1 / totalColumns;
    const percentage = fraction * 100;
    return `${percentage}%`;
  }

  changeSort(column: TableColumn<T>) {
    if (this.sortColumn?.column === column.sortColumnBy) {
      this.sortColumnChange.emit({
        column: column.sortColumnBy,
        direction: this.sortColumn.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      this.sortColumnChange.emit({
        column: column.sortColumnBy,
        direction: 'asc',
      });
    }
  }

  onSelectAll(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.allSelected.emit(isChecked);
  }

  onSelectItem(id: number) {
    this.itemSelected.emit(id);
  }
}
