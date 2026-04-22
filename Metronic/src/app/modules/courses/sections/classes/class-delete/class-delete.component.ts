import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseClassService } from '../../../service/course-class.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-class-delete',
  templateUrl: './class-delete.component.html',
  styleUrls: ['./class-delete.component.scss']
})
export class ClassDeleteComponent {

  @Input() courseClass_id: string | null = null;
  @Output() classDelete: EventEmitter<any> = new EventEmitter();
  
  confirmed: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private courseClassService: CourseClassService,
    private toastr: ToastrService,
  ) { }

  delete() {
    this.courseClassService.removeCourseClass(this.courseClass_id!)
      .subscribe({
        next: () => {
          this.toastr.success('Class deleted successfully', 'Success');
          this.classDelete.emit('');
          this.activeModal.close();
        },
        error: () => this.toastr.error('Something went wrong', 'Error')
      });
  }
}
