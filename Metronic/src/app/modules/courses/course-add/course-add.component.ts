import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CoursesService } from '../service/courses.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {
  registerCourseForm: FormGroup;
  file_image: any;
  preview_image: any;
  usersList: any = [];
  categoriesList: any = [];
  isLoading$: any;
  description: any = "";
  requirements: any = [];
  //requirement_text: string = '';
  who_is_it_for: any = [];
  //who_is_it_for_text: string = '';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private coursesSerive: CoursesService,
  ) {
    this.registerCourseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      state: [null, [Validators.required]],
      requirement_text:[""],
      who_is_it_for_text:[""],
    });
  }

  ngOnInit(): void {
    this.isLoading$ = this.coursesSerive.isLoading$;

    this.coursesSerive.configAll().subscribe((value: any) => {
      this.usersList = value.users_list;
      this.categoriesList = value.categories_list;
    });

    setTimeout(() => {
      console.log(this.categoriesList);
      console.log(this.usersList);
    }, 50);
  }
  processFile($event: any) {
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
    this.coursesSerive.isLoadingSubject.next(true);
    setTimeout(() => {
      this.coursesSerive.isLoadingSubject.next(false);
    }, 100);
  }

  submit() {
    // if(this.registerCourseForm.invalid){
    //   this.toastr.error("You need complete all the required fields", "Error ")
    //   return
    // }
    console.log("submit");
    console.log(this.description);
  }

  onChange($event: any) {
    this.description = $event.editor.getData();
  }

  addRequirement() { 
    if (!this.registerCourseForm.controls['requirement_text'].value) {
      this.toastr.error("Requirement text is required", "Error adding requirement")
      return
    }

    this.requirements.push(this.registerCourseForm.controls['requirement_text'].value);

    this.registerCourseForm.controls['requirement_text'].reset();
    // setTimeout(() => {
    //   this.registerCourseForm.controls['requirement_text'].reset();
    //   this.coursesSerive.isLoadingSubject.next(true);
    //   setTimeout(() => {
    //     this.coursesSerive.isLoadingSubject.next(false);
    //   }, 50);
    // }, 50);
  }

  deleteRequirements(index: any) {
    this.requirements.splice(index, 1);
  }

  addWhoIsItFor() { 
    if (!this.registerCourseForm.controls['who_is_it_for_text'].value) {
      this.toastr.error("Who is it for text is required", "Error");
      return
    }

    this.who_is_it_for.push(this.registerCourseForm.controls['who_is_it_for_text'].value);

    this.registerCourseForm.controls['who_is_it_for_text'].reset();
    // setTimeout(() => {
    //   this.registerCourseForm.controls['who_is_it_for_text'].reset();
    // }, 50);
  }

  deleteWhoIsItFor(index: any) {
    this.who_is_it_for.splice(index, 1);
  }
}
