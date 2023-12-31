import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {
  public hero?:Hero;

  constructor(private heroService:HeroesService,
    private activatedRoute:ActivatedRoute,
    private router:Router){}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      delay(3000),
      switchMap(({id})=>this.heroService.getHeroById(id))
    ).subscribe({
      next:(hero)=> {
        if(!hero) this.router.navigate(['/heroes/list'])
        this.hero=hero
    }
    })
      
  }


  goBack(){
    this.router.navigate(['/heroes/list'])
  }
}
