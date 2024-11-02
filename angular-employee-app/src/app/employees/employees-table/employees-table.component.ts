import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmployeesService, employees } from '../../services/employees.service';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  startWith,
} from 'rxjs';

@Component({
  selector: 'employees-table',
  standalone: false,
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.scss',
})
export class EmployeesTableComponent implements OnInit {
  private employeesSubject = new BehaviorSubject<employees[] | null>(null);
  employees$ = this.employeesSubject.asObservable();

  sortedEmployees$ = new BehaviorSubject<any>(undefined);

  selectedSort$ = new BehaviorSubject<string>('');
  selectedSort: string = '';
  searchValue$ = new BehaviorSubject<string>('');
  filteredEmployees$!: Observable<employees[] | null>;

  isVowelTxt$ = new BehaviorSubject<string>('');

  onSelectionChange(event: string) {
    this.selectedSort$.next(event);
  }

  constructor(
    private http: HttpClient,
    private employeesService: EmployeesService,
  ) {}

  setEmployees(data: any) {
    this.employeesSubject.next(data);
  }

  ngOnInit() {
    this.employeesService.getEmployees().subscribe((data) => {
      this.setEmployees(data);
    });

    this.selectedSort$.subscribe((value) => {
      this.selectedSort = value;
    });

    this.filteredEmployees$ = combineLatest([
      this.employees$,
      this.searchValue$,
      this.selectedSort$,
    ]).pipe(
      map(([data, filter, sort]) => {
        const sorted = this.sort(data, sort);
        const sortedThenFiltered = this.filter(sorted, filter);
        return sortedThenFiltered;
      }),
      startWith([]),
    );
  }

  sort(data: employees[] | null, sort: string): employees[] | null {
    let key = sort as keyof employees;

    if (data !== null) {
      return data.sort((a, b) => {
        if (typeof a[key] === 'number' && typeof b[key] === 'number') {
          return a[key] - b[key];
        } else if (typeof a[key] === 'string' && typeof b[key] === 'string') {
          return a[key].localeCompare(b[key]);
        } else {
          return typeof a === 'number' ? -1 : 1;
        }
      });
    } else {
      return data;
    }
  }

  filter(data: employees[] | null, filter: string) {
    if (data !== null) {
      if (filter === '') {
        return data;
      } else {
        return data.filter((item: employees) =>
          item.employee_name.toLowerCase().includes(filter.toLowerCase()),
        );
      }
    } else {
      return data;
    }
  }

  updateFilter(event: any) {
    this.searchValue$.next(event.target.value);
  }

  resetFilter() {
    this.searchValue$.next('');
  }

  findEmployeeById(event: any) {
    let displayTxt = '';

    this.employees$.pipe().subscribe((data) => {
      const employee = data?.find(
        (x: any) => x.id.toString() === event.target.value,
      );
      const vowels = 'aeiouAEIOU';

      if (!employee) {
        displayTxt = 'Invalid Employee Id';
      } else {
        if (vowels.indexOf(employee.employee_name[0]) !== -1) {
          displayTxt = employee.employee_name;
        } else {
          displayTxt = "Employee's name does not start with a vowel";
        }
      }
    });

    this.isVowelTxt$.next(displayTxt);
  }
}
