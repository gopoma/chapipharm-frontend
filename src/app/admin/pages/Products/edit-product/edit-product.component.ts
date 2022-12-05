import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Product } from 'src/app/models/product.interface';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

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

}
