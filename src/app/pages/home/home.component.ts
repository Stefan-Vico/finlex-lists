import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '@services/employee.service';
import { Employee } from '@models/employee';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CreateEmployeeModalComponent } from 'src/app/modals/create-employee-modal/create-employee-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allEmployees!: Array<Employee>;
  error: string = '';
  loading: boolean = true;
  subscriptions: Subscription[] = [];

  modalRefCreate!: MdbModalRef<CreateEmployeeModalComponent>;

  constructor(
    private employeeService: EmployeeService,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    this.subscriptions.push(
      this.employeeService.filteredEmployees.subscribe((data) => {
        this.allEmployees = data;
      })
    );
  }

  addNewUser() {
    this.modalRefCreate = this.modalService.open(CreateEmployeeModalComponent);
  }

  getEmployees() {
    this.loading = true;
    this.employeeService
      .getAllEmployees()
      .pipe(first())
      .subscribe(
        (data) => {
          this.employeeService.setCurrentEmployeesValue = data.data;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.error = error.statusText;
        }
      );
  }
}
