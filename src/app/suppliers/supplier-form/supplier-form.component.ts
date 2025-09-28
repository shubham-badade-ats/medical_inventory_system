import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService, Supplier } from '../supplier.service';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent implements OnInit {
  supplierForm = this.fb.group({
    name: ['', Validators.required],
    contact: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['']
  });

  supplierId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.supplierId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.supplierId) {
      this.supplierService.getById(this.supplierId).subscribe(supplier => {
        this.supplierForm.patchValue(supplier);
      });
    }
  }

  onSubmit() {
    if (this.supplierForm.valid) {
      const supplier: Supplier = this.supplierForm.value as Supplier;

      if (this.supplierId) {
        this.supplierService.update(this.supplierId, supplier).subscribe(() => {
          this.router.navigate(['/suppliers']);
        });
      } else {
        this.supplierService.create(supplier).subscribe(() => {
          this.router.navigate(['/suppliers']);
        });
      }
    }
  }

  cancel() {
    this.router.navigate(['/suppliers']);
  }
}
