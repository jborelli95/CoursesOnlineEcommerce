import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, takeUntil } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseClassService } from '../../../service/course-class.service';
import { ClassEditComponent } from '../class-edit/class-edit.component';
import { ClassDeleteComponent } from '../class-delete/class-delete.component';
import { CourseClass } from '../../../models/course-class.interface';

@Component({
  selector: 'app-class-add',
  templateUrl: './class-add.component.html',
  styleUrls: ['./class-add.component.scss']
})
export class ClassAddComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  courseSectionId: string | null = null;
  courseClassesList: CourseClass[] = [];

  title: string = '';
  // vimeo_id: string = '';
  // time: string = '';
  description: any = '';

  private destroy$ = new Subject<void>();

  constructor(
    private courseClassService: CourseClassService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) {
    this.isLoading$ = this.courseClassService.isLoading$;
  }

  ngOnInit(): void {
    this.courseSectionId = this.activatedRoute.snapshot.paramMap.get('CourseSectionId');
    this.listCourseClasses();
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

    const data = {
      title: this.title,
      description: this.description,
      courseSection: this.courseSectionId,
      state: 1,
    };

    this.courseClassService.registerCourseClass(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp: any) => {
          if (resp.message === 409) {
            this.toastr.error('A class with that title already exists in this section', 'Error');
          } else {
            this.toastr.success('Class added successfully', 'Success');
            this.title = '';
            this.description = '';
            console.log(resp.newCourseClass);
            this.courseClassesList.unshift(resp.newCourseClass);
          }
        },
        error: () => this.toastr.error('Something went wrong', 'Error')
      });
  }

  listCourseClasses() {
    this.courseClassService.listCourseClasses(this.courseSectionId ?? undefined)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp: any) => {
          this.courseClassesList = resp.courseClassesList;
        },
        error: () => this.toastr.error('Failed to load classes', 'Error')
      });
  }

  editCourseSectionClass(courseClass: CourseClass) {
    const modalRef = this.modalService.open(ClassEditComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.courseClass = courseClass;
    modalRef.componentInstance.classUpdated.subscribe((updated: any) => {
      const index = this.courseClassesList.findIndex(c => c._id === updated._id);
      if (index !== -1) {
        this.courseClassesList[index] = updated;
      }
    });
  }

  deleteCourseSectionClass(courseClassId: string) {
    const modalRef = this.modalService.open(ClassDeleteComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.courseClass_id = courseClassId;
    modalRef.componentInstance.classDelete.subscribe(() => {
      const index = this.courseClassesList.findIndex(c => c._id === courseClassId);
      if (index !== -1) {
        this.courseClassesList.splice(index, 1);
      }
    });
  }

    onChange($event: any) {
    this.description = $event.editor.getData();
  }
}
