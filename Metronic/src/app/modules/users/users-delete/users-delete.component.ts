import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-users-delete',
  templateUrl: './users-delete.component.html',
  styleUrls: ['./users-delete.component.scss']
})
export class UsersDeleteComponent {

  @Input() dUser: any;
    @Output() userD: EventEmitter<any> = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private modal: NgbActiveModal,
  ) { }

  deleteUser() {
    this.userService.remove(this.dUser._id).subscribe((resp:any) => {
      console.log(resp);
      this.userD.emit('');
      this.modal.close();
      this.toastr.success("The user was successfully deleted", "Success:");
    })
  }

  modalClose() {
    this.modal.close();
  }

}
