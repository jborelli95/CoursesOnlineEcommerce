import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { reduce } from 'rxjs';
import { UserService } from '../service/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})
export class UsersAddComponent {

  @Output() userC: EventEmitter<any> = new EventEmitter();
  
  registerForm:FormGroup;
  file_avatar:any;
  preview_image:any = "assets/media/avatars/300-6.jpg";
  unmatchPw:boolean = false;

  constructor(
    private fb:FormBuilder,
    private toastr: ToastrService,
    private userService:UserService,
    private modal: NgbActiveModal,
  ){
    this.registerForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      surname: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(3)]],
      confirmedPassword: ["", [Validators.required, Validators.minLength(3)]],
      description: [""],
      role:["", Validators.required]
    })
  }

  submit(){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      this.toastr.error("Complete all required fields", "Error!: ");
      return;
    }

    if(this.registerForm.controls['password'].value != this.registerForm.controls['confirmedPassword'].value){
      console.log("unmatch pw true");
      this.unmatchPw = true;
      console.log(this.unmatchPw);
      return;
    }

    const formData = new FormData();

    formData.append('name', this.registerForm.get('name')?.value);
    formData.append('surname', this.registerForm.get('surname')?.value);
    formData.append('email', this.registerForm.get('email')?.value);
    formData.append('password', this.registerForm.get('password')?.value);
    formData.append('description', this.registerForm.get('description')?.value);
    formData.append('role', this.registerForm.get('role')?.value);
    formData.append('avatar', this.file_avatar);

    console.log(formData);
    this.userService.register(formData).subscribe({
      next: (value:any) => {
        console.log(value);
        this.userC.emit(value.user);
        this.modal.close();
        this.toastr.success("The user was successfully created", "Success:");
      }
    })

  }

  processAvatar($event:any){
    if($event.target.files[0].type.indexOf("image") < 0){
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
