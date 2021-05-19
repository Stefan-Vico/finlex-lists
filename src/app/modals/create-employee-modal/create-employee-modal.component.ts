import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '@services/employee.service';
import { MdbModalRef } from 'mdb-angular-ui-kit';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-employee-modal',
  templateUrl: './create-employee-modal.component.html',
  styleUrls: ['./create-employee-modal.component.sass'],
})
export class CreateEmployeeModalComponent implements OnInit {
  employeeForm!: FormGroup;

  loading: boolean = false;
  error: string = '';

  constructor(
    public modalRef: MdbModalRef<CreateEmployeeModalComponent>,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      name: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      salary: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur',
      }),
      age: new FormControl('', {
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
      .addNewEmployee(this.name?.value, this.salary?.value, this.age?.value)
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
