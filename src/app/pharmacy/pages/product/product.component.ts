import { ProductService } from './../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id: string = null!;
  product: any;

  cantidad:number = 1;
  showCantOfProduct: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router) {}

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

  addProduct() {
    if(this.cantidad < this.product.stock) {
      this.cantidad++;
    }
  }

  deleteProduct() {
    if(this.cantidad > 1){
      this.cantidad--;
    }
  }

}
