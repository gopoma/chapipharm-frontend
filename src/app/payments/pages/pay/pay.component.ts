import { Component, OnInit } from '@angular/core';
import { CarListService } from '../../services/car-list.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  constructor(private carListService: CarListService) { }

  stripe: any = (<any>window).Stripe("pk_test_51MJ8wWIABKXrLlD4g82K15Q5ZCADNFHP55mtGqgLbESGe954qZtL7WRf5P893DoAHDLQErUkxNNFirg2UpGvJ8wm00XfgNbNmf");
  elements: any;

  ngOnInit(): void {
    this.carListService.getClientSecret()
      .subscribe({
        next: (data) => {
          const clientSecret = data.clientSecret;
          const appearance = {
            theme: 'stripe',
          };
          this.elements = this.stripe.elements({ appearance, clientSecret });
          const paymentElement = this.elements.create("payment");
          paymentElement.mount("#payment-element");
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  async pay() {
    const result = await this.stripe.confirmPayment({
      elements: this.elements,
      redirect: 'if_required'
    });
    console.log(result);
  }

}
