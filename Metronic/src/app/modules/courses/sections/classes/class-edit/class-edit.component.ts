import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { CourseClass } from '../../../models/course-class.interface';
import { CourseClassService } from '../../../service/course-class.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  state: number = 1;
  file_video: any;
  loadVideo: boolean = true;
  link_video_vimeo: any = null;
  courseClassId:string = '';
  private destroy$ = new Subject<void>();

  constructor(
    public activeModal: NgbActiveModal,
    private courseClassService: CourseClassService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    if (this.courseClass) {
      this.title = this.courseClass.title;
      this.description = this.courseClass.description;
      this.state = this.courseClass.state;
      this.courseClassId = this.courseClass._id;
      this.link_video_vimeo = this.courseClass.vimeo_id;
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

    const data = { ...this.courseClass, title: this.title, description: this.description, state: this.state };

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

  processVideoFile($event: any) {
    this.file_video = $event.target.files[0];
  }

  uploadVideoVimeo() {
    if (!this.file_video) {
      this.toastr.error("Need upload a video", "Error");
      return;
    }

    console.log(this.file_video);
    let formData = new FormData();
    formData.append("video", this.file_video);
    formData.append("_id", this.courseClassId);
    this.loadVideo = false;

    this.courseClassService.uploadVideoVimeo(formData).subscribe(
      (resp: any) => {
        console.log(resp);
        this.loadVideo = true;
        this.toastr.error("Video trailer uploaded successfully", "Success");
      }
    );
  }

  urlVideo() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.link_video_vimeo);
  }
}
