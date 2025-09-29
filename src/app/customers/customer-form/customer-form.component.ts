// src/app/customers/customer-form/customer-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  form = this.fb.group({
    name: [''],
    email: [''],
    phone: [''],
    address: ['']
  });
  id?: number;

  constructor(
    private fb: FormBuilder,
    private service: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.service.get(this.id).subscribe(c => this.form.patchValue(c));
    }
  }

  save() {
    const customer = this.form.value as Customer;
    if (this.id) {
      this.service.update(this.id, customer).subscribe(() => {
        this.router.navigate(['/customers']);
      });
    } else {
      this.service.create(customer).subscribe(() => {
        this.router.navigate(['/customers']);
      });
    }
  }
}
