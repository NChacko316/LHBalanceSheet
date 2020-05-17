import { Component, OnInit } from "@angular/core";
import { ExpenseService } from "../expense.service";
import { Router } from "@angular/router";
import { Expense } from "../expense";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-view-expense",
  templateUrl: "./view-expense.component.html",
  styleUrls: ["./view-expense.component.scss"],
  providers: [MessageService]
})
export class ViewExpenseComponent implements OnInit {
  cols: any = [];
  expenseList: any = [];
  filterBy: String = "all";
  netIncome: number = 0;
  netExpense: number = 0;
  filterByYear: any = "2020";

  constructor(
    private router: Router,
    private expenseService: ExpenseService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.cols = [
      { field: "expenseDate", header: "Date" },
      { field: "category", header: "Code", subfield: "code" },
      { field: "category", header: "Category Name", subfield: "category" },
      { field: "category", header: "Description", subfield: "description" },
      { field: "category", header: "Category Type", subfield: "type" },
      { field: "amount", header: "Amount" },
      { field: "transaction_type", header: "Transaction Type" }
    ];
    this.getExpenseList();
  }

  getExpenseList() {
    let queryParams;
    if (this.filterBy == "all") {
      queryParams = {
        type: "all",
        month: "",
        year: "",
        fromDate: "",
        endDate: ""
      };
    } else {
      queryParams = {
        type: "monthly",
        month: this.filterBy,
        year: this.filterByYear,
        fromDate: "",
        endDate: ""
      };
    }

    this.expenseService.getExpenseList(queryParams).subscribe(expenseList => {
      this.expenseList = expenseList;
      let _income = 0;
      let _expense = 0;
      this.expenseList.forEach(expenseItem => {
        if (expenseItem.category.type.toLowerCase() == "income") {
          _income += expenseItem.amount;
        } else if (expenseItem.category.type.toLowerCase() == "expense") {
          _expense += expenseItem.amount;
        }
      });
      this.netIncome = _income;
      this.netExpense = _expense;
    });
  }

  deleteExpense(id) {
    this.expenseService.deleteExpense(id).subscribe(expenseList => {
      this.expenseService.initiateBalanceNotificationInfo();
      this.messageService.add({
        severity: "success",
        detail: "Expense deleted successfully"
      });
      this.getExpenseList();
    });
  }
}
