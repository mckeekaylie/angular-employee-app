import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeesService, Employee } from '../../services/employees.service';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  Observable,
  startWith,
  Subject,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'employees-table',
  standalone: false,
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.scss',
})
export class EmployeesTableComponent implements OnInit, OnDestroy {
  private employeesSubject = new BehaviorSubject<Employee[] | null>(null);
  employees$ = this.employeesSubject.asObservable();

  sortedEmployees$ = new BehaviorSubject<Employee[] | null>(null);

  selectedSort$ = new BehaviorSubject<string>('id');
  selectedSort: string = '';

  searchValue$ = new BehaviorSubject<string>('');
  filteredEmployees$!: Observable<Employee[] | null>;

  isVowelTxt$ = new BehaviorSubject<string>('');

  isLoaded$ = new BehaviorSubject<boolean>(false);

  onDestroy$: Subject<void> = new Subject();

  onSelectionChange(event: string) {
    this.selectedSort$.next(event);
  }

  constructor(private employeesService: EmployeesService) {}

  setEmployees(data: Employee[]) {
    this.employeesSubject.next(data);
  }

  ngOnInit() {
    this.employeesService
      .getEmployees()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.setEmployees(data);

        setTimeout(() => {
          this.isLoaded$.next(true);
        }, 500);
      });

    this.selectedSort$.pipe(takeUntil(this.onDestroy$)).subscribe((value) => {
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
      startWith([])
    );
  }

  sort(data: Employee[] | null, sort: string): Employee[] | null {
    let key = sort as keyof Employee;

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

  filter(data: Employee[] | null, filter: string) {
    if (data !== null) {
      if (filter === '') {
        return data;
      } else {
        return data.filter((item: Employee) =>
          item.employee_name.toLowerCase().includes(filter.toLowerCase())
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

    this.employees$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      const employee = data?.find(
        (x: Employee) => x.id.toString() === event.target.value
      );
      const vowels = 'aeiouAEIOU';

      if (!employee) {
        displayTxt = 'Invalid Employee Id';
      } else {
        if (vowels.indexOf(employee.employee_name[0]) !== -1) {
          displayTxt =
            'Yes,' +
            ' ' +
            employee.employee_name +
            ' ' +
            'starts with a vowel.';
        } else {
          displayTxt =
            'No,' +
            ' ' +
            employee.employee_name +
            ' ' +
            'does not start with a vowel.';
        }
      }
    });

    this.isVowelTxt$.next(displayTxt);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
