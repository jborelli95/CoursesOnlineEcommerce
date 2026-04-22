import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseSectionService } from '../../service/course-section.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-section-delete',
  templateUrl: './section-delete.component.html',
  styleUrls: ['./section-delete.component.scss']
})
export class SectionDeleteComponent {

  @Input() section_id: string | null = null;
  @Output() sectionDelete: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private courseSectionService: CourseSectionService,
    private toastr: ToastrService,
  ) {}

  delete() {
    this.courseSectionService.removeCourseSection(this.section_id)
      .subscribe({
        next: (resp: any) => {
          this.toastr.success('Section deleted successfully', 'Success');
          this.sectionDelete.emit('');
          this.activeModal.close();
        },
        error: () => this.toastr.error('Something went wrong', 'Error')
      });
  }
}
