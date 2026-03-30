import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.scss']
})
export class CategoryDeleteComponent implements OnInit{
  @Input() dCategory: any;
  @Output() categoryD: EventEmitter<any> = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private modal: NgbActiveModal,
  ) { }
  ngOnInit(): void {
    console.log(this.dCategory);
  }

  deleteUser() {
    this.categoryService.removeCategory(this.dCategory._id).subscribe((resp: any) => {
      console.log(resp);
      this.categoryD.emit('');
      this.modal.close();
      this.toastr.success("The user was successfully deleted", "Success:");
    })
  }

  modalClose() {
    this.modal.close();
  }
}
