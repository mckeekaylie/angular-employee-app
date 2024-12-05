import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('assets/employees.json').pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        return of([]);
      })
    );
  }
}

export interface Employee {
  id: number;
  employee_name: string;
  employee_salary: number;
  employee_age: number;
}
