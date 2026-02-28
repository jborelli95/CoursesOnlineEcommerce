import { Component } from '@angular/core';

@Component({
  selector: 'app-odometer',
  standalone: false,
  templateUrl: './odometer.html',
  styleUrl: './odometer.css',
})
export class Odometer {
  contador = 0;

  ngAfterViewInit() {
    setTimeout(() => {
      this.contador = 500;
      console.log("contador: ", this.contador);
    }, 50);
  }
}
