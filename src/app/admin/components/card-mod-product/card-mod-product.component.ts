import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Category } from '../../../models/category.interface';
import { Product } from '../../../models/product.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-mod-product',
  templateUrl: './card-mod-product.component.html',
  styleUrls: ['./card-mod-product.component.css']
})
export class CardModProductComponent implements OnInit, DoCheck {

  constructor( private authService: AuthService, 
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private productService: ProductService) {  }

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

  files: File[] = [];
  sendImagenes: string[] = [];


  boton: string = '';
  showEdit: boolean = true;
  showCategories: string[] = [];
  id:string = '';

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( param => {
      this.id = param['id'];
      this.productService.get(this.id).subscribe({
        next: (resp:any) => {
          console.log(resp);
          this.id= resp.product._id;
          this.name = resp.product.name;
          this.laboratory = resp.product.laboratory;
          this.stock = resp.product.stock;
          this.price = resp.product.price;
          this.description = resp.product.description;
          let aux:any = JSON.stringify(resp.product.categories);
          aux = JSON.parse(aux);
          for(let i =0; i<resp.product.categories.length; i++){
            this.sendCategorias[i] = aux[i]._id;
            this.showCategories[i] = aux[i].name;
          };
          this.boton = 'Edit';
          this.showEdit = false;  
        },
        error: (err) => {
          console.log(err);
          this.boton = 'Create';
        }
      });
    });
    /* if(this.datos !== null){
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
      this.boton = 'Edit';
      this.showEdit = false;
    }else{
      this.boton = 'Create';
    }  */
    this.authService.getCategories();
  }

  ngDoCheck(){
    this.misCategories = this.authService.categories;
  }


  muestraImagenes(): string{
    if(this.files.length === 0){
      let inputFiles:any = document.getElementById('formFileMultiple');
      for(let i=0; i<inputFiles.files.length; i++){
        this.files[i] = inputFiles.files[i];
      };
      inputFiles.value = '';
    }else{
      let inputFiles:any = document.getElementById('formFileMultiple');
      for(let i=0; i<inputFiles.files.length;i++){
        for(let j=0; j<this.files.length; j++){
          if(inputFiles.files[i].name === this.files[j].name){
            return '';
          };
        }
      }
      this.files = [...this.files, ...inputFiles.files];
      inputFiles.value = '';
    }
    return 'correct';
  }
  borrarImagen(ident:string){
    this.files = this.files.filter( (x) => {return x.name !== ident});
    let inputFiles:any = document.getElementById('formFileMultiple');
    console.log(inputFiles.value);
    console.log(this.files);
  }
  borrarAll(){
    this.files = [];
  }

  realizarPeticion(){
    if(this.boton === 'Create'){
      this.authService.uploadImages(this.files).subscribe({
        next: (resp:any) => {
          console.log(resp);
          let urls:string[] = [];
          for(let i=0; i<resp.images.length;i++){
            urls[i] = resp.images[i].resourceURL;
          }
          this.authService.createProduct(this.name,this.laboratory,this.stock,this.price,this.description,this.sendCategorias,urls);
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.messages[0],
          });
        }
      })
    }else{
      if(this.files.length !== 0) {
        this.authService.uploadImages(this.files).subscribe({
          next: (resp:any) => {
            console.log(resp);
            let urls: string[] =[];
            for(let i=0; i<resp.images.length;i++){
              urls[i] = resp.images[i].resourceURL;
            };
            this.authService.modProduct(this.id,this.name,this.laboratory,this.stock,this.price,this.description,this.sendCategorias,urls);
          },
          error: (err:any) => {
            console.log(err.error.messages[0]);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.error.messages[0],
            })
          }
        });
      }else {
        this.authService.modProduct(this.id,this.name,this.laboratory,this.stock,this.price,this.description,this.sendCategorias);
      }
    }
  }

  eliminarCategory(){
    this.authService.eliminarCategory(this.idDelete);
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
  categories: Category[] = this.authService.categories;

  createCategory() {
    this.authService.createCategory(this.category);
  }

}
