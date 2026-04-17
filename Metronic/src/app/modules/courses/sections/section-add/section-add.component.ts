import { Component, OnInit } from '@angular/core';
import { CourseSectionService } from '../../service/course-section.service';

@Component({
  selector: 'app-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.scss']
})
export class SectionAddComponent implements OnInit{

  isLoading$: any;
  title:string = "";

  constructor(
    private courseSectionService:CourseSectionService,
  ){

  }

  ngOnInit(): void {
    this.isLoading$ = this.courseSectionService.isLoading$;

  }

  save(){

  }

  editCourseSection(){

  }
  
  deleteCourseSection(){

  }



}
