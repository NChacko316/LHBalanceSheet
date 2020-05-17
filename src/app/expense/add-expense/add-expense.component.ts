import { Component, OnInit } from "@angular/core";
import { Expense } from "../expense";
import { CategoryService } from "../../category/category.service";
import { ExpenseService } from "../expense.service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-add-expense",
  templateUrl: "./add-expense.component.html",
  styleUrls: ["./add-expense.component.scss"],
  providers: [MessageService]
})
export class AddExpenseComponent implements OnInit {
  categorySuggestions: any = [];
  categoryList: any = [];
  categoryItem: any;
  expense: Expense = {
    expenseDate: new Date(),
    category: {
      code: "",
      category: "",
      type: "",
      description: ""
    },
    amount: null,
    transaction_type: ""
  };

  constructor(
    private categoryService: CategoryService,
    private expenseService: ExpenseService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.categoryService.getCategoryList().subscribe(categoryList => {
      this.categoryList = categoryList;
    });
  }

  searchSuggestions(event) {
    this.categorySuggestions = this.categoryList.filter(suggestion => {
      if (
        suggestion.category.toLowerCase().indexOf(event.query.toLowerCase()) ==
        0
      )
        return suggestion;
    });
  }

  updateCategory(event) {
    if (event.code) {
      this.expense.category.category = event.category;
      this.expense.category.code = event.code;
      this.expense.category.type = event.type;
    } else {
      this.expense.category.category = "";
      this.expense.category.code = "";
      this.expense.category.type = "";
    }
  }

  clearData(){
    this.expense.category.category = "";
      this.expense.category.code = "";
      this.expense.category.type = "";
      this.expense.category.description = "";
      this.expense.amount = null;
      this.expense.transaction_type = "";
      this.expense.expenseDate = new Date();
  }
  saveExpense() {
    this.expenseService.addNewExpense(this.expense).subscribe(response => {
      this.expenseService.initiateBalanceNotificationInfo();
      this.clearData();
      this.messageService.add({
        severity: "success",
        detail: "New Expense added successfully"
      });
    });
  }
}
