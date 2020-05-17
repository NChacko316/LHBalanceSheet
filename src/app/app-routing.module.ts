import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponentComponent } from "./home-component/home-component.component";
import { ViewCategoryComponent } from "./category/view-category/view-category.component";
import { AddExpenseComponent } from "./expense/add-expense/add-expense.component";
import { ViewExpenseComponent } from "./expense/view-expense/view-expense.component";

const routes: Routes = [
  { path: "add-expense", component: AddExpenseComponent },
  { path: "view-expense", component: ViewExpenseComponent },
  { path: "view-category-list", component: ViewCategoryComponent },
  { path: "", component: HomeComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
