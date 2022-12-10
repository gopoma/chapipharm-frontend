import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  product: Product = null!;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      const id = params['id'];
      this.productService.get(id).subscribe({
        next: (resp:any) => {
          this.product = resp.product;
        },
        error: console.log
      });
    });
  }

}
