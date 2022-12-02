import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardModProductComponent } from './card-mod-product.component';

describe('CardModProductComponent', () => {
  let component: CardModProductComponent;
  let fixture: ComponentFixture<CardModProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardModProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardModProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
