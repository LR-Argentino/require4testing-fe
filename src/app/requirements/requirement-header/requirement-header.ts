import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-requirement-header',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './requirement-header.html',
  styleUrl: './requirement-header.css'
})
export class RequirementHeader {

}
