import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShowProductsComponent } from './pages/show-products/show-products.component';
import { ShowUsersComponent } from './pages/show-users/show-users.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'adminProducts', component: ShowProductsComponent
      },
      {
        path: 'adminUsers', component: ShowUsersComponent
      },
      {
        path: '**', redirectTo: 'adminProducts'
      }
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
