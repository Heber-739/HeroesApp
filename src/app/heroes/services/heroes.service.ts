import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces/hero.interface';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeroesService   {
  private url: string = environment.url + '/heroes';

  constructor(private http: HttpClient) {}

 

 
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.url);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http
      .get<Hero>(`${this.url}/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  getSuggestions(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.url}?q=${query}&_limit=5`);
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.url}`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    if(!hero.id) throw new Error("Hero is required");
    
    return this.http.patch<Hero>(`${this.url}/${hero.id}`, hero);
  }

  deleteHero(id: string): Observable<boolean> {
    return this.http.delete<Hero>(`${this.url}/${id}`)
    .pipe(
      map(resp => true),
      catchError(error => of(false))
    )
  }
}
