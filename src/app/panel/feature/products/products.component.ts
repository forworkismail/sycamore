import { Component, inject } from '@angular/core';
import { ScrollableAreaComponent } from 'app/common/components/base/scrollable-area/scrollable-area.component';
import { ButtonComponent } from 'app/common/components/button/button.component';
import { PlusIconComponent } from 'app/common/icons/plus-icon.component';
import { TabBarItem } from 'app/common/components/tab-bar/tab-bar.config';
import { ColorsIconComponent } from 'app/common/icons/colors-icon.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { VerticalTabBarComponent } from 'app/common/components/tab-bar/vertical-tab-bar.component';
import { TrashIconComponent } from 'app/common/icons/trash-icon.component';
import { DraftIconComponent } from 'app/common/icons/draft-icon.component';
import { EllipsisIconComponent } from 'app/common/icons/ellipsis-icon.component';
import { ListComponent } from 'app/common/components/list/list.component';
import { ProductsFacade } from './data-access/store/product.facade';
import { Observable, Subject } from 'rxjs';
import { Product } from './data-access/store/product.state';
import { Sort, TableColumn } from 'app/common/store/table/table.state';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  imports: [
    NgFor,
    ScrollableAreaComponent,
    ButtonComponent,
    PlusIconComponent,
    VerticalTabBarComponent,
    TrashIconComponent,
    EllipsisIconComponent,
    ListComponent,
    AsyncPipe,
  ],
})
export default class ProductsComponent {
  private readonly productsFacade = inject(ProductsFacade);
  products$: Observable<Product[]> = this.productsFacade.allProducts$;
  columns$: Observable<TableColumn<Product>[]> = this.productsFacade.columns$;
  sortColumn$: Observable<Sort<Product>> = this.productsFacade.sort$;

  ngOnInit() {
    this.productsFacade.loadProducts();
  }

  changePage(page: number) {
    this.productsFacade.changePage(page);
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

  changeSort(sort: Sort<Product>) {
    this.productsFacade.changeSort(sort);
  }
}
