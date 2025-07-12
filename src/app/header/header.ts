import {Component} from '@angular/core';
import {NavigationItem} from '../../shared/models/navigation-item';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  protected navigationItems: NavigationItem[] = [
    {name: 'Dashboard', active: true, route: null},
    {name: 'Requirements', active: false, route: '/requirements'},
    {name: 'Test Cases', active: false, route: null},
    {name: 'Test Runs', active: false, route: null},
    {name: 'Reports', active: false, route: null},
  ];
}
