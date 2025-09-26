import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // 🔹 Fake authentication for demo
    if (username === 'admin' && password === 'admin') {
      this.isLoggedIn = true;
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
