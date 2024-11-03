import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesTableComponent } from './employees-table/employees-table.component';
import { EmployeesRoutingModule } from './employees-routing.module.ts';
import { FormsModule } from '@angular/forms';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

@NgModule({
  declarations: [EmployeesTableComponent, EmployeeDetailComponent],
  imports: [CommonModule, EmployeesRoutingModule, FormsModule],
  exports: [EmployeesTableComponent],
})
export class EmployeesModule {}
