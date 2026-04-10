import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../service/courses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { languages } from 'prismjs';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {

  /**Form forup for edit course form */
  editCourseForm: FormGroup;
  /**Id of course gettinf form the router */
  course_id: any = null;
  isLoading$: any;
  /**Varaible we will use to storage course getting form the backend */
  course: any = null;
  /**Varaible for ckeditor */
  description: string = "";
  //Show instructor and categorties
  usersList: any = [];
  categoriesList: any = [];
  /**requeriments and who is it for arrays */
  requirements: any = [];
  who_is_it_for: any = [];
  //For image upload
  file_image: any;
  preview_image: any;
  file_video: any;

  constructor(
    private coursesService: CoursesService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.editCourseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      sub_title: ["", [Validators.required, Validators.minLength(3)]],
      price_usd: [0, [Validators.required]],
      price_pesos: [0, [Validators.required]],
      category: ["", [Validators.required]],
      level: ["", [Validators.required]],
      language: ["", [Validators.required]],
      instructor: ["", [Validators.required]],
      requirement_text: [""],
      who_is_it_for_text: [""],
      state: [1],
    })
  }
  ngOnInit(): void {
    this.course_id = this.route.snapshot.paramMap.get('id');
    this.isLoading$ = this.coursesService.isLoading$;

    this.coursesService.getCourseInfo(this.course_id).subscribe({
      next: (value: any) => {
        this.course = value.course;
        //console.log(this.course);
        this.editCourseForm.patchValue({
          title: this.course.title,
          sub_title: this.course.sub_title,
          price_usd: this.course.price_usd,
          price_pesos: this.course.price_pesos,
          category: this.course.category._id,
          level: this.course.level,
          language: this.course.language,
          instructor: this.course.user._id,
          state: this.course.state,
        });

        // CKEDITOR
        this.description = this.course.description || "";

        // Arrays
        this.requirements = this.course.requirements || [];
        this.who_is_it_for = this.course.who_is_it_for || [];

        // Imagen preview
        this.preview_image = this.course.image;
      }
    });

    this.coursesService.configAll().subscribe((value: any) => {
      this.usersList = value.users_list;
      this.categoriesList = value.categories_list;
    });

  }

  submit() {
    console.log(this.editCourseForm.invalid);
    if (this.editCourseForm.invalid || !this.description || !this.requirements || !this.who_is_it_for) {
      this.toastr.error("You need complete all the required fields", "Error ");
      return
    }

    //New formdata where we will sotre all the necesary info to send to the backend
    let formData = new FormData();

    formData.append("title", this.editCourseForm.controls['title'].value);
    formData.append("sub_title", this.editCourseForm.controls['sub_title'].value);
    formData.append("price_usd", this.editCourseForm.controls['price_usd'].value);
    formData.append("price_pesos", this.editCourseForm.controls['price_pesos'].value);
    formData.append("category", this.editCourseForm.controls['category'].value);
    formData.append("level", this.editCourseForm.controls['level'].value);
    formData.append("language", this.editCourseForm.controls['language'].value);
    formData.append("user", this.editCourseForm.controls['instructor'].value);
    formData.append("state", this.editCourseForm.controls['state'].value);
    formData.append("description", this.description);
    formData.append("requirements", JSON.stringify(this.requirements));
    formData.append("who_is_it_for", JSON.stringify(this.who_is_it_for));
    formData.append("cover", this.file_image);
    formData.append("_id", this.course_id);

    this.coursesService.updateCourse(formData).subscribe((resp: any) => {
      console.log(resp);
    });

    this.toastr.success("Course updated successfully", "Success");

    this.router.navigate(['courses/list']);
  }

  onChange($event: any) {
    this.description = $event.editor.getData();
  }

  addRequirement() {
    if (!this.editCourseForm.controls['requirement_text'].value) {
      this.toastr.error("Requirement text is required", "Error adding requirement")
      return
    }

    this.requirements.push(this.editCourseForm.controls['requirement_text'].value);

    this.editCourseForm.controls['requirement_text'].reset();
  }

  deleteRequirements(index: any) {
    this.requirements.splice(index, 1);
  }

  addWhoIsItFor() {
    if (!this.editCourseForm.controls['who_is_it_for_text'].value) {
      this.toastr.error("Who is it for text is required", "Error");
      return
    }

    this.who_is_it_for.push(this.editCourseForm.controls['who_is_it_for_text'].value);

    this.editCourseForm.controls['who_is_it_for_text'].reset();
  }

  deleteWhoIsItFor(index: any) {
    this.who_is_it_for.splice(index, 1);
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

  processVideoFile($event: any) {
    this.file_video = $event.target.files[0];
  }

  uploadVideoVimeo(){
    if(!this.file_video){
      this.toastr.error("Need upload a video", "Error");
      return;
    }

    let formData = new FormData();
    formData.append("vimeo", this.file_video);

    this.coursesService.uploadVideoVimeo(formData).subscribe(
      (resp:any) => {
        console.log(resp);
      }
    );
  }
}
