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

const routes: Routes = [

  //eiphyu
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  // { path: '**', component: PageNotFoundComponent },


  { path: 'customer-create', component: CustomerCreateComponent },
  {path: 'customer-list',component:CustomerListComponent},
  { path: 'customer-update/:id', component: CustomerEditComponent },
  { path: 'customer-details/:id', component: CustomerDetailsComponent },


{path: 'property-list',component:PropertyListComponent},
  { path: 'property-create', component: PropertycreateComponent },
  { path: 'property-details/:id', component: PropertydetailComponent },
  { path: 'property-update/:id', component: PropertyeditComponent },

 
  { path: 'income-check',component:IncomeCheckMainComponent}, 

  
  //wathone
  
{path: 'contract-list',component:ContractListComponent},
{ path: 'contract-create', component: ContractCreateComponent },
{ path: 'contract-details/:id', component: ContractDetailsComponent },
{ path: 'contract-update/:id', component: ContractEditComponent },


//swezin
{ path: 'login', component: LoginComponent },
  { path: 'header', component: HeaderComponent },

  { path: 'manager-create', component: ManagercreateComponent},
  { path: 'manager-list', component: ManagerListComponent},
  { path: 'manager-detail/:id', component: ManagerdetailsComponent },
  { path: 'manager-edit/:id', component: ManagereditComponent },

  { path: 'user-create', component: UsercreateComponent},
  { path: 'user-list', component: UserListComponent},
  { path: 'user-detail/:id', component: UserdetailsComponent},
  { path: 'user-edit/:id', component: UsereditComponent },
  
  { path: 'owner-create', component: OwnercreateComponent},
  { path: 'owner-list', component: OwnerListComponent },
  { path: 'owner-details/:id', component: OwnerdetailComponent},
  { path: 'owner-edit/:id', component: OwnereditComponent },
  
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'profile-detail/:id', component: ProfileDetailsComponent },
  { path: 'profile-edit/:id', component: ProfileEditComponent },
  { path: 'email-request', component: EmailRequestComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'owner-main',component:OwnerMainComponent},
  { path: 'invoice-create',component:InvoiceCreateComponent},
  { path: 'invoice-list',component:InvoiceListComponent},
  { path: 'invoice-detail/:id', component: InvoiceDetailComponent },
  { path: 'invoice-edit/:id', component: InvoiceEditComponent },

// wathone 

  //chuthinzar, htoilu
 { path: 'bankformat-create', component: BankFormatCreateComponent },
 {path: 'bankformat-list',component:BankFormatListComponent},
 { path: 'bankformat-edit/:id', component: BankFormatEditComponent },
 { path: 'bankformat-detail/:id', component: BankFormatDetailComponent },

 { path: 'income-list', component: IncomeListComponent },
 { path: 'income-check/:bankName',  component: IncomeCheckMainComponent},
 { path: 'income-check',component:IncomeCheckMainComponent}, 


 { path: 'report-create', component: PmreportCreateComponent },
 { path: 'report-list', component: PmreportListComponent },
 { path: 'report-details/:id', component: PmreportDetailsComponent },
 { path: 'report-edit/:id', component: PmreportEditComponent },
 { path: 'report-create-pdf', component: PmreportCreatePdfComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
