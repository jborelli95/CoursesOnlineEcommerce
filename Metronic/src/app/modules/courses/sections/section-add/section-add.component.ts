import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseSectionService } from '../../service/course-section.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CourseSection } from '../../models/course-section.interface';

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

  editCourseSection(courseId: string) {
    console.log(courseId);
  }

  deleteCourseSection(courseId: string) {
    console.log(courseId);
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
