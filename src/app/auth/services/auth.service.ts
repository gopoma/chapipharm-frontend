import { HttpClient } from '@angular/common/http';
import { DoCheck, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Session } from 'src/app/models/session.interface';
import { User } from 'src/app/models/user.interface';
import { Category } from '../../models/category.interface';
import { Product } from '../../models/product.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements DoCheck{
  url: string = "https://chapipharm.rj.r.appspot.com/api";
  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn: boolean = false;
  user: User = null!;
  role: string = null!;
  roles:any = {
    "REGULAR": 1,
    "STOREKEEPER": 25,
    "ADMIN": 125
  };

  login(email:string, password: string){
    return this.http.post<Session>(`${this.url}/auth/login`, {email: email, password: password}, {withCredentials:true})
      .subscribe(
        (resp:Session) => {
          this.isLoggedIn = resp.success;
          this.user = resp.user;
          this.role = resp.user.role!;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Logeado Correctamente',
            showConfirmButton: false,
            timer: 2500
          });
          this.router.navigate(['/home']);
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.messages,
          })
        }
      );
  }

  register(firstName:string, lastName:string, email:string ,password: string) {
    return this.http.post<any>(`${this.url}/auth/signup`,{firstName,lastName,email,password},{withCredentials: true});
  }

  // refrescar el usuario
  validateSession() {
    const url = `${this.url}/auth/validate`;
    return this.http.get<Session>(url, {withCredentials:true})
      .pipe(
        map(resp => {
          this.isLoggedIn = resp.success;
          this.user = resp.user;
          this.role = resp.user.role!;
          return resp.success;
        }),
        catchError(() => {
          return of(false);
        })
      )
  }

  // refrescar el usuario
  validateRole(minimumRole:string) {
    const url = `${this.url}/auth/validate`;
    return this.http.get<Session>(url, {withCredentials:true})
      .pipe(
        map((resp:any) => {
          this.isLoggedIn = resp.success;
          this.user = resp.user;
          this.role = resp.user.role!;
          return this.roles[resp.user.role] >= this.roles[minimumRole];
        }),
        catchError(() => {
          return of(false);
        })
      )
  }

  hasMinimumRole(minimumRole: string): boolean {
    if(!this.role) {
      return false;
    }
    return this.roles[this.role] >= this.roles[minimumRole];
  }

  isValid() {
    return this.isLoggedIn;
  }

  logout() {
    return this.http.post<any>(`${this.url}/auth/logout`, {}, {withCredentials:true})
      .subscribe(resp => {
        this.isLoggedIn = false;
        this.user = undefined!;
        this.role = null!;
        this.router.navigate(['/auth/login']);
      }, error => {
        console.log(error);
      })
  }



  categorias: Category[] = [];
  getCategories() {
    return this.http.get<any>(`${this.url}/categories`,{withCredentials: true})
      .subscribe(resp => {
        this.categorias = resp.categories;
      });;
  }

  ngDoCheck(){
    console.log(this.categorias);
  }

  get categories(){
    return this.categorias;
  }

  createCategory(category: string) {
    return this.http.post<any>(`${this.url}/categories`,{name: category}, {withCredentials: true})
      .subscribe(resp => {
        console.log(resp.category);
        this.categorias.push(resp.category);
        this.getCategories();
      }, err => {
        console.log(err);
      });;
  }

  eliminarCategory(id: string){
    return this.http.delete<any>(`${this.url}/categories/${id}`, {withCredentials: true})
      .subscribe(resp =>{
        this.categorias = this.categorias.filter( x => (x._id+"") !== id );
        console.log(this.categorias);
      })
  }

  createProduct(name:string, laboratory:string, stock:number, price:number,description:string,categories:string[], imagenes:string[]){
    return this.http.post<any>(`${this.url}/products`,{
      name,
      laboratory,
      stock,
      price,
      description,
      categories,
      images: imagenes
    },{withCredentials: true})
      .subscribe( resp => {
        console.log(resp);
        this.myProducts.push(resp.product!);
        this.router.navigate(['/admin/products']);
      }, error => {
        console.log(error);
      }) ;
  }

  modProduct(id:string, name:string, laboratory:string, stock:number, price:number,description:string,categories:string[], imagenes:string[]){
    return this.http.patch<any>(`${this.url}/products/${id}`,{
      name,
      laboratory,
      stock,
      price,
      description,
      categories,
      images: imagenes
    },{withCredentials: true})
      .subscribe( resp => {
        console.log(resp);
        for(let i=0; i<this.categories.length; i++){
          console.log(resp);
          if(this.products[i]._id+"" === id){
            console.log(resp);
            this.products[i].name = resp.product.name;
            this.products[i].laboratory = resp.product.laboratory;
            this.products[i].stock = resp.product.stock;
            this.products[i].price = resp.product.price;
            this.products[i].description = resp.product.description;
            this.products[i].images = resp.product.images;
            this.products[i].categories = resp.product.categories;
            break;
          }
        }
        console.log(this.categories);
        this.router.navigate(['/admin/products']);
      }, error => {
        console.log(error);
      });
  }

  myProducts:Product[] = [];

  get products() {
    return this.myProducts;
  }

  getProducts(){
    return this.http.get<any>(`${this.url}/products`, {withCredentials: true})
      .subscribe(resp => {
        this.myProducts = resp.products;
      }, error => {
        console.log(error);
      });
  }

  getOneProduct(id:string){
    return this.http.get<any>(`${this.url}/products/${id}`, {withCredentials: true});
  }

  deleteProduct(id:string){
    return this.http.delete<any>(`${this.url}/products/${id}`, {withCredentials:true})
      .subscribe(resp =>{
        console.log(resp);
        this.myProducts = this.myProducts.filter(( x:Product ) => x._id !== id)
        this.router.navigate(['admin/products']);
      }, error =>{
        console.log(error);
      })
  }

  uploadImages(files: File[]){
    const formData = new FormData();
    for(let i=0; i<files.length; i++){
      formData.append('images',files[i]);
    }
    return this.http.post<any>(`${this.url}/images`,formData, {withCredentials:true});
  }
}
