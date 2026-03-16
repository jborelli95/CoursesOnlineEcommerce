import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersAddComponent } from '../users-add/users-add.component';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit{

  userList:any = [];
  isLoading:any;

  constructor(
    private modalService:NgbModal,
    private userService:UserService
  ){}

  ngOnInit(): void {
    this.isLoading = this.userService.isLoading$;
    this.userService.usersList().subscribe({
      next: (v:any) => {
        this.userList = v.users_list;
      }
    });

    setTimeout(() => {
      console.log(this.userList);
      console.log(this.userList.length);
    }, 50);
  }

  registerUser(){
    const modalRef = this.modalService.open(UsersAddComponent, {centered: true, size: 'md'});
  }
}
