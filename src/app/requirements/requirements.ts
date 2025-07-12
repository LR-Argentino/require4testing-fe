import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-requirements',
  imports: [
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './requirements.html',
  styleUrl: './requirements.css'
})
export class Requirements {

}
