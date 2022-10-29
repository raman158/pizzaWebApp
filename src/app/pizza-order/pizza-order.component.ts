import { Component, OnInit } from '@angular/core'; 
import { PizzaMenuOrderModel, PizzaModel, PizzaOrderModel } from '../model/pizza-model';
import { PizzaService } from '../services/pizza.service';

@Component({
  selector: 'app-pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.css']
})
export class PizzaOrderComponent implements OnInit {

  public pizza : PizzaOrderModel = new PizzaOrderModel();
  public pizzaMenu : PizzaMenuOrderModel = new PizzaMenuOrderModel();
  public calculatedPrice: number = 0;
  public pizzaOrderId: number = 0;

  constructor(
    private pizzaService: PizzaService
  ) { 
  }

  ngOnInit(): void {
    //get pizza menu details
    this.getPizzaMenuData();
  }

  getPizzaMenuData(){
    this.pizzaService.getPizzaMenu().subscribe(res=>{
      if(res){
        this.pizzaMenu = res;
        this.initialPizzCalc();
      }
    })
  }

  //to save pizza order
  savePizzaOrder(){
    this.pizzaService.savePizzaOrder(this.pizza).subscribe(res=>{
      if(res && res.id){
        this.pizzaOrderId = res.id;
      }
    })
  }

  initialPizzCalc(){
    this.calculatedPrice = 0;
    this.calculatedPrice += this.pizzaMenu.crust.find((x:PizzaModel)=>x.isSelected)!.price || 0;
    this.calculatedPrice += this.pizzaMenu.sausage.find((x:any)=>x.isSelected)!.price  || 0;
    this.calculatedPrice += this.pizzaMenu.addOnCheeze.find((x:any)=>x.isSelected)!.price  || 0;
  }

  calculatePizzaPrice(type:string, item:any = null){
    let prevSelItem:any, selItem:any;
    switch(type){
      case 'crust': {
        prevSelItem = this.pizzaMenu.crust.findIndex((x:any)=>x.isSelected);
        selItem = this.pizzaMenu.crust.findIndex((x:any)=>x.id == this.pizza.crust);
        this.pizzaMenu.crust[prevSelItem].isSelected = false;
        this.pizzaMenu.crust[selItem].isSelected = true;
        this.calculatedPrice = this.calculatedPrice - this.pizzaMenu.crust[prevSelItem].price + this.pizzaMenu.crust[selItem].price;
        break;
      }
      case 'sausage': {
        prevSelItem = this.pizzaMenu.sausage.findIndex((x:any)=>x.isSelected);
        selItem = this.pizzaMenu.sausage.findIndex((x:any)=>x.id == this.pizza.sausage);
        this.pizzaMenu.sausage[prevSelItem].isSelected = false;
        this.pizzaMenu.sausage[selItem].isSelected = true;
        this.calculatedPrice = this.calculatedPrice - this.pizzaMenu.sausage[prevSelItem].price + this.pizzaMenu.sausage[selItem].price;
        break;
      }
      case 'adOn': {
        prevSelItem = this.pizzaMenu.addOnCheeze.findIndex((x:any)=>x.isSelected);
        selItem = this.pizzaMenu.addOnCheeze.findIndex((x:any)=>x.id == this.pizza.addOnCheeze);
        this.pizzaMenu.addOnCheeze[prevSelItem].isSelected = false;
        this.pizzaMenu.addOnCheeze[selItem].isSelected = true;
        this.calculatedPrice = this.calculatedPrice - this.pizzaMenu.addOnCheeze[prevSelItem].price + this.pizzaMenu.addOnCheeze[selItem].price;
        break;
      }
      default : {
        this.calculatedPrice += (item.isSelected ? item.price : (-1*item.price));
        break;
      }
    }
    
  }

}
