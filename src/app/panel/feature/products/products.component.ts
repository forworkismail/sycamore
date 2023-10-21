import { Component, inject } from '@angular/core';
import { ScrollableAreaComponent } from 'app/common/components/base/scrollable-area/scrollable-area.component';
import { ButtonComponent } from 'app/common/components/button/button.component';
import { PlusIconComponent } from 'app/common/icons/plus-icon.component';
import { TabBarItem } from 'app/common/components/tab-bar/tab-bar.config';
import { ColorsIconComponent } from 'app/common/icons/colors-icon.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { VerticalTabBarComponent } from 'app/common/components/tab-bar/vertical-tab-bar.component';
import { TrashIconComponent } from 'app/common/icons/trash-icon.component';
import { DraftIconComponent } from 'app/common/icons/draft-icon.component';
import { EllipsisIconComponent } from 'app/common/icons/ellipsis-icon.component';
import { ListComponent } from 'app/common/components/list/list.component';
import { Observable } from 'rxjs';
import { Product, createInitialProductTableState } from './data-access/store/product.state';
import { Pagination, Select, Sort, TableColumn } from 'app/common/store/table/table.state';
import { TableFacade } from 'app/common/store/table/table.facade';
import { PaginationComponent } from '../../../common/components/pagination/pagination.component';
import { RefreshIconComponent } from '../../../common/icons/refresh-icon.component';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  imports: [
    NgFor,
    NgIf,
    ScrollableAreaComponent,
    ButtonComponent,
    PlusIconComponent,
    VerticalTabBarComponent,
    TrashIconComponent,
    EllipsisIconComponent,
    ListComponent,
    AsyncPipe,
    PaginationComponent,
    RefreshIconComponent,
  ],
})
export default class ProductsComponent {
  public readonly tableFacade = inject(TableFacade<Product>);
  products$: Observable<Product[]> = this.tableFacade.allItems$;
  columns$: Observable<TableColumn<Product>[]> = this.tableFacade.columns$;
  sortColumn$: Observable<Sort<Product>> = this.tableFacade.sort$;
  selection$: Observable<Select> = this.tableFacade.selection$;
  pagination$: Observable<Pagination> = this.tableFacade.pagination$;

  constructor() {
    this.tableFacade.setInitialState(createInitialProductTableState());
  }

  ngOnInit() {
    this.tableFacade.loadItems();
  }

  changePage(page: number) {
    this.tableFacade.changePage(page);
  }

  toggleSelectAll(event: Event) {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;
    this.tableFacade.toggleSelectAll(isChecked);
  }

  tabBarItems: TabBarItem[] = [
    {
      label: 'Primary',
      icon: ColorsIconComponent,
      link: '/panel/tables',
    },
    {
      label: 'Trash',
      icon: TrashIconComponent,
      link: '/panel/tables/active',
    },
    {
      label: 'Draft',
      icon: DraftIconComponent,
      link: '/panel/tables/inactive',
    },
  ];
}
