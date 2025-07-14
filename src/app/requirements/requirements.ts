import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-requirements',
  imports: [
    ReactiveFormsModule,
    RouterOutlet
  ],
  templateUrl: './requirements.html',
  styleUrl: './requirements.css'
})
export class Requirements {

}
