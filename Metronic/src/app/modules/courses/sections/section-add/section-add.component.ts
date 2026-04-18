import { Component, OnInit } from '@angular/core';
import { CourseSectionService } from '../../service/course-section.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.scss']
})
export class SectionAddComponent implements OnInit {

  isLoading$: any;
  title: string = "";
  course_id: any = null;
  courseSectionsList:any;

  constructor(
    private courseSectionService: CourseSectionService,
    private activatedRouter: ActivatedRoute,
    private toastr: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.courseSectionService.isLoading$;
    this.course_id = this.activatedRouter.snapshot.paramMap.get('course_id');
    this.getCoruseSections(this.course_id);
  }

  save() {
    if (!this.title) {
      this.toastr.error("You need complete all the required fields", "Error ");
      return;
    }

    let data = {
      course: this.course_id,
      title: this.title,
      state: 1
    }

    this.courseSectionService.registerCourseSection(data).subscribe((resp: any) => {
      if(resp.message == 403){
        this.toastr.error("The course section title already exist", "Error");
        return
      }else{
        this.toastr.success("Course section added successfully", "Success");
        this.title = "";
        this.courseSectionsList.unshift(resp.newCourseSection);
      }
    })
  }

  editCourseSection() {

  }

  deleteCourseSection() {

  }

  getCoruseSections(course_id:any){
    this.courseSectionService.listCoursesSection(course_id).subscribe({
      next:(value:any) => {
        this.courseSectionsList = value.courseSectionsList;
        console.log(this.courseSectionsList);
      }
    });
  }


}
