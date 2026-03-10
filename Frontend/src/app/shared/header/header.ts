import { Component, OnInit } from '@angular/core';
import { Auth } from '../../modules/auth/service/auth';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{

  user: any = null;

  constructor(public authService: Auth) {
    this.user = authService.user;
  }

  ngOnInit(): void {
    
  }

  islogged() {
      if (this.user !== null) {
        return true;
      } else {
        return false;
      }
  }

  logOut(){
    console.log("logOut");
    this.authService.logOut();
  }


}

