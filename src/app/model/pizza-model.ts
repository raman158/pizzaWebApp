export class PizzaModel {
    id: number = 0;
    name: string = '';
    price: number = 0;
    currency: string = '';
    isSelected: boolean = false;
}

export class PizzaMenuOrderModel {
    crust: PizzaModel[] = [];
    sausage: PizzaModel[] = [];
    addOnCheeze: PizzaModel[] = [];
    toppings: PizzaModel[] = [];
}

export class PizzaOrderModel {
    crust: number = 2;
    sausage: number = 1;
    addOnCheeze: number = 1;
    toppings: PizzaModel[] = [];
}