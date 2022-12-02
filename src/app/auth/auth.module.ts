import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    AngularMaterialModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    AuthRoutingModule
  ]
})
export class AuthModule { }
