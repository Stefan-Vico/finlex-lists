import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '@services/employee.service';
import { MdbModalRef } from 'mdb-angular-ui-kit';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-employee-modal',
  templateUrl: './edit-employee-modal.component.html',
  styleUrls: ['./edit-employee-modal.component.scss'],
})
export class EditEmployeeModalComponent implements OnInit {
  employee_name!: string;
  employee_age!: number;
  employee_salary!: number;
  employee_id!: number;

  employeeForm!: FormGroup;

  loading: boolean = false;
  error: string = '';

  constructor(
    public modalRef: MdbModalRef<EditEmployeeModalComponent>,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      name: new FormControl(this.employee_name, {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      salary: new FormControl(this.employee_salary, {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      age: new FormControl(this.employee_age, {
        validators: Validators.required,
        updateOn: 'blur',
      }),
    });
  }

  close(): void {
    this.modalRef.close();
  }

  get name() {
    return this.employeeForm.get('name');
  }

  get salary() {
    return this.employeeForm.get('salary');
  }

  get age() {
    return this.employeeForm.get('age');
  }

  onSubmit() {
    this.error = '';
    this.loading = true;
    if (!this.employeeForm.valid) {
      return;
    }
    this.employeeService
      .editEmployee(
        this.employee_id,
        this.name?.value,
        this.salary?.value,
        this.age?.value
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.getAllEmployees();
        },
        (error) => {
          this.error = error.statusText;
          this.loading = false;
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
          this.error = error.statusText;
          this.loading = false;
        }
      );
  }
}
