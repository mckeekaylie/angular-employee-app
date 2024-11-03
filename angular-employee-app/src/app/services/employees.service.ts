import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<employees[]> {
    return this.http.get<employees[]>('assets/employees.json');
  }
  
}

export interface employees {
  id: number;
  employee_name: string;
  employee_salary: number;
  employee_age: number;
}
