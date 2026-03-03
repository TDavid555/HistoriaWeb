import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Kijelentkezett implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const kijelentkezett = !!localStorage.getItem('id'); // Egyszerű ellenőrzés
    if (kijelentkezett) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}