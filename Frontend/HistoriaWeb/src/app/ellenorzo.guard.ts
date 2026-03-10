import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class Ellenorzes implements CanActivate {
  constructor(private router: Router,private loginService:LoginService) {}

  canActivate(): boolean {
    if (this.loginService.kod=="") {
      this.router.navigate(['/hitelesito']);
      return false;
    }
    return true;
  }
}