import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private authService:AuthService,
  private router:Router){}

  private checkAuthStatus():Observable<boolean >  | boolean{
    return this.authService.checkAuthentication().pipe(
      tap(isAuthenticated => {
        if(!isAuthenticated) this.router.navigate(['./auth/login'])})
    )
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean >  | boolean  {
    return this.checkAuthStatus();
  }
  
}

