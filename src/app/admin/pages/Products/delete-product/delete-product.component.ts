import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';


@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  id: string = '';

  constructor(private activatedRoute: ActivatedRoute, private productService: AuthService) { 
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id'];
      console.log(this.id);
      console.log(params);
    })
  }
  
  

  ngOnInit(): void {
  }

  deleteProduct() {
    this.productService.deleteProduct(this.id);
  }

}
