import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
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

  @Input() datos: Product = null!;


  boton: string = '';
  showEdit: boolean = true;
  showCategories: string[] = [];
  id:string = '';

  ngOnInit(): void {
    if(this.datos !== null){
      console.log(this.datos);
      this.id = this.datos._id!;
      this.name = this.datos.name;
      this.laboratory = this.datos.laboratory;
      this.stock = this.datos.stock;
      this.price = this.datos.price;
      this.description = this.datos.description;
      let aux:any = JSON.stringify(this.datos.categories);
      aux = JSON.parse(aux);
      for(let i =0; i<this.datos.categories.length; i++){
        this.sendCategorias[i] = aux[i]._id;
        this.showCategories[i] = aux[i].name;
      }
      for(let i=0; i<this.datos.images!.length; i++){
        this.sendImagenes[i] = this.datos.images![i]; 
      }
      this.boton = 'Edit';
      this.showEdit = false;
    }else{
      this.boton = 'Create';
    } 
    this.productService.getCategories();
  }

  ngDoCheck(){
    this.misCategories = this.productService.categories;
  }

  realizarPeticion(){
    if(this.boton === 'Create'){
      this.productService.createProduct(this.name,this.laboratory,this.stock,this.price,this.description,this.sendCategorias, this.sendImagenes);
    }else{
      this.productService.modProduct(this.id,this.name,this.laboratory,this.stock,this.price,this.description,this.sendCategorias, this.sendImagenes);
    }
  }

  eliminarCategory(){
    this.productService.eliminarCategory(this.idDelete);
  }

  addImagen(){
    if(this.sendImage !== ""){
      this.sendImagenes.push(this.sendImage);
      this.sendImage = "";
    }
  }
  
  addCategorie(){
    if(this.sendCategoria !== ""){
      this.sendCategorias.push(this.sendCategoria);
      console.log(this.misCategories);
      for(let i = 0; i< this.misCategories.length; i++){
        if(this.sendCategoria === this.misCategories[i]._id+''){
          this.showCategories.push(this.misCategories[i].name+'');
          break;
        }
      }
      this.sendCategoria = "";
    }
  }

  deleteCategorie(){
    this.sendCategorias.pop();
    this.showCategories.pop();
    this.sendCategoria = '';
  }
  deleteImagen(){
    this.sendImagenes.pop();
    this.sendImage ='';
  }


  category: string = '';
  categories: Category[] = this.productService.categories;

  createCategory() {
    this.productService.createCategory(this.category);
  }

}
