import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../../../models/product.interface';


@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
  id: string = "";
  product: Product = null!;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.productService.get(this.id).subscribe({
        next: (resp:any) => {
          this.product = resp.product;
        },
        error: () => {
          console.log("Not Found");
          this.router.navigateByUrl("/admin/products");
        }
      });
    });
  }

  deleteProduct() {
    this.productService.delete(this.id).subscribe({
      complete: () => {
        this.router.navigateByUrl("/admin/products");
      }
    });
  }

}
