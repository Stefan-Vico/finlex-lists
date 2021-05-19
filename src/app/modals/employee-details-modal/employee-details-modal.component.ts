import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit';
import { EmployeeService } from '@services/employee.service';
import { Employee } from '@models/employee';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-modal',
  templateUrl: './employee-details-modal.component.html',
})
export class EmployeeDetailsModalComponent implements OnInit {
  loading: boolean = false;
  employee!: Employee;
  employee_id!: number;
  error: string = ''

  constructor(
    public modalRef: MdbModalRef<EmployeeDetailsModalComponent>,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.getEmployeeDetails();
  }

  getEmployeeDetails() {
    this.loading = true;
    this.employeeService
      .getSingleEmployee(this.employee_id)
      .pipe(first())
      .subscribe((data) => {
        this.employee = data.data;
        this.loading = false;
      },
        error => {
          this.error = error.message
        });
  }

  close(): void {
    this.modalRef.close();
  }
}
