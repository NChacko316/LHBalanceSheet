import { Component, OnInit } from "@angular/core";
import { ExpenseService } from "../expense/expense.service";
import { CategoryService } from "../category/category.service";
import { Router } from "@angular/router";
import { Expense } from "../expense/expense";

@Component({
  selector: "app-home-component",
  templateUrl: "./home-component.component.html",
  styleUrls: ["./home-component.component.scss"]
})
export class HomeComponentComponent implements OnInit {
  incomeCols: any = [];
  expenseCols: any = [];
  withdrawalCols: any = [];
  depositCols: any = [];
  expenseList: any = [];
  incomeResults: any = [];
  netWithdrawal: any = [];
  netDeposit: any = [];
  expResults: any = [];
  withdrawals: any = [];
  deposits: any = [];
  filterType: String = "all";
  filterByMonth: any;
  filterByYear: any;
  netIncome: number = 0;
  netExpense: number = 0;
  openingBalance: any;
  cashInHand: any;
  invalidDateRange: boolean = false;
  dateRange: any = {
    fromDate: "",
    endDate: ""
  };

  constructor(
    private router: Router,
    private expenseService: ExpenseService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.incomeCols = [
      { field: "incomeItem", header: "Receipt" },
      { field: "incomeAmount", header: "Amount" }
    ];
    this.expenseCols = [
      { field: "expenseItem", header: "Payment" },
      { field: "expenseAmount", header: "Amount" }
    ];
    this.withdrawalCols = [
      { field: "withdrawalItem", header: "Withdrawal from Bank" },
      { field: "withdrawalAmount", header: "Amount" }
    ];
    this.depositCols = [
      { field: "depositItem", header: "Deposit to Bank" },
      { field: "depositAmount", header: "Amount" }
    ];

    this.filterByMonth = new Date().getMonth();
    this.filterByYear = new Date().getFullYear();
    this.getOpeningBalance();
    this.getExpenseList();
  }

  getExpenseListBasedOnDate() {
    if (
      this.dateRange.fromDate &&
      this.dateRange.endDate &&
      this.dateRange.fromDate != "" &&
      this.dateRange.endDate
    ) {
      if (this.dateRange.fromDate < this.dateRange.endDate) {
        this.invalidDateRange = false;
        this.getExpenseList();
      } else {
        this.invalidDateRange = true;
      }
    } else {
      this.invalidDateRange = true;
    }
  }
  getOpeningBalance() {
    this.categoryService.getUtility().subscribe(response => {
      this.openingBalance = response[0].opening_balance;
    });
  }

  convertToDbFormat(dateObj){
    let month = '' + (dateObj.getMonth() + 1),
    day = '' + dateObj.getDate(),
    year = dateObj.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }
  getExpenseList() {
    let queryParams;
    if (this.filterType == "all") {
      queryParams = {
        type: this.filterType,
        month: "",
        year: "",
        fromDate: "",
        endDate: ""
      };
    } else {
      if (this.filterType == "dateRange") {
        console.log(this.dateRange.fromDate);
        let fromDateString = this.convertToDbFormat(this.dateRange.fromDate);
        let endDateString = this.convertToDbFormat(this.dateRange.endDate);
        queryParams = {
          type: this.filterType,
          month: this.filterByMonth,
          year: this.filterByYear,
          fromDate: fromDateString,
          endDate: endDateString
        };
      } else {
        queryParams = {
          type: this.filterType,
          month: this.filterByMonth,
          year: this.filterByYear,
          fromDate: "",
          endDate: ""
        };
      }
    }
    this.expenseService.getExpenseList(queryParams).subscribe(expenseList => {
      this.expenseList = expenseList;
      let _income = 0;
      let _expense = 0;
      let _withdrawal = 0;
      let _deposit = 0;
      this.netIncome = 0;
      this.netExpense = 0;
      this.netWithdrawal = 0;
      this.netDeposit = 0;
      let incomeList = [];
      let expenditureList = [];
      let withdrawalList = [];
      let depositList = [];

      this.expenseList.forEach(expenseItem => {
        if (expenseItem.category.type.toLowerCase() == "income") {
          _income += expenseItem.amount;
          this.netIncome = _income;
          incomeList.push(expenseItem);
        } else if (expenseItem.category.type.toLowerCase() == "expense") {
          _expense += expenseItem.amount;
          this.netExpense = _expense;
          expenditureList.push(expenseItem);
          if(expenseItem.category.code.toLowerCase().indexOf("wd") == 0) {
            _withdrawal += expenseItem.amount;
            this.netWithdrawal = _withdrawal;
            withdrawalList.push(expenseItem);
          }
        } else if (expenseItem.category.type.toLowerCase() == "transfer") {
          if (expenseItem.category.code.toLowerCase().indexOf("dep") == 0) {
            _deposit += expenseItem.amount;
            this.netDeposit = _deposit;
            depositList.push(expenseItem);
          } else if (
            expenseItem.category.code.toLowerCase().indexOf("wd") == 0
          ) {
            _withdrawal += expenseItem.amount;
            this.netWithdrawal = _withdrawal;
            withdrawalList.push(expenseItem);
          }
        }
      });

      let depositGroups = new Set(
        depositList.map(item => item.category.category)
      );
      this.deposits = [];
      depositGroups.forEach(g =>
        this.deposits.push({
          depositItem: g,
          depositAmount: this.expenseList
            .filter(i => i.category.category === g)
            .map(a => a.amount)
            .reduce(function(a, b) {
              return a + b;
            })
        })
      );

      let withdrawalGroups = new Set(
        withdrawalList.map(item => item.category.category)
      );
      this.withdrawals = [];
      withdrawalGroups.forEach(g =>
        this.withdrawals.push({
          withdrawalItem: g,
          withdrawalAmount: this.expenseList
            .filter(i => i.category.category === g)
            .map(a => a.amount)
            .reduce(function(a, b) {
              return a + b;
            })
        })
      );

      let incomeGroups = new Set(
        incomeList.map(item => item.category.category)
      );
      this.incomeResults = [];
      incomeGroups.forEach(g =>
        this.incomeResults.push({
          incomeItem: g,
          incomeAmount: this.expenseList
            .filter(i => i.category.category === g)
            .map(a => a.amount)
            .reduce(function(a, b) {
              return a + b;
            })
        })
      );

      let expenseGroups = new Set(
        expenditureList.map(item => item.category.category)
      );
      this.expResults = [];
      expenseGroups.forEach(g =>
        this.expResults.push({
          expenseItem: g,
          expenseAmount: this.expenseList
            .filter(i => i.category.category === g)
            .map(a => a.amount)
            .reduce(function(a, b) {
              return a + b;
            })
        })
      );
    });
  }
}
