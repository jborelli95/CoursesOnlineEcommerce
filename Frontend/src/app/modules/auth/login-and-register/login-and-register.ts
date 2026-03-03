import { Component, OnInit } from '@angular/core';
import { Auth } from '../service/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-and-register',
  standalone: false,
  templateUrl: './login-and-register.html',
  styleUrl: './login-and-register.css',
})
export class LoginAndRegister implements OnInit{

  loginEmail:string = "";
  loginPassword:string = "";

  constructor(
    //Servicio de autenticacion de usuario
    private authService:Auth,
    private router:Router
  ){}

  ngOnInit(): void {
    if(this.authService.user){
      console.log(this.authService.user);
      alert("Ya esta logeado, sera enviado al home de la pagina")
      this.router.navigate(['/']);
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
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }
}
