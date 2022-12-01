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
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
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
