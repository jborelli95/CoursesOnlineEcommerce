import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CoursesComponent } from './courses.component';
import { SectionAddComponent } from './sections/section-add/section-add.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [
      {
        path: 'register',
        component: CourseAddComponent
      },
      {
        path: 'edit/:id',
        component: CourseEditComponent
      },
      {
        //list/section/course id
        path: 'list/section/:course_id',
        component: SectionAddComponent
      },
      {
        path: 'list',
        component: CourseListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
