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
    this.authService.validateSession().subscribe();
  }

  validate() {
    return this.authService.isValid();
  }

  hasMinimumRole(minimumRole:string) {
    return this.authService.hasMinimumRole(minimumRole);
  }

  logout(){
    this.authService.logout();
  }

}
