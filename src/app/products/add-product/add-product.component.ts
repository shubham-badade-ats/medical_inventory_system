import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Add Product</h2>
    <form (ngSubmit)="onSubmit()">
      <label>Product Name: 
        <input [(ngModel)]="productName" name="name">
      </label>
      <button type="submit">Save</button>
    </form>
  `
})
export class AddProductComponent {
  productName = '';

  onSubmit() {
    console.log('Product added:', this.productName);
    this.productName = '';
  }
}
