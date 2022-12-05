import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { tap, map } from 'rxjs/operators';
import { Category } from '../../../models/category.interface';
import { Product } from '../../../models/product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-mod-product',
  templateUrl: './card-mod-product.component.html',
  styleUrls: ['./card-mod-product.component.css']
})
export class CardModProductComponent implements OnInit, DoCheck {

  constructor( private productService: AuthService, 
               private router: Router) {  }

  misCategories: Category[] = [];
  idDelete:string = "";
  idCreate: string = "";

  sendImage: string = "";
  sendCategoria: string = "";

  name:string = "";
  laboratory: string = "";
  stock: number = 0;
  price: number = 0;
  description: string = "";
  sendCategorias: string[] = [];
  sendImagenes: string[] = [];


  


  ngOnInit(): void {
    this.productService.getCategories();
  }

  ngDoCheck(){
    this.misCategories = this.productService.categories;
  }

  createProduct(){
    this.productService.createProduct(this.name,this.laboratory,this.stock,this.price,this.description,this.sendCategorias, this.sendImagenes);
  }

  eliminarCategory(){
    this.productService.eliminarCategory(this.idDelete);
  }

  addImagen(){
    this.sendImagenes.push(this.sendImage);
    this.sendImage = "";
  }
  addCategorie(){
    this.sendCategorias.push(this.sendCategoria);
    this.sendCategoria = "";
  }
}
