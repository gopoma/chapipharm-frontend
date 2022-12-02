import { Component, OnInit } from '@angular/core';

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



  registrar() {
    const formData = new FormData();
    formData.append("firstName", this.firstName);
    formData.append("lastName", this.lastName);
    formData.append("displayName", this.displayName);
    formData.append("email", this.email);
    formData.append("password", this.password);
    formData.append("location", JSON.stringify(this.location));
    formData.append("profilePicture", this.file);
    console.log(formData.get("profilePicture"));
    console.log(this.location);

    //hacer el llamado al aservidor pero solo capturar en formData la imagen, lo demás no!
    /*
    this.servicio.post<>(url)
      .subscribe(resp => {
        if(resp.success){
          this.servicio.post<>(url).subscribe{
            
          }
        }
      }) 
    */
  }
  

}
