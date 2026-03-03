import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_SERVICES } from '../../../config/config';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  user:any = null;
  token:any = null;

  constructor(
    private http:HttpClient,
    private router:Router,
  ){
    this.initAuthToken();
  }

  initAuthToken(){
    if(localStorage.getItem("token")){
      this.user = JSON.parse(localStorage.getItem("user") ?? '');
      this.token = localStorage.getItem("token");
    }
  }

  login(loginEmail:string, loginPassword:string){
    //http://localhost:3000/api/auth/login
    let URL = URL_SERVICES.concat("/users/login");
    return this.http.post(URL, {email: loginEmail, password: loginPassword}).pipe(
      map((auth:any) => {
        console.log(auth);
        const result = this.saveLocalStorage(auth);
        return result;
      }),
      catchError((err:any) => {
        console.log(err);
        return of(undefined);
      })
    )
  }

  saveLocalStorage(auth:any){
     if(auth && auth.USER.token){
      localStorage.setItem("token", auth.USER.token);
      localStorage.setItem("user", JSON.stringify(auth.USER.user));
      return true;
     }else{
      return false;
     }
  }

}
