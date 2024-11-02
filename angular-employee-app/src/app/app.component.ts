import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeesModule } from './employees/employees.module';
import { EmployeesTableComponent } from './employees/employees-table/employees-table.component';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-employee-app';
}
