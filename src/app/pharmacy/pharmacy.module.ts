import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './../angular-material/angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ProductComponent } from './pages/product/product.component';



@NgModule({
  declarations: [
    HomeComponent,
    ProductosComponent,
    NosotrosComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ],
  exports: [
    HomeComponent,
    ProductosComponent,
    NosotrosComponent
  ]
})
export class PharmacyModule { }
