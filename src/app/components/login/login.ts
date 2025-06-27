import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username: string = "";
  password: string = "";

  constructor(private authService: AuthService) {

  }


  onSubmit() {
    console.log("Email:", this.username);
    console.log("Password", this.password);
    this.authService.login(this.username, this.password).then((res) => {
      console.log(res);
    })
  }
}
