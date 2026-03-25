import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryAddComponent } from '../category-add/category-add.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { CategoryDeleteComponent } from '../category-delete/category-delete.component';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  categoriesList: any = [];
  isLoading: any;
  search: string = "";
  state: string = "";

  constructor(
    private modalService: NgbModal,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.isLoading = this.categoryService.isLoading$;

    this.listCategories();
  }

  registerCategory() {
    const modalRef = this.modalService.open(CategoryAddComponent, { centered: true, size: 'md' });

    modalRef.componentInstance.categoryC.subscribe((category: any) => {
      console.log(category);
      this.categoriesList.unshift(category);
    })
  }

  editCategory(category: any) {
    const modalRef = this.modalService.open(CategoryEditComponent, { centered: true, size: 'md' });

    modalRef.componentInstance.editCategory = category;

    modalRef.componentInstance.categoryE.subscribe((category: any) => {
      console.log(category);
      let index = this.categoriesList.findIndex((item: any) => item._id == category._id);
      if (index != -1) {
        this.categoriesList[index] = category;
      }
    })
  }

  deleteCategory(category: any) {
    const modalRef = this.modalService.open(CategoryDeleteComponent, { centered: true, size: 'md' });

    modalRef.componentInstance.editCategory = category;

    modalRef.componentInstance.categoryD.subscribe((category: any) => {

      let index = this.categoriesList.findIndex((item: any) => item._id == category._id);

      if (index != -1) {
        console.log("Encontro el usuario index: " + index);
        this.categoriesList.splice(index, 1);
      }
    })
  }

  listCategories() {
    this.categoryService.listCategories(this.search, this.state).subscribe({
      next: (v: any) => {
        console.log(v);
        this.categoriesList = v.categories;
      }
    });
  }
}
