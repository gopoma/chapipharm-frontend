import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { 
  }

  ngOnInit(): void {
    console.log("This is a new message");
  }

  validate() {
    return this.authService.isValid();
  }

  showPaneles() {
    return this.authService.getRole();
  }

  role() {
    return this.authService.getRole();
  }

  logout(){
    this.authService.logout();
  }

}
