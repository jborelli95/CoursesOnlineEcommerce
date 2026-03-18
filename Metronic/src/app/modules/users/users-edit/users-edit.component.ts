import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit{

  @Input() editUser: any;
  @Output() userE: EventEmitter<any> = new EventEmitter();

  file_avatar: any;
  preview_image: any = "assets/media/avatars/300-6.jpg";
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private modal: NgbActiveModal,
  ) {}

  ngOnInit(): void {
    console.log(this.editUser);

     this.editForm = this.fb.group({
      name: [this.editUser.name, [Validators.required, Validators.minLength(2)]],
      surname: [this.editUser.surname, [Validators.required, Validators.minLength(2)]],
      email: [this.editUser.email, [Validators.required, Validators.email]],
      description: [this.editUser.description],
      role: [this.editUser.role, Validators.required]
    });

    if(this.editUser.avatar){
      this.preview_image = this.editUser.avatar;
    }

  }

  submit(){
    if(this.editForm.invalid){
      this.editForm.markAllAsTouched();
      this.toastr.error("Complete all required fields", "Error!: ");
      return;
    }

    const formData = new FormData();

    formData.append('_id', this.editUser._id);
    formData.append('name', this.editForm.get('name')?.value);
    formData.append('surname', this.editForm.get('surname')?.value);
    formData.append('email', this.editForm.get('email')?.value);
    formData.append('description', this.editForm.get('description')?.value);
    formData.append('role', this.editForm.get('role')?.value);
    if(this.file_avatar){
      formData.append('avatar', this.file_avatar);
    }  

    console.log(formData);

    this.userService.update(formData).subscribe({
      next: (value:any) => {
        console.log(value);
        this.userE.emit(value.user);
        this.modal.close();
      }
    })
    // this.userService.editUser(formData).subscribe({
    //   next: (value:any) => {
    //     console.log(value);
    //     this.userE.emit(value.user);
    //     this.modal.close();
    //   }
    // })
  }

  processAvatar($event: any) {
    if ($event.target.files[0].type.indexOf("image") < 0) {
      console.log($event.target.files[0]);
      this.toastr.error("Only files '.jpg, .png and .jpeg' accepted", "Error validation")
      return;
    }
    console.log($event.target.files[0]);
    this.file_avatar = $event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(this.file_avatar);
    reader.onloadend = () => {
      this.preview_image = reader.result;
    }
  }

  modalClose(){
    this.modal.close();
  }
}
