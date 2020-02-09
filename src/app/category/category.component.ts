import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/models/category.model';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[];
  constructor(private categoryService: CategoryService) {
      this.categoryService.getCategories().subscribe(categories => {
          this.categories = categories;
      });
  }

  ngOnInit() {
  }

}
