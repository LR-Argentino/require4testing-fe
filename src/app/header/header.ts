import {Component} from '@angular/core';
import {NavigationItem} from '../../shared/models/navigation-item';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  protected navigationItems: NavigationItem[] = [
    {name: 'Dashboard', active: true},
    {name: 'Requirements', active: false},
    {name: 'Test Cases', active: false},
    {name: 'Test Runs', active: false},
    {name: 'Reports', active: false}
  ];
}
