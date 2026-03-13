import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { reduce } from 'rxjs';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})
export class UsersAddComponent {
  
  registerForm:FormGroup;

  file_avatar:any;
  preview_image:any = "assets/media/avatars/300-6.jpg";

  constructor(
    private fb:FormBuilder,
    private toastr: ToastrService
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
    console.log(this.registerForm.value);
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
}
