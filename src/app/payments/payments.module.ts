import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopCarComponent } from './pages/shop-car/shop-car.component';
import { PayComponent } from './pages/pay/pay.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ShopCarComponent,
    PayComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    ShopCarComponent
  ]
})
export class PaymentsModule { }
