import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { CourseSection } from '../../models/course-section.interface';
import { CourseSectionService } from '../../service/course-section.service';

@Component({
  selector: 'app-section-edit',
  templateUrl: './section-edit.component.html',
  styleUrls: ['./section-edit.component.scss']
})
export class SectionEditComponent implements OnInit, OnDestroy {

  @Input() section: CourseSection | null = null;
  @Output() sectionUpdated = new EventEmitter<CourseSection>();

  title: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    public activeModal: NgbActiveModal,
    private courseSectionService: CourseSectionService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    if (this.section) {
      this.title = this.section.title;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  save() {
    if (!this.title) {
      this.toastr.error('Title is required', 'Error');
      return;
    }

    const data = { ...this.section, title: this.title };

    this.courseSectionService.updateCourseSection(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp: any) => {
          this.toastr.success('Section updated successfully', 'Success');
          this.sectionUpdated.emit(resp.updatedCourseSection);
          this.activeModal.close();
        },
        error: () => this.toastr.error('Something went wrong', 'Error')
      });
  }
}
