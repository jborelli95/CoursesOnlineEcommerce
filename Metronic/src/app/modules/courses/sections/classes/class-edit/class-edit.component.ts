import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { CourseClass } from '../../../models/course-class.interface';
import { CourseClassService } from '../../../service/course-class.service';

@Component({
  selector: 'app-class-edit',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.scss']
})
export class ClassEditComponent implements OnInit, OnDestroy {

  @Input() courseClass: CourseClass | null = null;
  @Output() classUpdated = new EventEmitter<CourseClass>();

  title: string = '';
  description: any = '';
  private destroy$ = new Subject<void>();

  constructor(
    public activeModal: NgbActiveModal,
    private courseClassService: CourseClassService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    if (this.courseClass) {
      this.title = this.courseClass.title;
      this.description = this.courseClass.description;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  save() {
    if (!this.title || !this.description) {
      this.toastr.error('Please complete all required fields', 'Error');
      return;
    }

    const data = { ...this.courseClass, title: this.title, description: this.description };

    this.courseClassService.updateCourseClass(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp: any) => {
          this.toastr.success('Class updated successfully', 'Success');
          this.classUpdated.emit(resp.updatedCourseClass);
          this.activeModal.close();
        },
        error: () => this.toastr.error('Something went wrong', 'Error')
      });
  }

  onChange($event: any) {
    this.description = $event.editor.getData();
  }
}
