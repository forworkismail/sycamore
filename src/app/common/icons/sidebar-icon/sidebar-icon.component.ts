import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-icon.component.html',
})
export class SidebarIconComponent {
  @Input() height = '24';
  @Input() width = '24';
}
