import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '@models/employee';
import { EmployeeDetailsModalComponent } from 'src/app/modals/employee-details-modal/employee-details-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit';
import { DeleteEmployeeModalComponent } from 'src/app/modals/delete-employee-modal/delete-employee-modal.component';
import { EditEmployeeModalComponent } from '../modals/edit-employee-modal/edit-employee-modal.component';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss'],
})
export class EmployeeCardComponent implements OnInit {
  modalRefDetails!: MdbModalRef<EmployeeDetailsModalComponent>;
  modalRefDelete!: MdbModalRef<DeleteEmployeeModalComponent>;
  modalRefEdit!: MdbModalRef<EditEmployeeModalComponent>;

  @Input()
  employeeData!: Employee;

  constructor(private modalService: MdbModalService) {}

  openModal() {
    this.modalRefDetails = this.modalService.open(
      EmployeeDetailsModalComponent,
      {
        data: {
          employee_id: this.employeeData.id,
        },
      }
    );
  }

  openModalDelete() {
    this.modalRefDelete = this.modalService.open(DeleteEmployeeModalComponent, {
      data: {
        employee_name: this.employeeData.employee_name,
        employee_id: this.employeeData.id,
      },
    });
  }

  openModalEdit() {
    this.modalRefDelete = this.modalService.open(EditEmployeeModalComponent, {
      data: {
        employee_name: this.employeeData.employee_name,
        employee_id: this.employeeData.id,
        employee_age: this.employeeData.employee_age,
        employee_salary: this.employeeData.employee_salary,
      },
    });
  }

  ngOnInit(): void {}
}
