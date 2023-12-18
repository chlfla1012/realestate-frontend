import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CustomerCreateComponent } from './customer/customer-create/customer-create.component';
import { PropertycreateComponent } from './propertyInfo/propertycreate/propertycreate.component';
import { ManagercreateComponent } from './managerInfo/managercreate/managercreate.component';
// import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { EmailRequestComponent } from './forgotPasswordInfo/email-request/email-request.component';
import { ResetPasswordComponent } from './forgotPasswordInfo/reset-password/reset-password.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ManagerListComponent } from './managerInfo/manager-list/manager-list.component';
import { ManagerdetailsComponent } from './managerInfo/managerdetails/managerdetails.component';
import { ManagereditComponent } from './managerInfo/manageredit/manageredit.component';
import { OwnerListComponent } from './ownerInfo/owner-list/owner-list.component';
import { OwnercreateComponent } from './ownerInfo/ownercreate/ownercreate.component';
import { OwnerdetailComponent } from './ownerInfo/ownerdetail/ownerdetail.component';
import { OwnereditComponent } from './ownerInfo/owneredit/owneredit.component';
import { ChangePasswordComponent } from './profileInfo/change-password/change-password.component';
import { ProfileComponent } from './profileInfo/profile/profile.component';
import { PropertydetailComponent } from './propertyInfo/property-detail/propertydetail.component';
import { PropertyListComponent } from './propertyInfo/property-list/property-list.component';
import { PropertyeditComponent } from './propertyInfo/propertyedit/propertyedit.component';
import { UserListComponent } from './userInfo/user-list/user-list.component';
import { UsercreateComponent } from './userInfo/usercreate/usercreate.component';
import { UserdetailsComponent } from './userInfo/userdetails/userdetails.component';
import { UsereditComponent } from './userInfo/useredit/useredit.component';
import { ProfileDetailsComponent } from './profileInfo/profile-details/profile-details.component';
import { ProfileEditComponent } from './profileInfo/profile-edit/profile-edit.component';
import { ContractListComponent } from './contractInfo/contract-list/contract-list.component';
import { ContractCreateComponent } from './contractInfo/contract-create/contract-create.component';
import { ContractDetailsComponent } from './contractInfo/contract-details/contract-details.component';
import { ContractEditComponent } from './contractInfo/contract-edit/contract-edit.component';
import { OwnerMainComponent } from './ownerInfo/owner-main/owner-main.component';
import { IncomeCheckMainComponent } from './PaymentCheck/income-check-main/income-check-main.component';
import { BankFormatCreateComponent } from './bankFormat/bankformat-create/bankformat-create.component';
import { BankFormatListComponent } from './bankFormat/bankformat-list/bankformat-list.component';
import { BankFormatDetailComponent } from './bankFormat/bankformat-detail/bankformat-detail.component';
import { BankFormatEditComponent } from './bankFormat/bankformat-edit/bankformat-edit.component';
import { IncomeListComponent } from './PaymentCheck/income-list/income-list.component';
import { PmreportCreateComponent } from './PMreport/pmreport-create/pmreport-create.component';
import { PmreportListComponent } from './PMreport/pmreport-list/pmreport-list.component';
import { PmreportDetailsComponent } from './PMreport/pmreport-details/pmreport-details.component';
import { PmreportEditComponent } from './PMreport/pmreport-edit/pmreport-edit.component';
import { PmreportCreatePdfComponent } from './PMreport/pmreport-create-pdf/pmreport-create-pdf.component';
import { InvoiceCreateComponent } from './InvoiceInfo/invoice-create/invoice-create.component';
import { InvoiceEditComponent } from './InvoiceInfo/invoice-edit/invoice-edit.component';
import { InvoiceListComponent } from './InvoiceInfo/invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './InvoiceInfo/invoice-detail/invoice-detail.component';
import { PdfCollectionComponent } from './InvoiceInfo/pdf-collection/pdf-collection.component';
import { PdfDownloadComponent } from './InvoiceInfo/pdf-download/pdf-download.component';
import { PmreportUploadComponent } from './PMreport/pmreport-upload/pmreport-upload.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

  //eiphyu
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  // { path: '**', component: PageNotFoundComponent },


  { path: 'customer-create', component: CustomerCreateComponent, canActivate: [AuthGuard] },
  {path: 'customer-list',component:CustomerListComponent, canActivate: [AuthGuard]},
  { path: 'customer-update/:id', component: CustomerEditComponent, canActivate: [AuthGuard] },
  { path: 'customer-details/:id', component: CustomerDetailsComponent, canActivate: [AuthGuard] },


  {path: 'property-list',component:PropertyListComponent, canActivate: [AuthGuard]},
  { path: 'property-create', component: PropertycreateComponent, canActivate: [AuthGuard] },
  { path: 'property-details/:id', component: PropertydetailComponent, canActivate: [AuthGuard] },
  { path: 'property-update/:id', component: PropertyeditComponent, canActivate: [AuthGuard] }, 
  { path: 'income-check',component:IncomeCheckMainComponent, canActivate: [AuthGuard]}, 
  
  //wathone  
{path: 'contract-list',component:ContractListComponent, canActivate: [AuthGuard]},
{ path: 'contract-create', component: ContractCreateComponent, canActivate: [AuthGuard] },
{ path: 'contract-details/:id', component: ContractDetailsComponent, canActivate: [AuthGuard] },
{ path: 'contract-update/:id', component: ContractEditComponent, canActivate: [AuthGuard] },

