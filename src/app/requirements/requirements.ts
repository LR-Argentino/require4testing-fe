import {Component} from '@angular/core';
import {NewRequirement} from './new-requirement/new-requirement';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-requirements',
  imports: [
    NewRequirement,
    ReactiveFormsModule
  ],
  templateUrl: './requirements.html',
  styleUrl: './requirements.css'
})
export class Requirements {

}
