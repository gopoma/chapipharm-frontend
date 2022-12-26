import { Component, OnInit } from '@angular/core';
import { CarListService } from '../../services/car-list.service';

@Component({
  selector: 'app-shop-car',
  templateUrl: './shop-car.component.html',
  styleUrls: ['./shop-car.component.css']
})
export class ShopCarComponent implements OnInit {

  constructor(private carListService: CarListService) { }

  examples:number[] = [1,2,3,4,5,6];
  items:any[] = [];
  priceTotal:number = 0;

  ngOnInit(): void {
    this.carListService.getItems()
      .subscribe({
        next: (resp) => {
          console.log(resp.items);
          this.items = resp.items;
          for(let i=0; i<resp.items.length; i++) {
            this.priceTotal += resp.items[i].price * resp.items[i].amount;
          }
          console.log(this.priceTotal);
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  deleteItem(id:string) {
    this.carListService.removeItem(id)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.items = this.items.filter( (item) => item._id!==id );
          this.priceTotal = 0;
          for(let i=0; i<this.items.length; i++) {
            this.priceTotal += this.items[i].price * this.items[i].amount;
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  

}
