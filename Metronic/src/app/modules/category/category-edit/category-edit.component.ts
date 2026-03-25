import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent {
   @Input() editCategory: any;
    @Output() categoryE: EventEmitter<any> = new EventEmitter();
  
    file_image: any;
    preview_image: any = "assets/media/avatars/300-6.jpg";
    editForm: FormGroup;
  
    constructor(
      private fb: FormBuilder,
      private toastr: ToastrService,
      private modal: NgbActiveModal,
      private categoryService: CategoryService,
    ) {}
  
    ngOnInit(): void {
      console.log(this.editCategory);
  
       this.editForm = this.fb.group({
        title: [this.editCategory.title, [Validators.required, Validators.minLength(2)]],
        state: [this.editCategory.state, [Validators.required]],
      });
  
      if(this.editCategory.image){
        this.preview_image = this.editCategory.image;
      }
  
    }
  
    submit(){
      if(this.editForm.invalid){
        this.editForm.markAllAsTouched();
        this.toastr.error("Complete all required fields", "Error!: ");
        return;
      }
  
      const formData = new FormData();
  
      formData.append('_id', this.editCategory._id);
      formData.append('title', this.editForm.get('title')?.value);
      formData.append('state', this.editForm.get('state')?.value);
      if(this.file_image){
        formData.append('image', this.file_image);
      }  
  
      console.log(formData);
  
      this.categoryService.updateCategory(formData).subscribe({
        next: (value:any) => {
          console.log(value);
          this.categoryE.emit(value.user);
          this.modal.close();
          this.toastr.success("The category was successfully updated", "Success:");
        }
      });
    }
  
    processImage($event: any) {
      if ($event.target.files[0].type.indexOf("image") < 0) {
        console.log($event.target.files[0]);
        this.toastr.error("Only files '.jpg, .png and .jpeg' accepted", "Error validation")
        return;
      }
      console.log($event.target.files[0]);
      this.file_image = $event.target.files[0];
  
      let reader = new FileReader();
      reader.readAsDataURL(this.file_image);
      reader.onloadend = () => {
        this.preview_image = reader.result;
      }
    }
  
    modalClose(){
      this.modal.close();
    }
}
