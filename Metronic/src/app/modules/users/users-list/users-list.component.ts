import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersAddComponent } from '../users-add/users-add.component';
import { UserService } from '../service/user.service';
import { UsersEditComponent } from '../users-edit/users-edit.component';
import { UsersDeleteComponent } from '../users-delete/users-delete.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  userList: any = [];
  isLoading: any;

  constructor(
    private modalService: NgbModal,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.isLoading = this.userService.isLoading$;
    this.userService.usersList().subscribe({
      next: (v: any) => {
        this.userList = v.users_list;
      }
    });

    setTimeout(() => {
      console.log(this.userList);
      console.log(this.userList.length);
    }, 50);
  }

  registerUser() {
    const modalRef = this.modalService.open(UsersAddComponent, { centered: true, size: 'md' });

    modalRef.componentInstance.userC.subscribe((user: any) => {
      console.log(user);
      this.userList.unshift(user);
    })
  }

  editUser(user: any) {
    const modalRef = this.modalService.open(UsersEditComponent, { centered: true, size: 'md' });

    modalRef.componentInstance.editUser = user;

    modalRef.componentInstance.userE.subscribe((user: any) => {
      console.log(user);
      let index = this.userList.findIndex((item: any) => item._id == user._id);
      if(index != -1){
        this.userList[index] = user;
      }
    })
  }

  deleteUser(user:any){
    const modalRef = this.modalService.open(UsersDeleteComponent, { centered: true, size: 'md' });

    modalRef.componentInstance.dUser = user;

    modalRef.componentInstance.userD.subscribe((user: any) => {

      let index = this.userList.findIndex((item: any) => item._id == user._id);

      if(index != -1){  
        console.log("Encontro el usuario index: "+ index);
        this.userList.splice(index, 1);
      }
    })
  }
}
