import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgFor, NgIf, NgStyle, TitleCasePipe } from '@angular/common';
import { ScrollableAreaComponent } from '../../base/scrollable-area/scrollable-area.component';
import { ButtonComponent } from '../../button/button.component';
import { TrashIconComponent } from 'app/common/icons/trash-icon.component';
import { EllipsisIconComponent } from 'app/common/icons/ellipsis-icon.component';
import { Directionality } from '@angular/cdk/bidi';
import { EyeIconComponent } from '../../../icons/eye-icon.component';
import { Select, Sort, TableColumn } from 'app/common/components/table/store/table.state';
import { DownArrowIconComponent } from 'app/common/icons/downarrow-icon.component';
import { UpArrowIconComponent } from '../../../icons/uparrow-icon.component';
import { PaginationComponent } from '../../pagination/pagination.component';

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
    PaginationComponent,
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

  constructor(public dir: Directionality) {}

  getColumnWidthClass(column: TableColumn<T>, allColumns: TableColumn<T>[]): TableColumn<T>[] {
    // Filter out only the visible columns
    const visibleColumns = allColumns.filter(col => col.visible);

    // Calculate the total weight of the visible columns
    const totalWeight = visibleColumns.reduce((acc, col) => acc + (col.width || 1), 0);

    // Calculate and update the width for each visible column based on its relative weight
    return allColumns.map(col => {
      if (col.visible) {
        const relativeWeight = (col.width || 1) / totalWeight;
        const percentage = relativeWeight * 100;
        return { ...col, width: percentage };
      }
      return col;
    });
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

  onSelectItem(id: number) {
    this.itemSelected.emit(id);
  }
}
