import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesTableComponent } from './employees-table/employees-table.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

export const routes: Routes = [
  { 
    path: 'employees', 
    component: EmployeesTableComponent 
  },
  { 
    path: 'employees/employee-detail/:id', 
    component: EmployeeDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class EmployeesRoutingModule {}
