import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor(private authService:AuthService,
    private router:Router){}

  onLogin(){
    this.authService.login("Heber","asd345fgh").subscribe({
      next:(res)=>{
        this.router.navigate(['heroes/list'])

      }
    })
  }
  
}
