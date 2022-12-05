import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowProductsComponent } from './pages/Products/show-products/show-products.component';
import { ShowUsersComponent } from './pages/Users/show-users/show-users.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { TableComponent } from './components/table/table.component';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { CardUserComponent } from './components/card-user/card-user.component';
import { AddProductComponent } from './pages/Products/add-product/add-product.component';
import { AddUserComponent } from './pages/Users/add-user/add-user.component';
import { EditProductComponent } from './pages/Products/edit-product/edit-product.component';
import { ViewProductComponent } from './pages/Products/view-product/view-product.component';
import { ViewUserComponent } from './pages/Users/view-user/view-user.component';
import { EditUserComponent } from './pages/Users/edit-user/edit-user.component';
import { DeleteProductComponent } from './pages/Products/delete-product/delete-product.component';
import { DeleteUserComponent } from './pages/Users/delete-user/delete-user.component';
import { ButtonBackComponent } from './components/button-back/button-back.component';
import { CardModUserComponent } from './components/card-mod-user/card-mod-user.component';
import { CardModProductComponent } from './components/card-mod-product/card-mod-product.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ShowProductsComponent,
    ShowUsersComponent,
    TableComponent,
    TableUsersComponent,
    CardProductComponent,
    CardUserComponent,
    AddProductComponent,
    AddUserComponent,
    EditProductComponent,
    ViewProductComponent,
    ViewUserComponent,
    EditUserComponent,
    DeleteProductComponent,
    DeleteUserComponent,
    ButtonBackComponent,
    CardModUserComponent,
    CardModProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,
    FormsModule
  ],
  exports: [
    AdminRoutingModule
  ]
})
export class AdminModule { }
