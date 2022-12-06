import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Product } from '../../../models/product.interface';
import { Category } from '../../../models/category.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) { 
    
  }

  @Input() expProduct: Product = null!;
  categories: Category[] = null!
  imagenes: string[] = [];
  product:any;
  id:string = "";

  ngOnInit(){
    /* let aux:string[] = this.expProduct.categories;
    let aux2:string = JSON.stringify(aux);
    this.categories = JSON.parse(aux2);
    this.imagenes = this.expProduct.images!;
    console.log(this.imagenes); */
    this.activatedRoute.params.subscribe( param => {
      this.id = param['id'];
      this.productService.get(this.id).subscribe({
        next: (resp:any) => {
          this.product = resp.product;
        },
        error: (err) => {
          console.log(err);
        }
      });
    });
  }

  

}