//swezin
  { path: 'login', component: LoginComponent },
  { path: 'header', component: HeaderComponent, canActivate: [AuthGuard] },

  { path: 'manager-create', component: ManagercreateComponent, canActivate: [AuthGuard]},
  { path: 'manager-list', component: ManagerListComponent, canActivate: [AuthGuard]},
  { path: 'manager-detail/:id', component: ManagerdetailsComponent, canActivate: [AuthGuard] },
  { path: 'manager-edit/:id', component: ManagereditComponent, canActivate: [AuthGuard] },

  { path: 'user-create', component: UsercreateComponent, canActivate: [AuthGuard]},
  { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard]},
  { path: 'user-detail/:id', component: UserdetailsComponent, canActivate: [AuthGuard]},
  { path: 'user-edit/:id', component: UsereditComponent, canActivate: [AuthGuard] },
  
  { path: 'owner-create', component: OwnercreateComponent, canActivate: [AuthGuard]},
  { path: 'owner-list', component: OwnerListComponent, canActivate: [AuthGuard] },
  { path: 'owner-details/:id', component: OwnerdetailComponent, canActivate: [AuthGuard]},
  { path: 'owner-edit/:id', component: OwnereditComponent, canActivate: [AuthGuard] },
  
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'profile-detail/:id', component: ProfileDetailsComponent, canActivate: [AuthGuard] },
  { path: 'profile-edit/:id', component: ProfileEditComponent, canActivate: [AuthGuard] },
  { path: 'email-request', component: EmailRequestComponent, canActivate: [AuthGuard] },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthGuard] },
  { path: 'owner-main',component:OwnerMainComponent, canActivate: [AuthGuard]},
  { path: 'invoice-create',component:InvoiceCreateComponent, canActivate: [AuthGuard]},
  { path: 'invoice-list',component:InvoiceListComponent, canActivate: [AuthGuard]},
  { path: 'invoice-detail/:id', component: InvoiceDetailComponent, canActivate: [AuthGuard] },
  { path: 'invoice-edit/:id', component: InvoiceEditComponent, canActivate: [AuthGuard] },
  { path: 'pdf-collection',component:PdfCollectionComponent, canActivate: [AuthGuard]},
  { path: 'pdf-download',component:PdfDownloadComponent, canActivate: [AuthGuard]},

// wathone 

  //chuthinzar, htoilu
 { path: 'bankformat-create', component: BankFormatCreateComponent, canActivate: [AuthGuard] },
 {path: 'bankformat-list',component:BankFormatListComponent, canActivate: [AuthGuard]},
 { path: 'bankformat-edit/:id', component: BankFormatEditComponent, canActivate: [AuthGuard] },
 { path: 'bankformat-detail/:id', component: BankFormatDetailComponent, canActivate: [AuthGuard] },

 { path: 'income-list', component: IncomeListComponent, canActivate: [AuthGuard] },
 { path: 'income-check/:bankName',  component: IncomeCheckMainComponent, canActivate: [AuthGuard]},
 { path: 'income-check',component:IncomeCheckMainComponent, canActivate: [AuthGuard]}, 


 { path: 'report-create', component: PmreportCreateComponent, canActivate: [AuthGuard] },
 { path: 'report-list', component: PmreportListComponent, canActivate: [AuthGuard]},
 { path: 'report-details/:id', component: PmreportDetailsComponent, canActivate: [AuthGuard] },
 { path: 'report-edit/:id', component: PmreportEditComponent, canActivate: [AuthGuard] },
 { path: 'report-create-pdf/:id', component: PmreportCreatePdfComponent, canActivate: [AuthGuard] },
 { path: 'report-upload', component: PmreportUploadComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
