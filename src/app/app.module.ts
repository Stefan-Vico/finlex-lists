import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MdbModule } from 'mdb-angular-ui-kit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './layout-components/navbar/navbar.component';
import { FooterComponent } from './layout-components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { EmployeeDetailsModalComponent } from './modals/employee-details-modal/employee-details-modal.component';
import { DeleteEmployeeModalComponent } from './modals/delete-employee-modal/delete-employee-modal.component';
import { CreateEmployeeModalComponent } from './modals/create-employee-modal/create-employee-modal.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { EditEmployeeModalComponent } from './modals/edit-employee-modal/edit-employee-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    EmployeeCardComponent,
    EmployeeDetailsModalComponent,
    DeleteEmployeeModalComponent,
    CreateEmployeeModalComponent,
    SpinnerComponent,
    EditEmployeeModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MdbModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
