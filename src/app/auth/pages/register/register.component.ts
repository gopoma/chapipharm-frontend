import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface Location {
  country: string,
  state: string,
  city: string,
  district: string
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})



export class RegisterComponent  {

  constructor(private authService: AuthService, private router:Router){}

  firstName : string = "";
  lastName : string = "";
  displayName: string = "";
  email: string = "";
  password: string = "";

  file: File = undefined!;

  location: Location = {
    country: "",
    state: "",
    city: "",
    district: ""
  }



  registrar(){
    this.authService.register(this.firstName,this.lastName,this.email,this.password)
      .subscribe(resp => {
        console.log(resp);
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.password = "";
        this.router.navigate(['/login']);
      },error => {
        console.log(error);
      });
  }
  

}
