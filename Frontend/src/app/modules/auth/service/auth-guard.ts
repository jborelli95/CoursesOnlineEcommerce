import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Auth } from './auth';

export const authGuard: CanActivateFn = (route, state) => {


  const authService = inject(Auth)

  console.log(authService.hola);
  
  if(!authService.user){

    authService.logOut();
    return false;
  }

  let token = authService.token;

  if(!token){
    authService.logOut();
    return false;
  }

  let expiration = (JSON.parse(atob(token.split(".")[1]))).exp;

  if(Math.floor((new Date).getTime() / 1000) >= expiration){
    authService.logOut();
    return false;
  }

  return true;
};
