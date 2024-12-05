import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Employee, EmployeesService } from '../../services/employees.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'employee-detail',
  standalone: false,
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss',
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {
  @Input() id!: string;

  employee$ = new BehaviorSubject<Employee | null>(null);

  onDestroy$: Subject<void> = new Subject();

  constructor(private employeesService: EmployeesService) {}

  ngOnInit() {
    this.employeesService
      .getEmployees()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        let employee;
        employee = Object.assign(
          {},
          ...data.filter((item) => item.id.toString() === this.id)
        );
        this.employee$.next(employee);
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
