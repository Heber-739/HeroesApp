import { Observable, tap, of, map, catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class AuthService {
    private url = environment.url
    private user?:User;
    constructor(private http: HttpClient) { }

    get currentUser():User{
        if(!this.user) return {} as User;
        return Object.create(this.user);
    }

     login(email:string,password:string):Observable<User>{
        return this.http.get<User>(`${this.url}/users/1`).pipe(
            tap((user)=>this.user = user),
            tap(user => localStorage.setItem('token', user.id.toString()))
        )
    }

    checkAuthentication():Observable<boolean>{
        if(!localStorage.getItem('token')) return of(false);

        const token = localStorage.getItem('token');
        return this.http.get<User>(`${this.url}/users/1`).pipe(
            tap(user => this.user = user),
            map(user => !!user),
            catchError(error => of(false))
        )

    }

logout(){
    this.user = undefined;
    localStorage.clear()
}





    
}