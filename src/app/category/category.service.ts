import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategoryList() {
    let params = new HttpParams();
    // Set any specific headers
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: params
    };
    return this.http.get("http://localhost:3000/category/view", httpOptions);
  }

  //Add a new Category
  addCategory(newCategory) {
    // Set any specific headers
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.post(
      "http://localhost:3000/category/addCategory",
      newCategory,
      httpOptions
    );
  }

  //getUtility
  getUtility() {
    let params = new HttpParams();
    // Set any specific headers
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: params
    };
    return this.http.get("http://localhost:3000/utility/viewUtility", httpOptions);
  }

  //Add utility
  addUtility(utility) {
    // Set any specific headers
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.post(
      "http://localhost:3000/utility/addUtility",
      utility,
      httpOptions
    );
  }

  
  //delete Category
  deleteCategory(id) {
    return this.http.delete("http://localhost:3000/category/" + id);
  }

  //Add Monthly Balance
  addMonthlyBalance(balance){
     // Set any specific headers
     const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.post(
      "http://localhost:3000/utility/addMonthlyData",
      balance,
      httpOptions
    );
  }

    //getUtility
    viewMonthlyBalance() {
      let params = new HttpParams();
      // Set any specific headers
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
        params: params
      };
      return this.http.get("http://localhost:3000/utility/viewMonthlyData", httpOptions);
    }
  
    //getUtility
    checkBalanceEntry(queryParams) {
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
      return this.http.get("http://localhost:3000/utility/checkEntry", httpOptions);
    }
  
    

}
