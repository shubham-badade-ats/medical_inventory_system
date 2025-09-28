import { Routes } from '@angular/router';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { MedicineFormComponent } from './medicine-form/medicine-form.component';
import { MedicineDetailComponent } from './medicine-detail/medicine-detail.component';

export const MEDICINES_ROUTES: Routes = [
  { path: '', component: MedicineListComponent },
  { path: 'add', component: MedicineFormComponent },
  { path: 'edit/:id', component: MedicineFormComponent },
   {
    path: 'detail/:id',
    component: MedicineDetailComponent 
  }
];
