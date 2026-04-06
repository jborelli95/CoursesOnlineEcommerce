import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../service/courses.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit{
  //Array where we will store the courses
  coursesList: any = [];
  isLoading$: any;
  search: string = "";
  state: string = "";

  constructor(
    private coursesService: CoursesService,
  ){}

  ngOnInit(): void {
    this.isLoading$ = this.coursesService.isLoading$;
    this.listCourses();
  }

  listCourses(){
    //this.coursesService.isLoadingSubject.next(true); We dont need it. We already use this on service

    this.coursesService.listCourses(this.search, this.state).subscribe({
      next: (v: any) => {
        console.log(v);
        this.coursesList = v.courses_list;
        //this.coursesService.isLoadingSubject.next(false);
      }
    });
  }

  editCourse(id:any){
    console.log("Voy a editar a "+id);
  }

  deleteCourse(id:any){
    console.log("Voy a eliminar a "+id);
  }
}
