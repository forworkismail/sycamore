import { Type } from '@angular/core';

export interface SidebarMenuItem {
  name: string;
  icon: Type<any>;
  route: string;
}
