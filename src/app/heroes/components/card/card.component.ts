import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit {

  @Input() hero:Hero = {} as Hero;
  constructor() { }

  ngOnInit(): void {
    if(!this.hero) console.log("Hero is required")
  }

}
