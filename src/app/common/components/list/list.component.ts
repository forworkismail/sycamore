import { Component } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { ScrollableAreaComponent } from '../base/scrollable-area/scrollable-area.component';
import { ButtonComponent } from '../button/button.component';
import { TrashIconComponent } from 'app/common/icons/trash-icon.component';
import { EllipsisIconComponent } from 'app/common/icons/ellipsis-icon.component';
import { Directionality } from '@angular/cdk/bidi';
import { EyeIconComponent } from '../../icons/eye-icon.component';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  imports: [
    NgFor,
    NgClass,
    NgIf,
    ScrollableAreaComponent,
    ButtonComponent,
    TrashIconComponent,
    EllipsisIconComponent,
    EyeIconComponent,
    NgIf,
  ],
})
export class ListComponent {
  constructor(public dir: Directionality) {}
  items = [];
  headers: any = [];

  // after 2 seconds fetch headers
  ngOnInit(): void {
    setTimeout(() => {
      this.items = Array.from({ length: 20 });
      this.fetchHeaders();
    }, 2000);
  }

  fetchHeaders() {
    this.headers = [
      {
        label: 'id',
        mapping: 'id',
        show: false,
        dependsOn: ['id'],
      },
      {
        label: 'Name',
        mapping: 'customerName',
        show: true,
        class: 'min-w-[250px] max-w-[250px]',
        dependsOn: ['firstName', 'lastName'],
      },
      {
        label: 'Company',
        mapping: 'company',
        show: true,
        class: 'min-w-[150px] max-w-[150px]',
        dependsOn: ['company'],
      },
      {
        label: 'Email',
        mapping: 'email',
        show: true,
        class: 'min-w-[150px] max-w-[150px]',
        dependsOn: ['email'],
      },
      {
        label: 'Payment',
        mapping: 'paymentMethod',
        show: true,
        class: 'min-w-[150px] max-w-[150px] flex flex-row items-center',
        dependsOn: ['cardType', 'cardNumber'],
      },
      {
        label: 'Created Date',
        mapping: 'createdDate',
        show: true,
        class: 'min-w-[150px] max-w-[150px] truncate',
        dependsOn: ['createdDate'],
      },
      {
        label: 'Mobile',
        mapping: 'mobile',
        show: false,
        dependsOn: ['mobile'],
      },
      {
        label: 'Address',
        mapping: 'address',
        show: false,
        dependsOn: ['address'],
      },
      {
        label: 'Home',
        mapping: 'home',
        show: false,
        dependsOn: ['home'],
      },
      {
        label: 'Business',
        mapping: 'business',
        show: false,
        dependsOn: ['business'],
      },
      {
        label: 'Fax',
        mapping: 'fax',
        show: false,
        class: 'm-w-[140px]',
        dependsOn: ['fax'],
      },
      {
        label: 'Notes',
        mapping: 'notes',
        show: false,
        class: 'm-w-[140px]',
        dependsOn: ['notes'],
      },
    ];
  }
  abc() {
    event?.stopPropagation();
    console.log('ABC');
  }
}
