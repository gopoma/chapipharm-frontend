import { ProductService } from './../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CarListService } from '../../../payments/services/car-list.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id: string = null!;
  product: any;

  cantidad:number = 1;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private productService: ProductService, 
    private router: Router,
    private carlistService: CarListService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params["id"];
      this.productService.get(this.id).subscribe({
        next: ({success, product}:any) => {
          this.product = product;
        },
        error: () => {
          this.router.navigateByUrl("/productos");
        }
      });
    });
  }
  addCar(id:string) {
    this.carlistService.addItem(id, this.cantidad)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.router.navigateByUrl('/productos');
        },
        error: (err) => {
          console.log(err);
          if(err.error.messages[0] === 'Cantidad excede al tamaño del Stock') {
            alert("límite de stock excedido");
            this.router.navigateByUrl('/productos');
          }else {
            this.router.navigateByUrl('/auth/login');
          }
        }
      });
  }

  deleteProduct() {
    if(this.cantidad !== 1) {
      this.cantidad--;
    }
  }
  addProduct() {
    if(this.cantidad !== this.product.stock){
      this.cantidad++;
    }
  }

}
