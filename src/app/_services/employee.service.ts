import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Employee } from '@models/employee';
import { BehaviorSubject, Observable } from 'rxjs';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private currentEmployeesSubject: BehaviorSubject<Array<Employee>>;
  public currentEmployees: Observable<Array<Employee>>;

  private filteredEmployeesSubject: BehaviorSubject<Array<Employee>>;
  public filteredEmployees: Observable<Array<Employee>>;

  constructor(private http: HttpClient) {
    this.currentEmployeesSubject = new BehaviorSubject<Array<Employee>>([]);
    this.filteredEmployeesSubject = new BehaviorSubject<Array<Employee>>([]);
    this.currentEmployees = this.currentEmployeesSubject.asObservable();
    this.filteredEmployees = this.filteredEmployeesSubject.asObservable();
  }

  public get currentEmployeesValue(): Array<Employee> {
    return this.currentEmployeesSubject.value;
  }

  public set setCurrentEmployeesValue(value: Array<Employee>) {
    this.filteredEmployeesSubject.next(value);
    this.currentEmployeesSubject.next(value);
  }

  public set setFilteredEmployeesValue(value: Array<Employee>) {
    this.filteredEmployeesSubject.next(value);
  }

  getAllEmployees() {
    return this.http.get(`${environment.apiUrl}/api/v1/employees`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${environment.apiUrl}/api/v1/delete/${id}`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  addNewEmployee(name: string, salary: number, age: number) {
    let body = {
      name: name,
      salary: salary,
      age: age,
    };
    return this.http.post(`${environment.apiUrl}/api/v1/create`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  editEmployee(id: number, name: string, salary: number, age: number) {
    let body = {
      name: name,
      salary: salary,
      age: age,
    };
    return this.http
      .put(`${environment.apiUrl}/api/v1/update/${id}`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getSingleEmployee(id: number) {
    return this.http.get(`${environment.apiUrl}/api/v1/employee/${id}`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  filterEmployees(value: any) {
    const allEmployees = this.currentEmployeesSubject.getValue();
    const filteredEmployees = allEmployees.filter((element) => {
      if (
        element.employee_name.toLowerCase().indexOf(value) !== -1 ||
        element.employee_age.toString().toLowerCase().indexOf(value) !== -1 ||
        element.employee_salary.toString().toLowerCase().indexOf(value) !== -1
      ) {
        return element;
      }
    });
    this.setFilteredEmployeesValue = filteredEmployees;
  }
}
