import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

import { PropertycreateComponent } from './propertyInfo/propertycreate/propertycreate.component';
import { PropertydetailComponent } from './propertyInfo/property-detail/propertydetail.component';
import { PropertyeditComponent } from './propertyInfo/propertyedit/propertyedit.component';
import { PropertyListComponent } from './propertyInfo/property-list/property-list.component';

import { CustomerCreateComponent } from './customer/customer-create/customer-create.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

import { HeaderComponent } from './header/header.component';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

import { ProfileDetailsComponent } from './profileInfo/profile-details/profile-details.component';
import { ProfileEditComponent } from './profileInfo/profile-edit/profile-edit.component';
import { ProfileComponent } from './profileInfo/profile/profile.component';
import { UsercreateComponent } from './userInfo/usercreate/usercreate.component';
import { UsereditComponent } from './userInfo/useredit/useredit.component';

import { UserdetailsComponent } from './userInfo/userdetails/userdetails.component';
import { OwnercreateComponent } from './ownerInfo/ownercreate/ownercreate.component';
import { OwnereditComponent } from './ownerInfo/owneredit/owneredit.component';
import { OwnerdetailComponent } from './ownerInfo/ownerdetail/ownerdetail.component';
import { OwnerListComponent } from './ownerInfo/owner-list/owner-list.component';
import { ManagercreateComponent } from './managerInfo/managercreate/managercreate.component';
import { ManagereditComponent } from './managerInfo/manageredit/manageredit.component';
import { ManagerdetailsComponent } from './managerInfo/managerdetails/managerdetails.component';
import { ManagerListComponent } from './managerInfo/manager-list/manager-list.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangePasswordComponent } from './profileInfo/change-password/change-password.component';
import { EmailRequestComponent } from './forgotPasswordInfo/email-request/email-request.component';
import { ResetPasswordComponent } from './forgotPasswordInfo/reset-password/reset-password.component';
import { DatePipe } from '@angular/common';
import { UserListComponent } from './userInfo/user-list/user-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ContractCreateComponent } from './contractInfo/contract-create/contract-create.component';
import { ContractListComponent } from './contractInfo/contract-list/contract-list.component';
import { ContractEditComponent } from './contractInfo/contract-edit/contract-edit.component';
import { ContractDetailsComponent } from './contractInfo/contract-details/contract-details.component';
import { AlertDialogComponent } from './contractInfo/contract-create/AlertDialogComponent';
import { OwnerMainComponent } from './ownerInfo/owner-main/owner-main.component';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';

import { InvoiceCreateComponent } from './InvoiceInfo/invoice-create/invoice-create.component';
import { InvoiceEditComponent } from './InvoiceInfo/invoice-edit/invoice-edit.component';
import { InvoiceListComponent } from './InvoiceInfo/invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './InvoiceInfo/invoice-detail/invoice-detail.component';

import { BankFormatCreateComponent } from './bankFormat/bankformat-create/bankformat-create.component';
import { BankFormatListComponent } from './bankFormat/bankformat-list/bankformat-list.component';
import { BankFormatDetailComponent } from './bankFormat/bankformat-detail/bankformat-detail.component';
import { BankFormatEditComponent } from './bankFormat/bankformat-edit/bankformat-edit.component';

import { IncomeCheckMainComponent } from './PaymentCheck/income-check-main/income-check-main.component';
import { IncomeListComponent } from './PaymentCheck/income-list/income-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

import { PmreportCreateComponent } from './PMreport/pmreport-create/pmreport-create.component';
import { PmreportListComponent } from './PMreport/pmreport-list/pmreport-list.component';
import { PmreportDetailsComponent } from './PMreport/pmreport-details/pmreport-details.component';
import { PmreportEditComponent } from './PMreport/pmreport-edit/pmreport-edit.component';
import { PmreportCreatePdfComponent } from './PMreport/pmreport-create-pdf/pmreport-create-pdf.component';



@NgModule({
  declarations: [
    AppComponent,
    PropertycreateComponent,
    PropertyListComponent,
    PropertydetailComponent,
    PropertyeditComponent,
    DeleteConfirmDialogComponent,

    CustomerCreateComponent,
    CustomerListComponent,
    CustomerEditComponent,
    CustomerDetailsComponent,

    PageNotFoundComponent,

    HeaderComponent,

    ProfileDetailsComponent,
    ProfileEditComponent,
    ProfileComponent,

    UsercreateComponent,
    UsereditComponent,
    UserdetailsComponent,
    UserListComponent,
    OwnercreateComponent,
    OwnereditComponent,
    OwnerdetailComponent,
    OwnerListComponent,

    ManagercreateComponent,
    ManagereditComponent,
    ManagerdetailsComponent,
    ManagerListComponent,

    LoginComponent,
    ChangePasswordComponent,
    EmailRequestComponent,
    ResetPasswordComponent,
    ContractCreateComponent,
    ContractListComponent,
    ContractEditComponent,
    ContractDetailsComponent,

    AlertDialogComponent,
    OwnerMainComponent,
         
    InvoiceCreateComponent,
    InvoiceEditComponent,
    InvoiceListComponent,
    InvoiceDetailComponent,

    IncomeCheckMainComponent,
    IncomeListComponent,
    BankFormatCreateComponent,
    BankFormatListComponent,
    BankFormatDetailComponent,
    BankFormatEditComponent,
    ErrorDialogComponent,

    PmreportCreateComponent,
    PmreportListComponent,
    PmreportEditComponent,
    PmreportDetailsComponent,
    PmreportCreatePdfComponent 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule,
    HttpClientModule,
    DataTablesModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatNativeDateModule,

    MatDatepickerModule,
    MatDialogModule,
    MatCheckboxModule,  
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
