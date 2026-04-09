import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CoursesService } from '../service/courses.service';

@Component({
  selector: 'app-course-delete',
  templateUrl: './course-delete.component.html',
  styleUrls: ['./course-delete.component.scss']
})
export class CourseDeleteComponent {
  @Input() dCourse: any;
  @Output() courseD: EventEmitter<any> = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private coursesService: CoursesService,
    private modal: NgbActiveModal,
  ) { }

  deleteCourse() {
    console.log(this.dCourse);

    this.coursesService.removeCourse(this.dCourse._id).subscribe({
      next:(resp:any) => {
        console.log(resp);
        this.courseD.emit(this.dCourse);
        this.modal.close();
        this.toastr.success("The user was successfully deleted", "Success:");
      }
    })
  }

  modalClose() {
    this.modal.close();
  }
}
