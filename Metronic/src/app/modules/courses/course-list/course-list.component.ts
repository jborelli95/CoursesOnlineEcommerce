import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../service/courses.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseDeleteComponent } from '../course-delete/course-delete.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  //Array where we will store the courses
  coursesList: any = [];
  isLoading$: any;
  search: string = "";
  state: string = "";

  constructor(
    private coursesService: CoursesService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.coursesService.isLoading$;
    this.listCourses();
  }

  listCourses() {
    //this.coursesService.isLoadingSubject.next(true); We dont need it. We already use this on service

    this.coursesService.listCourses(this.search, this.state).subscribe({
      next: (v: any) => {
        console.log(v);
        this.coursesList = v.courses_list;
        //this.coursesService.isLoadingSubject.next(false);
      }
    });
  }

  deleteCourse(course: any) {

    const modalRef = this.modalService.open(CourseDeleteComponent, { centered: true, size: 'md' });

    modalRef.componentInstance.dCourse = course;

    modalRef.componentInstance.courseD.subscribe((course: any) => {
      let index = this.coursesList.findIndex((item: any) => item._id == course._id);

      if (index != -1) {
        console.log("Encontro el usuario index: " + index);
        this.coursesList.splice(index, 1);
      }
    })
  }


}
