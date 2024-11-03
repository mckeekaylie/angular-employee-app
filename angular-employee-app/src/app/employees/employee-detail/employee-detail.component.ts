import { Component, Input, OnInit } from '@angular/core';
import { employees, EmployeesService } from '../../services/employees.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'employee-detail',
  standalone: false,
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss',
})
export class EmployeeDetailComponent implements OnInit {
  @Input() id!: string;
  
  employee$ = new BehaviorSubject<any>(null);

  constructor(
    private employeesService: EmployeesService,
  ) {}

  ngOnInit() {
    this.employeesService.getEmployees().subscribe((data) => {
      let employee;
      employee = Object.assign({}, ...data.filter(item => item.id.toString() === this.id));
      this.employee$.next(employee);
    });
  }

}
