import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesTableComponent } from './employees-table/employees-table.component';
import { EmployeesRoutingModule } from './employees-routing.module.ts';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmployeesTableComponent],
  imports: [CommonModule, EmployeesRoutingModule, FormsModule],
  exports: [EmployeesTableComponent],
})
export class EmployeesModule {}
