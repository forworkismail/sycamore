import { Component, Input } from '@angular/core';
import { NgClass, NgFor, NgIf, NgStyle, TitleCasePipe } from '@angular/common';
import { ScrollableAreaComponent } from '../base/scrollable-area/scrollable-area.component';
import { ButtonComponent } from '../button/button.component';
import { TrashIconComponent } from 'app/common/icons/trash-icon.component';
import { EllipsisIconComponent } from 'app/common/icons/ellipsis-icon.component';
import { Directionality } from '@angular/cdk/bidi';
import { EyeIconComponent } from '../../icons/eye-icon.component';
import { TableColumn } from 'app/common/store/table/table.state';
import { Product } from 'app/panel/feature/products/data-access/store/product.state';

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
  ],
})
export class ListComponent<T> {
  @Input() columns: TableColumn<T>[] = [];
  @Input() rows: T[] = [];

  constructor(public dir: Directionality) {}

  getColumnWidthClass(column: TableColumn<T>, totalColumns: number): string {
    const fraction = column.width ? column.width : 1 / totalColumns;
    const percentage = fraction * 100;
    return `${percentage}%`;
  }
}
