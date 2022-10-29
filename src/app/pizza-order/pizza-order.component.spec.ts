import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaOrderComponent } from './pizza-order.component';

describe('PizzaOrderComponent', () => {
  let component: PizzaOrderComponent;
  let fixture: ComponentFixture<PizzaOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzaOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Default pizza price price test case`, () => {
    const app = fixture.componentInstance;
    app.initialPizzCalc();
    expect(app.calculatedPrice).toBe(160);
  });

});

 
