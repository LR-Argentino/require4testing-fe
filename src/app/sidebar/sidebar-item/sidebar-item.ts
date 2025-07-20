import {Component, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass} from '@angular/common';

export interface NavigationItem {
  id: string;
  label: string;
  route: string;
  icon: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar-item',
  imports: [
    RouterLink,
    NgClass,
    RouterLinkActive
  ],
  templateUrl: './sidebar-item.html',
  styleUrl: './sidebar-item.css'
})
export class SidebarItem {
  @Input({required: true}) item!: NavigationItem;
  @Input() isActive: boolean = false;
}
