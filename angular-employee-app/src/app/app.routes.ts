import { Routes } from '@angular/router';

export const routes: Routes = [
    { path : '', loadChildren: ()=> import('./employees/employees.module').then(mod => mod.EmployeesModule)}    
];

