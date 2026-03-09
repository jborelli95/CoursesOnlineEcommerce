import { Component, OnInit } from '@angular/core';
import { Auth } from '../../modules/auth/service/auth';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{

  user: any = this.authService.user;

  constructor(public authService: Auth) {
    console.log(this.user);
    console.log(this.islogged());
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
    console.log("logOut header");
    this.authService.logOut();
  }


}

