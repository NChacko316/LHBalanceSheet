import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ExpenseService {

  private _cashBalanceSubject: BehaviorSubject<any>;
  public notification: Observable<any>;
  constructor(private http: HttpClient) {
    
    this._cashBalanceSubject = new BehaviorSubject<any>('');
    this.notification = this._cashBalanceSubject.asObservable();
  }

  initiateBalanceNotificationInfo(){
    this._cashBalanceSubject.next('Update Balance');
  }

  //View Expenses
  getExpenseList(queryParams) {
    let params = new HttpParams();
    if (queryParams) {
      for (let param in queryParams) {
        params = params.set(param, queryParams[param]);
      }
    }
    // Set any specific headers
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: params
    };
    return this.http.get("http://localhost:3000/expense/view", httpOptions);
  }

  //Add a new Expense
  addNewExpense(newExpense) {
    // Set any specific headers
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.post(
      "http://localhost:3000/expense/addExpense",
      newExpense,
      httpOptions
    );
  }

  //delete Expense
  deleteExpense(id) {
    return this.http.delete("http://localhost:3000/expense/" + id);
  }
}
