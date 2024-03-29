import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string = "https://chapipharm.rj.r.appspot.com/api/products";

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.url);
  }

  get(id:string) {
    return this.http.get(`${this.url}/${id}`);
  }

  search(name:string) {
    return this.http.get(`${this.url}/search`, {params:{name}});
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`, {withCredentials:true});
  }
}
