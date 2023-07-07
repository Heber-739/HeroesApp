import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

public searchInput = new FormControl()
public selectedHero?:Hero;
public heroes: Hero[] = [];

  constructor(private heroesService:HeroesService){}


  searchHero(){
    const value:string = this.searchInput.value || '';
    if(value) this.heroesService.getSuggestions(value).subscribe({
      next:(res)=> this.heroes = res
    })
    if(!value) this.heroes=[]
  }
  onSelectedOption(event:MatAutocompleteSelectedEvent){
    if(!event.option.value) return;
    
    const hero:Hero = event.option.value;
    this.searchInput.setValue(hero.superhero)

    this.selectedHero = hero;

  }
}
