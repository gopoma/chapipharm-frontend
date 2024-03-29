import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  hide = true;

  constructor(private authService: AuthService,
              private router: Router) { }

  username : string = "";
  password : string = "";

  login() {
    this.authService.login(this.username, this.password);
  }
}
