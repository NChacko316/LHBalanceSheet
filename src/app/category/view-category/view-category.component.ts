import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../category.service";
import { Router } from "@angular/router";
import { Category } from "../category";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-view-category",
  templateUrl: "./view-category.component.html",
  styleUrls: ["./view-category.component.scss"],
  providers: [MessageService]
})
export class ViewCategoryComponent implements OnInit {
  categoryList: any = [];
  monthlyBalanceList: any = [];
  cols: any = [];
  openingBalance: number = 0;
  category: Category = {
    code: "",
    category: "",
    type: ""
  };
  monthyData: any = {
    balance: "",
    month: "",
    year: ""
  };

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.cols = [
      { field: "code", header: "Code" },
      { field: "category", header: "Category" },
      { field: "type", header: "Type" }
    ];
    this.getCategoryList();
  }

  getCategoryList() {
    this.categoryService.getCategoryList().subscribe(categoryList => {
      this.categoryList = categoryList;
    });
  }

  getMonthlyBalanceData() {
    this.categoryService.viewMonthlyBalance().subscribe(monthlyBalance => {
      this.monthlyBalanceList = monthlyBalance;
    });
  }

  resetInputs() {
    this.category.code = "";
    this.category.category = "";
    this.category.type = "";
    this.openingBalance = 0;
  }
  addNewCategory() {
    if (
      this.category.code != "" &&
      this.category.category != "" &&
      this.category.type != ""
    ) {
      this.categoryService.addCategory(this.category).subscribe(response => {
        this.messageService.add({
          severity: "success",
          detail: "New category added successfully"
        });
        this.getCategoryList();
        this.resetInputs();
      });
    }
  }

  addOpeningBalance() {
    if (this.openingBalance != 0) {
      let balanceObj = {
        opening_balance: this.openingBalance
      };
      this.categoryService.addUtility(balanceObj).subscribe(response => {
        this.messageService.add({
          severity: "success",
          detail: "Opening Balance added successfully"
        });
        this.resetInputs();
      });
    }
  }

  

  deleteCategory(id) {
    this.categoryService.deleteCategory(id).subscribe(response => {
      this.messageService.add({
        severity: "success",
        detail: "Category deleted successfully"
      });
      this.getCategoryList();
    });
  }
}
