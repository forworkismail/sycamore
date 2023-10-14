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
import { Observable } from 'rxjs';
import { TableFacade } from './data-access/store/table.facade';
import { Product } from './data-access/store/table.state';

@Component({
  selector: 'app-tables',
  standalone: true,
  templateUrl: './tables.component.html',
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
export default class TablesComponent {
  private readonly tableFacade = inject(TableFacade);
  products$: Observable<Product[]> = this.tableFacade.allProducts$;

  ngOnInit() {
    this.tableFacade.loadProducts();
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
