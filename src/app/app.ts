import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from './header/header';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header
  ],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor() {
  }

}
