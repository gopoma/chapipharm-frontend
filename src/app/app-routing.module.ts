import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pharmacy/pages/home/home.component';
import { NosotrosComponent } from './pharmacy/pages/nosotros/nosotros.component';
import { ProductosComponent } from './pharmacy/pages/productos/productos.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';

const routes: Routes = [
  {
    path: 'home' , component: HomeComponent, pathMatch: 'full' 
  },
  {
    path: 'productos', component: ProductosComponent
  },
  {
    path: 'nosotros', component: NosotrosComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: '**', redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
