import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '@services/employee.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  searchValue = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {}

  filter() {
    this.employeeService.filterEmployees(this.searchValue);
  }
}
