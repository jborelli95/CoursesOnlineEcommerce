import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CoursesService } from '../service/courses.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent {
  registerCourseForm: FormGroup;
  // file_image: any;
  // preview_image: any = "assets/media/avatars/300-6.jpg";

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private coursesSerive: CoursesService,
  ) {
    this.registerCourseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      state: [null, [Validators.required]],
    })
  }
  processFile($event: any) {
    // if ($event.target.files[0].type.indexOf("image") < 0) {
    //   console.log($event.target.files[0]);
    //   this.toastr.error("Only files '.jpg, .png and .jpeg' accepted", "Error validation")
    //   return;
    // }
    // console.log($event.target.files[0]);
    // this.file_image = $event.target.files[0];

    // let reader = new FileReader();
    // reader.readAsDataURL(this.file_image);
    // reader.onloadend = () => {
    //   this.preview_image = reader.result;
    // }
  }

  submit(){

  }
}
