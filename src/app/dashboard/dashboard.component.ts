import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatCardModule } from '@angular/material/card';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NgChartsModule,
    MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Chart labels
  inventoryLabels: string[] = ['Medicines', 'Supplies', 'Equipment'];

  // Chart dataset
  inventoryData: ChartConfiguration<'pie'>['data'] = {
    labels: this.inventoryLabels,
    datasets: [
      {
        data: [120, 80, 40], // sample values
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726']
      }
    ]
  };

  // Chart options
  chartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Inventory Overview'
      }
    }
  };
}

