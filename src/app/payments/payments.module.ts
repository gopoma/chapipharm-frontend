import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopCarComponent } from './pages/shop-car/shop-car.component';



@NgModule({
  declarations: [
    ShopCarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShopCarComponent
  ]
})
export class PaymentsModule { }
