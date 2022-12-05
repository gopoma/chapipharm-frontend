import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthService } from '../../../../auth/services/auth.service';
import { Product } from '../../../../models/product.interface';


@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  id: string = '';

  constructor(private activatedRoute: ActivatedRoute, private productService: AuthService) { 
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id'];
    })
  }
  
  products: Product[] = null!;
  product: Product = null!

  ngOnInit(): void {
    this.products = this.productService.myProducts;
    for(let i=0; i<this.products.length; i++){
      if(this.products[i]._id == this.id){
        this.product = this.products[i];
        break;
      }
    }
    console.log(this.product);
  }

  deleteProduct() {
    this.productService.deleteProduct(this.id);
  }

}
