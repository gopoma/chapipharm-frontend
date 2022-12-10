import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  name: string = "";
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  search(event: any) {
    const name = event.target.value;
    if(name.trim()) {
      this.productService.search(name).subscribe({
        next: (resp:any) => {
          console.log(resp.products);
          this.products = resp.products;
        }
      });
    } else {
      this.products = [];
    }
  }

  clearout() {
    this.name = "";
    this.products = [];
  }
}
