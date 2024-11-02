import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeesModule } from './employees/employees.module';

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },

  // { path : '',
  //      loadChildren: ()=> import('./employees/employees.module').then(mod => mod.EmployeesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
