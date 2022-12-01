import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowProductsComponent } from './pages/show-products/show-products.component';
import { ShowUsersComponent } from './pages/show-users/show-users.component';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [
    ShowProductsComponent,
    ShowUsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports: [
    AdminRoutingModule
  ]
})
export class AdminModule { }
