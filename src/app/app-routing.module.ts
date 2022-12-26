import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ValidateAuthGuard } from './guards/validate-auth.guard';
import { HomeComponent } from './pharmacy/pages/home/home.component';
import { ProductComponent } from './pharmacy/pages/product/product.component';
import { ProductosComponent } from './pharmacy/pages/productos/productos.component';
import { ShopCarComponent } from './payments/pages/shop-car/shop-car.component';
import { CarlistGuard } from './guards/carlist.guard';

const routes: Routes = [
  {
    path: '' , component: HomeComponent, pathMatch: 'full'
  },
  {
    path: "products/:id", component: ProductComponent
  },
  {
    path: 'productos', component: ProductosComponent
  },
  {
    path: 'myCar', component: ShopCarComponent,
    canActivate: [ CarlistGuard ],
    canLoad: [ CarlistGuard ]
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
