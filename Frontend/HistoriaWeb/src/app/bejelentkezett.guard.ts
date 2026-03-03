import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Bejelentkezett implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const bejelentkezett = !!localStorage.getItem('id'); // Egyszerű ellenőrzés
    if (!bejelentkezett) {
      this.router.navigate(['/hitelesito']);
      return false;
    }
    return true;
  }
}