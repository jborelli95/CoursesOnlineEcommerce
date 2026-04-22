import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseSectionService } from '../../service/course-section.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CourseSection } from '../../models/course-section.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SectionEditComponent } from '../section-edit/section-edit.component';
import { SectionDeleteComponent } from '../section-delete/section-delete.component';

@Component({
  selector: 'app-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.scss']
})
export class SectionAddComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  title: string = "";
  courseId: string | null = null;
  courseSectionsList: CourseSection[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private courseSectionService: CourseSectionService,
    private activatedRouter: ActivatedRoute,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) {
    this.isLoading$ = this.courseSectionService.isLoading$;
  }

  ngOnInit(): void {
    this.courseId = this.activatedRouter.snapshot.paramMap.get('course_id');
    this.getCourseSections(this.courseId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  save() {
    if (!this.title) {
      this.toastr.error("You need complete all the required fields", "Error ");
      return;
    }

    const data: Partial<CourseSection> = {
      course: this.courseId ?? undefined,
      title: this.title,
      state: 1
    };

    this.courseSectionService.registerCourseSection(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp: any) => {
          if (resp.message === 403) {
            this.toastr.error("The course section title already exist", "Error");
          } else {
            this.toastr.success("Course section added successfully", "Success");
            this.title = "";
            this.courseSectionsList.unshift(resp.newCourseSection);
          }
        },
        error: () => this.toastr.error("Something went wrong", "Error")
      });
  }

  editCourseSection(section: CourseSection) {
    // We create a modalref to the edit section component, opening an emergent windows, instancando el c
    const modalRef = this.modalService.open(SectionEditComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.section = section;
    modalRef.componentInstance.sectionUpdated.subscribe((updated: CourseSection) => {
      const index = this.courseSectionsList.findIndex(s => s._id === updated._id);
      if (index !== -1) {
        this.courseSectionsList[index] = updated;
      }
    });
  }

  deleteCourseSection(sectionCourseId: string) {
    const modalRef = this.modalService.open(SectionDeleteComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.section_id = sectionCourseId;
    modalRef.componentInstance.sectionDelete.subscribe(() => {
      let index = this.courseSectionsList.findIndex((item: any) => item._id === sectionCourseId);

      if (index != -1) {
        this.courseSectionsList.splice(index, 1);
      }
    })
  }

  getCourseSections(courseId: string | null) {
    this.courseSectionService.listCoursesSection(courseId ?? undefined)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value: any) => {
          this.courseSectionsList = value.courseSectionsList;
        },
        error: () => this.toastr.error("Failed to load sections", "Error")
      });
  }


}
