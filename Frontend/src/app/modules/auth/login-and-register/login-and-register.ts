import { Component, OnInit } from '@angular/core';
import { Auth } from '../service/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { register } from 'module';

@Component({
  selector: 'app-login-and-register',
  standalone: false,
  templateUrl: './login-and-register.html',
  styleUrl: './login-and-register.css',
})
export class LoginAndRegister implements OnInit{

  loginEmail:string = "";
  loginPassword:string = "";
  unmatchPassword:boolean = false;
  existedEmail:boolean = false;

  registerForm: FormGroup = this.fb.group({
    name: new FormControl("", Validators.required),
    surname: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(3)]),
    confirmedPassword: new FormControl("", [Validators.required, Validators.minLength(3)])
  })

  constructor(
    //Servicio de autenticacion de usuario
    private authService:Auth,
    private router:Router,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    console.log(this.authService.user);
    if(this.authService.user){
      this.router.navigateByUrl("/");
    }
  }

  login(){
    if(!this.loginEmail || !this.loginPassword){
      alert("Tenes que llenar todos los campos obligatorios");
      return
    }
    
    this.authService.login(this.loginEmail, this.loginPassword).subscribe({
      next: (resp:any) => {
        console.log(resp);
        if(resp){
          window.location.reload();
        }else{
          alert("Las credenciales son incorrectas");
        }
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }

  regsiter(){
    this.unmatchPassword = false;
    this.existedEmail = false;

    if(this.registerForm.invalid){
      alert("Formulario invalido")
      return
    }
    
    if(this.registerForm.controls['password'].value !== this.registerForm.controls['confirmedPassword'].value){
      alert("Las contraseñas no coinciden")
      this.unmatchPassword = true;
      return
    }

    /**Aca desmenuzamos el registerForm para  mandar una variable con la data limpia y llamamos al authservice */
    let data = {
      name: this.registerForm.controls['name'].value,
      surname: this.registerForm.controls['surname'].value,
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
      rol: 'cliente'
    }

    this.authService.register(data).subscribe({
      next: (value:any  ) => {
        console.log(value);
        if(value.message == 403){
          this.existedEmail = true;
          alert(value.message_text);
          console.log(this.existedEmail);
          return
        }else{
          alert("El usuario se creo con éxito!");
          this.registerForm.reset();
        }
      }
    })

  }

  reset(){
    
  }

  clearForm(){
    

  }
}
