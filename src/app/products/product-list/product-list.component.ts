import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Product List</h2>
    <ul>
      <li *ngFor="let product of products">{{ product }}</li>
    </ul>
    <button routerLink="/products/add">Add Product</button>
  `
})
export class ProductListComponent {
  products = ['Paracetamol', 'Amoxicillin', 'Insulin'];
}
