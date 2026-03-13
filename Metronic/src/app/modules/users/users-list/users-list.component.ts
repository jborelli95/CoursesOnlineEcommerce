import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersAddComponent } from '../users-add/users-add.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  constructor(
    private modalService:NgbModal
  ){}

  registerUser(){
    const modalRef = this.modalService.open(UsersAddComponent, {centered: true, size: 'md'});
  }
}
