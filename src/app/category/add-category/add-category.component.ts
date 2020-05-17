import { Component, OnInit } from "@angular/core";
import { Category } from "../category";
import { Router } from "@angular/router";
import { CategoryService } from "../category.service";

@Component({
  selector: "app-add-category",
  templateUrl: "./add-category.component.html",
  styleUrls: ["./add-category.component.scss"]
})
export class AddCategoryComponent implements OnInit {
  category: Category;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {}

  addNewCategory() {
    if (
      this.category.code != "" &&
      this.category.category != "" &&
      this.category.type != ""
    ) {
      this.categoryService.addCategory(this.category).subscribe(response => {
        console.log("Added Successfully");
        this.router.navigate(["view-category-list"]);
      });
    }
  }
}
