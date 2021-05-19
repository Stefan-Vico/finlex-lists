import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit';
import { EmployeeService } from '@services/employee.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-delete-employee-modal',
  templateUrl: './delete-employee-modal.component.html',
  styleUrls: ['./delete-employee-modal.component.sass'],
})
export class DeleteEmployeeModalComponent implements OnInit {
  employee_name: string = '';
  employee_id!: number;
  loading: boolean = false;
  error: string = '';

  constructor(
    public modalRef: MdbModalRef<DeleteEmployeeModalComponent>,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {}

  close(): void {
    this.modalRef.close();
  }

  closeConfirm() {
    this.loading = true;
    this.employeeService
      .deleteEmployee(this.employee_id)
      .pipe(first())
      .subscribe(
        (data) => {
          this.getAllEmployees();
        },
        (error) => {
          this.error = error.message;
        }
      );
  }

  getAllEmployees() {
    this.employeeService
      .getAllEmployees()
      .pipe(first())
      .subscribe(
        (data) => {
          this.employeeService.setCurrentEmployeesValue = data.data;
          this.loading = false;
          this.modalRef.close('success');
        },
        (error) => {
          this.error = error.message;
          this.loading = false;
        }
      );
  }
}
