import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Product } from '../../../models/product.interface';
import { Category } from '../../../models/category.interface';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent implements OnInit{

  constructor() { 
    
  }

  @Input() expProduct: Product = null!;
  categories: Category[] = null!
  imagenes: string[] = [];

  ngOnInit(){
    let aux:string[] = this.expProduct.categories;
    let aux2:string = JSON.stringify(aux);
    this.categories = JSON.parse(aux2);
    this.imagenes = this.expProduct.images!;
    console.log(this.imagenes);
  }

  

}
