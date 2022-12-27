import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

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

  files: File[] = [];

  location: Location = {
    country: "",
    state: "",
    city: "",
    district: ""
  }



  registrar(){
    let inputFiles:any = document.getElementById('inputGroupFile04');
    for(let i=0; i<inputFiles.files.length; i++){
      this.files[i] = inputFiles.files[i];
    }
    this.authService.uploadImages(this.files).subscribe({
      next: (resp:any) => {
        console.log(resp);
        this.authService.register(this.firstName,this.lastName,this.email,this.password).subscribe({
          next: (resp:any) => {
            console.log(resp);
            Swal.fire(resp.messages[0]);
          },
          error: (err:any) => {
            console.log(err.error.messages);
          }
        })
      },
      error: (err:any) => {
        console.log(err.error.messages);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.messages,
        });
      }
    });
    /* this.authService.register(this.firstName,this.lastName,this.email,this.password)
      .subscribe(resp => {
        console.log(resp);
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.password = "";
        Swal.fire(resp.messages[0]);
        this.router.navigate(['/login']);
      },error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.messages,
        });
      }); */
  }
  

}
