import { Component, OnInit } from '@angular/core';

declare function HOMEINIT([]):any;
declare var $:any;

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  ngOnInit(): void {
    setTimeout(() => {
      HOMEINIT($);
    }, 200);
  }
}
