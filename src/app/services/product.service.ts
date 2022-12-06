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
}
