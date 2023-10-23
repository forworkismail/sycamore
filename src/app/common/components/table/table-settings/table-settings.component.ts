import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { TableFacade } from '../store/table.facade';
import { CheckMarkIconComponent } from '../../../icons/checkmark-icon.component';
import { DropdownWindowComponent } from '../../dropdown-window/dropdown-window.component';
import { ButtonComponent } from '../../button/button.component';
import { EllipsisIconComponent } from '../../../icons/ellipsis-icon.component';
import { PageSize, TableColumn } from '../store/table.state';

@Component({
  selector: 'app-table-settings',
  standalone: true,
  templateUrl: './table-settings.component.html',
  imports: [
    NgFor,
    NgIf,
    NgClass,
    CheckMarkIconComponent,
    DropdownWindowComponent,
    ButtonComponent,
    EllipsisIconComponent,
  ],
})
export class TableSettingsComponent<T> {
  @Input() pageSize: PageSize = 20;
  @Input() columns: TableColumn<T>[] = [];
  @Input() excludedColumns: (keyof T)[] = [];
  @Output() pageSizeChange = new EventEmitter<PageSize>();
  @Output() toggleColumnVisibility = new EventEmitter<TableColumn<T>>();

  pageSizeOptions: PageSize[] = [10, 20, 50];

  constructor() {}

  changePageSize(pageSize: PageSize) {
    this.pageSizeChange.emit(pageSize);
  }

  changeColumnVisibility(column: TableColumn<T>) {
    this.toggleColumnVisibility.emit(column);
  }

  isColumnExcluded(column: TableColumn<T>): boolean {
    return column.dependsOn.some(dependency => this.excludedColumns.includes(dependency));
  }
}
