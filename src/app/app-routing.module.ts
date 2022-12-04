import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ValidateAuthGuard } from './guards/validate-auth.guard';
import { HomeComponent } from './pharmacy/pages/home/home.component';
import { NosotrosComponent } from './pharmacy/pages/nosotros/nosotros.component';
import { ProductosComponent } from './pharmacy/pages/productos/productos.component';

const routes: Routes = [
  {
    path: '' , component: HomeComponent, pathMatch: 'full' 
  },
  {
    path: 'productos', component: ProductosComponent
  },
  {
    path: 'nosotros', component: NosotrosComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [ AuthGuard ],
    canLoad: [ AuthGuard ],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),   
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
