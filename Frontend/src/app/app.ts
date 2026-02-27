import { Component, OnInit, signal } from '@angular/core';

declare function HOMEINIT([]):any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('Frontend');

  ngOnInit(): void {
    setTimeout(() => {
      HOMEINIT($);
    }, 1000);
  }
  
}
