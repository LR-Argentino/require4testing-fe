import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Signin} from './signin/signin';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Signin],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'requirefortesting-fe';
}
