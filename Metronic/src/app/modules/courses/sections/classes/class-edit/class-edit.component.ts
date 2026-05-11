import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { CourseClass } from '../../../models/course-class.interface';
import { CourseClassFile } from '../../../models/course-class-file.interface';
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
  description: string = '';
  state: number = 1;
  file_video: any;
  file_document: any;
  loadVideo: boolean = true;
  loadFile: boolean = true;
  classFiles: CourseClassFile[] = [];
  link_video_vimeo: any = null;
  safeVideoUrl: any = null;
  courseClassId: string = '';
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
      if (this.link_video_vimeo) {
        this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.link_video_vimeo);
      }
      this.loadClassFiles();
    }
  }

  loadClassFiles() {
    this.courseClassService.getClassFiles(this.courseClassId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp: any) => { this.classFiles = resp.files; },
        error: () => this.toastr.error('Could not load class files', 'Error')
      });
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
      _id: this.courseClass!._id,
      courseSection: this.courseClass!.courseSection,
      title: this.title,
      description: this.description,
      state: this.state,
    };

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

  processFile($event: any) {
    console.log($event.target.files[0]);
    this.file_document = $event.target.files[0];
  }

  uploadFile() {
    if (!this.file_document) {
      this.toastr.error("Need upload a File", "Error");
      return;
    }

    let formData = new FormData();
    formData.append("file", this.file_document);
    formData.append("class_id", this.courseClassId);

    
    //this.loadFile = false;

    // this.courseClassService.uploadFile(formData).pipe(takeUntil(this.destroy$)).subscribe({
    //   next:(resp:any) => {
    //     console.log(resp);
    //     this.loadFile = true;
    //   },
    //   error: () => {
    //     this.loadFile = true;
    //     this.toastr.error("Something went wrong uploading the file", "Error");
    //   }
    // })

    // this.courseClassService.uploadFile(formData).pipe(takeUntil(this.destroy$)).subscribe({
    //   next: (resp: any) => {
    //     console.log(resp);
    //     this.loadFile = true;
    //     this.file_document = null;
    //     this.toastr.success("File uploaded successfully", "Success");
    //     this.loadClassFiles();
    //   },
    //   error: () => {
    //     this.loadFile = true;
    //     this.toastr.error("Something went wrong uploading the file", "Error");
    //   }
    // });
  }

  deleteFile(file_id: string) {
    this.courseClassService.removeClassFile(file_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toastr.success('File deleted', 'Success');
          this.loadClassFiles();
        },
        error: () => this.toastr.error('Could not delete the file', 'Error')
      });
  }

  getFileIcon(filename: string): string {
    const ext = filename?.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'assets/media/svg/files/pdf.svg';
    if (ext === 'doc' || ext === 'docx') return 'assets/media/svg/files/doc.svg';
    return 'assets/media/svg/files/doc.svg';
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
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

    this.courseClassService.uploadVideoVimeo(formData).pipe(takeUntil(this.destroy$)).subscribe(
      (resp: any) => {
        console.log(resp);
        this.loadVideo = true;
        this.toastr.success("Video uploaded successfully", "Success");
      }
    );
  }

}
