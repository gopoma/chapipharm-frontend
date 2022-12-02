import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardModUserComponent } from './card-mod-user.component';

describe('CardModUserComponent', () => {
  let component: CardModUserComponent;
  let fixture: ComponentFixture<CardModUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardModUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardModUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
