import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Odometer } from './odometer/odometer';



@NgModule({
  declarations: [
    Header,
    Footer,
    Odometer
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Header,
    Footer,
    Odometer
  ]
})
export class SharedModule { }
