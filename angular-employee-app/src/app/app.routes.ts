import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path : '', loadChildren: ()=> import('./employees/employees.module').then(mod => mod.EmployeesModule)}    
];

