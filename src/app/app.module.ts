import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AddCategoryComponent } from "./category/add-category/add-category.component";
import { ViewCategoryComponent } from "./category/view-category/view-category.component";
import { ToastModule } from "primeng/toast";
import { TableModule } from "primeng/table";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { AddExpenseComponent } from "./expense/add-expense/add-expense.component";
import { ViewExpenseComponent } from "./expense/view-expense/view-expense.component";
import { HomeComponentComponent } from "./home-component/home-component.component";

@NgModule({
  declarations: [
    AppComponent,
    AddCategoryComponent,
    ViewCategoryComponent,
    AddExpenseComponent,
    ViewExpenseComponent,
    HomeComponentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastModule,
    TableModule,
    AutoCompleteModule,
    CalendarModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
