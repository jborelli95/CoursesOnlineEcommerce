import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { URL_FRONTEND, URL_SERVICES } from '../../../config/config';
import { catchError, map, of } from 'rxjs';
import { url } from 'inspector';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  user: any = null;
  token: any = null;
  hola:string = "holaaa";
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initAuthToken();
  }

  initAuthToken() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token){
        this.token = token;
        this.user = JSON.parse(localStorage.getItem('user') ?? '');
      }
    }
  }
  /*
  initAuthToken() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        this.user = JSON.parse(localStorage.getItem('user') ?? '');
      }
    }
  }*/

  login(loginEmail: string, loginPassword: string) {
    //http://localhost:3000/api/auth/login
    let URL = URL_SERVICES.concat('/users/login');
    return this.http.post(URL, { email: loginEmail, password: loginPassword }).pipe(
      map((auth: any) => {
        const result = this.saveLocalStorage(auth);
        return result;
      }),
      catchError((err: any) => {
        console.log(err);
        return of(undefined);
      }),
    );
  }

  saveLocalStorage(auth: any) {
    if (auth && auth.USER.token) {
      localStorage.setItem('token', auth.USER.token);
      localStorage.setItem('user', JSON.stringify(auth.USER.user));
      return true;
    }
    return false;
  }

  register(user:any){
    let URL = URL_SERVICES.concat("/users/register");

    return this.http.post(URL, user);
  }

  logOut(){
    console.log("Estoy en logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setTimeout(() => {
      //this.router.navigateByUrl("/");
      location.href = URL_FRONTEND + "/auth/login";
    }, 50);
  }

}
