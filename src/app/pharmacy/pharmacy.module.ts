import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';



@NgModule({
  declarations: [
    HomeComponent,
    ProductosComponent,
    NosotrosComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent,
    ProductosComponent,
    NosotrosComponent
  ]
})
export class PharmacyModule { }
