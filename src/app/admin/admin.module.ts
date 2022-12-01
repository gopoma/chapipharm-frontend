import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowProductsComponent } from './pages/show-products/show-products.component';
import { ShowUsersComponent } from './pages/show-users/show-users.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { TableComponent } from './components/table/table.component';



@NgModule({
  declarations: [
    ShowProductsComponent,
    ShowUsersComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule
  ],
  exports: [
    AdminRoutingModule
  ]
})
export class AdminModule { }
