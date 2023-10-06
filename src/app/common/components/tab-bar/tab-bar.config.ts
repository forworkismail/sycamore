import { Type } from '@angular/core';

export interface TabBarItem {
  name: string;
  icon: Type<any>;
  route: string;
}
