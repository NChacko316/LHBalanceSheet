import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { CategoryService } from "./category/category.service";
import { MessageService } from "primeng/api";
import { ExpenseService } from "./expense/expense.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [MessageService]
})
export class AppComponent {
  currentDate: any = {
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  };
  currentMonthString: any = new Date().toLocaleString("default", {
    month: "long"
  });
  closingBalance: any;
  netIncome: number = 0;
  cashInHand: number = 0;
  netExpense: number = 0;
  expenseList: any = [];
  cashBalanceSubscription: Subscription;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private expenseService: ExpenseService
  ) {}

  ngOnInit() {
    this.cashBalanceSubscription = this.expenseService.notification.subscribe(
      respStatus => {
        if (respStatus == "Update Balance") {
          this.updateCashInHand();
        }
      }
    );
    this.updateCashInHand();
  }
  routeToExpense() {
    this.router.navigate(["add-expense"]);
  }

  settleUp() {
    let monthQuery;
    let yearQuery;
    if (this.currentDate.month == 11) {
      monthQuery = 1;
      yearQuery = this.currentDate.year + 1;
    } else {
      monthQuery = this.currentDate.month + 1;
      yearQuery = this.currentDate.year;
    }

    let settleUpObj = {
      month: monthQuery,
      year: yearQuery,
      balance: this.cashInHand
    };
    let checkParams = {
      month: monthQuery,
      year: yearQuery
    };
    this.categoryService.checkBalanceEntry(checkParams).subscribe(response => {
      if (response == false) {
        this.categoryService
          .addMonthlyBalance(settleUpObj)
          .subscribe(response => {
            this.messageService.add({
              severity: "success",
              detail: "Settled up successfully"
            });
          });
      } else if (typeof response == "object") {
        this.messageService.add({
          severity: "danger",
          detail: "Already Settle up"
        });
      }
    });
  }

  updateCashInHand() {
    let queryParams;
    queryParams = {
      type: "monthly",
      month: 2,
      year: this.currentDate.year
    };
    this.expenseService.getExpenseList(queryParams).subscribe(expenseList => {
      this.expenseList = expenseList;
      let _income = 0;
      let _expense = 0;
      this.netIncome = 0;
      this.netExpense = 0;

      this.expenseList.forEach(expenseItem => {
        if (
          expenseItem.transaction_type == "Cash" &&
          expenseItem.category.type.toLowerCase() == "income"
        ) {
          _income += expenseItem.amount;
          this.netIncome = _income;
        } else if (
          expenseItem.transaction_type == "Cash" &&
          expenseItem.category.type.toLowerCase() == "expense"
        ) {
          _expense += expenseItem.amount;
          this.netExpense = _expense;
        }
      });
      //Logic for calculating Cash in Hand
      let openingBalanceObj = 0;
      let checkParams = {
        month: 2,
        year: this.currentDate.year
      };
      this.categoryService
        .checkBalanceEntry(checkParams)
        .subscribe(response => {
          if (response == false) {
            //No Entry
          } else if (typeof response == "object") {
            openingBalanceObj = response.balance;
            this.cashInHand =
              openingBalanceObj + (this.netIncome - this.netExpense);
          }
        });
    });
  }

  settleMonthlyData(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "settle-up", centered: true })
      .result.then(
        result => {
          //this.closeResult = `Closed with: ${result}`;
          this.settleUp();
        },
        reason => {}
      );
  }

  ngOnDestroy() {
    if (this.cashBalanceSubscription)
      this.cashBalanceSubscription.unsubscribe();
  }
}
