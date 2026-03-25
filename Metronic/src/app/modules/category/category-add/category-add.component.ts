import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent {
  @Output() categoryC: EventEmitter<any> = new EventEmitter();

  registerForm: FormGroup;
  file_image: any;
  preview_image: any = "assets/media/avatars/300-6.jpg";

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modal: NgbActiveModal,
    private categoryService: CategoryService,
  ) {
    this.registerForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      state: [null, [Validators.required]],
    })
  }

  submit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.toastr.error("Complete all required fields", "Error!: ");
      return;
    }

    const formData = new FormData();

    formData.append('title', this.registerForm.get('title')?.value);
    formData.append('state', this.registerForm.get('state')?.value);
    formData.append('image', this.file_image);

    console.log(formData);


    this.categoryService.registerCategory(formData).subscribe({
      next: (value: any) => {
        console.log(value);
        this.categoryC.emit(value.category);
        this.modal.close();
        this.toastr.success("The category was successfully created", "Success:");
      }
    })

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

  modalClose() {
    this.modal.close();
  }
}
