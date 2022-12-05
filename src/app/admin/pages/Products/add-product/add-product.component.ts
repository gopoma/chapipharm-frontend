import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/product.interface';
import { AuthService } from '../../../../auth/services/auth.service';
import { Category } from '../../../../models/category.interface';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor( private productService: AuthService ) { }

  ngOnInit(): void {
    this.productService.getCategories();
  }

  category: string = '';
  categories: Category[] = this.productService.categories;

  createCategory() {
    this.productService.createCategory(this.category);
  }

}
