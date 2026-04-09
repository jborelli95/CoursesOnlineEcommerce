import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CoursesService } from '../service/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {
  //Register form group 
  registerCourseForm: FormGroup;
  //For image upload
  file_image: any;
  preview_image: any;
  //Show instructor and categorties
  usersList: any = [];
  categoriesList: any = [];
  //Boolean observable for know when page is loading
  isLoading$: any;
  //Description for ckeditor
  description: any = "";
  /**requeriments and who is it for arrays */
  requirements: any = [];
  who_is_it_for: any = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private coursesService: CoursesService,
    private router: Router,
  ) {
    this.registerCourseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      sub_title: ["", [Validators.required, Validators.minLength(3)]],
      price_usd: [0, [Validators.required]],
      price_pesos: [0, [Validators.required]],
      category: ["", [Validators.required]],
      level: ["", [Validators.required]],
      language: ["", [Validators.required]],
      instructor: ["", [Validators.required]],
      state: [1],
      requirement_text: [""],
      who_is_it_for_text: [""],
    });
  }

  ngOnInit(): void {
    this.isLoading$ = this.coursesService.isLoading$;

    this.coursesService.configAll().subscribe((value: any) => {
      this.usersList = value.users_list;
      this.categoriesList = value.categories_list;
    });


  }
  processFile($event: any) {
    if ($event.target.files[0].type.indexOf("image") < 0) {
      console.log($event.target.files[0]);
      this.toastr.error("Only files '.jpg, .png and .jpeg' accepted", "Error validation");
      return;
    }
    console.log($event.target.files[0]);
    this.file_image = $event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(this.file_image);
    reader.onloadend = () => {
      this.preview_image = reader.result;
    }
    this.coursesService.isLoadingSubject.next(true);
    setTimeout(() => {
      this.coursesService.isLoadingSubject.next(false);
    }, 100);
  }

  submit() {
    console.log(this.registerCourseForm.invalid);
    if(this.registerCourseForm.invalid || !this.description || !this.requirements || !this.who_is_it_for){
      this.toastr.error("You need complete all the required fields", "Error ")
      return
    }
    
    //New formdata where we will sotre all the necesary info to send to the backend
    let formData = new FormData();
    
    formData.append("title", this.registerCourseForm.controls['title'].value);
    formData.append("sub_title", this.registerCourseForm.controls['sub_title'].value);
    formData.append("price_usd", this.registerCourseForm.controls['price_usd'].value);
    formData.append("price_pesos", this.registerCourseForm.controls['price_pesos'].value);
    formData.append("category", this.registerCourseForm.controls['category'].value);
    formData.append("level", this.registerCourseForm.controls['level'].value);
    formData.append("language", this.registerCourseForm.controls['language'].value);
    formData.append("user", this.registerCourseForm.controls['instructor'].value);
    formData.append("state", this.registerCourseForm.controls['state'].value);
    formData.append("description", this.description);
    formData.append("requirements", JSON.stringify(this.requirements));
    formData.append("who_is_it_for", JSON.stringify(this.who_is_it_for));
    formData.append("cover", this.file_image);
    
    this.coursesService.registerCourse(formData).subscribe((resp:any) => {
      console.log(resp);
    });

    this.toastr.success("Course created successfully", "Success");

    this.router.navigate(['courses/list']);
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
  }

  deleteWhoIsItFor(index: any) {
    this.who_is_it_for.splice(index, 1);
  }
}
