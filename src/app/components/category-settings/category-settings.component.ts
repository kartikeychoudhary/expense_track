import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-category-settings',
  templateUrl: './category-settings.component.html',
})
export class CategorySettingsComponent {
  @Input() categories: string[] = [];
  @Output() categoriesChange = new EventEmitter<string[]>();
  
  newCategory: string = '';

  addCategory() {
    const trimmedCategory = this.newCategory.trim();
    if (trimmedCategory && !this.categories.includes(trimmedCategory)) {
      this.categories = [...this.categories, trimmedCategory];
      this.categoriesChange.emit(this.categories);
      this.newCategory = '';
    }
  }

  deleteCategory(categoryToDelete: string) {
    this.categories = this.categories.filter(category => category !== categoryToDelete);
    this.categoriesChange.emit(this.categories);
  }
}
