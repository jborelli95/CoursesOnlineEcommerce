import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseDeleteComponent } from './course-delete/course-delete.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CKEditorModule } from 'ckeditor4-angular';
import { SectionAddComponent } from './sections/section-add/section-add.component';
import { SectionEditComponent } from './sections/section-edit/section-edit.component';
import { SectionDeleteComponent } from './sections/section-delete/section-delete.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseAddComponent,
    CourseListComponent,
    CourseEditComponent,
    CourseDeleteComponent,
    SectionAddComponent,
    SectionEditComponent,
    SectionDeleteComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    CKEditorModule,
  ]
})
export class CoursesModule { }
