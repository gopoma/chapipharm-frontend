import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor() { }

  username : string = "";
  password : string = "";

  login() {
    console.log(this.username, " ", this.password);
    //Aqui deberia hacer el llamado al servidor para verificar el login
  }

}
