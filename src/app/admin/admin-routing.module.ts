import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShowProductsComponent } from './pages/Products/show-products/show-products.component';
import { ShowUsersComponent } from './pages/Users/show-users/show-users.component';
import { ViewProductComponent } from './pages/Products/view-product/view-product.component';
import { EditProductComponent } from './pages/Products/edit-product/edit-product.component';
import { DeleteProductComponent } from './pages/Products/delete-product/delete-product.component';
import { EditUserComponent } from './pages/Users/edit-user/edit-user.component';
import { ViewUserComponent } from './pages/Users/view-user/view-user.component';
import { DeleteUserComponent } from './pages/Users/delete-user/delete-user.component';
import { AddProductComponent } from './pages/Products/add-product/add-product.component';
import { AddUserComponent } from './pages/Users/add-user/add-user.component';
import { AdminUsersGuard } from '../guards/admin-users.guard';
import { ValidateAuthGuard } from '../guards/validate-auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [ ValidateAuthGuard ],
    canLoad: [ ValidateAuthGuard ],
    children: [
      {
        path: 'products',
        children: [
          {
            path: '', component: ShowProductsComponent, pathMatch: 'full'
          },
          {
            path: 'addProduct', component: AddProductComponent
          },
          {
            path: 'productView/:id', component: ViewProductComponent
          },
          {
            path: 'productEdit/:id', component: EditProductComponent
          },
          {
            path: 'productDelete/:id', component: DeleteProductComponent
          },
          {
            path: '**' , redirectTo: ''
          },
        ]
      },

      //Rutas para los Usuarios
      {
        path: 'users',
        canLoad: [ AdminUsersGuard ],
        canActivate: [ AdminUsersGuard ],
        children: [
          {
            path: '', component: ShowUsersComponent, pathMatch: 'full'
          },
          {
            path: 'addUser', component: AddUserComponent
          },
          {
            path: 'userView/:id', component: ViewUserComponent
          },
          {
            path: 'userEdit/:id', component: EditUserComponent
          },
          {
            path: 'userDelete/:id', component: DeleteUserComponent
          },
          {
            path: '**', redirectTo: ''
          }
        ]
      },
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
