import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { PizzaMenuOrderModel, PizzaModel } from '../model/pizza-model';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  // Define API
  apiURL = 'http://localhost:60890/api/pizaa';
  constructor(private http: HttpClient) { }
  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // HttpClient API get() method => Fetch Pizza menu list
  getPizzaMenu(): Observable<PizzaMenuOrderModel> {
    return this.http
      .get<PizzaMenuOrderModel>(this.apiURL + '/GetPizzaMenu')
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Save Pizza Order
  savePizzaOrder(order: any): Observable<PizzaModel> {
    return this.http
      .post<PizzaModel>(
        this.apiURL + '/SavePizzaOrder',
        order,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}