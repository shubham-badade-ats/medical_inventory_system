import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h2>Dashboard</h2>
    <nav>
      <a routerLink="/products">Products</a> |
      <a routerLink="/suppliers">Suppliers</a> |
      <a routerLink="/orders">Orders</a>
    </nav>
    <p>Welcome to the Medical Inventory System 🚑</p>
    <button (click)="logout()">Logout</button>
  `
})
export class HomeComponent {
  constructor(private authService: AuthService) {}
  logout() { this.authService.logout(); }
}
