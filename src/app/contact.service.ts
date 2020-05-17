import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ContactService {
  constructor(private http: HttpClient) {}

  getContacts() {
    let params = new HttpParams();
    // Set any specific headers
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: params
    };
    return this.http.get("http://localhost:3000/api/contacts", httpOptions);
  }

  //Add Contact
  addContact(newContact) {
    // Set any specific headers
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.post(
      "http://localhost:3000/api/contact",
      newContact,
      httpOptions
    );
  }

  //delete contact
  deleteContact(id) {
    return this.http.delete("http://localhost:3000/api/contact/" + id);
  }
}
