import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/Model/Customer';
import { CustomerService } from 'src/app/Service/Customer/CustomerService';
import { CompanyName } from 'src/app/Model/CompanyName';
import { FileHandle } from 'src/app/Model/FileHandle';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';
import { UserInfo } from 'src/app/Model/userInfo';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent {
  @ViewChild('f') myForm!: NgForm;
  companyId: number;
  logoId: number;
  searchName: string;
  backendCompany: CompanyName = {
      companyName: null
  };
  backendLogo: FileHandle = {
    file: null,
    url: null
  };
  logoImage: SafeUrl;

  customer: Customer = {
    id: null,
    type: "",
    companyName: "",
    personFirstName: "",
    personLastName: "",
    personFirstKana: "",
    personLastKana: "",
    department: "",
    mobileFirst: "",
    mobileSecond: "",
    mobileThird: "",
    fax1: "",
    fax2: "",
    fax3: "",
    mailAdd: "",
    postalFirst: "",
    postalSecond: "",
    address: "",
    createdDate: "",
    createdName: "",
    modifiedDate: "",
    updatedName: "",
    remark: "",
    companyId:{companyName:null},
    logo: null,
    personFullName:"",
    personFullNameKana:""
  }
  constructor(private router: Router, private service: CustomerService,
    private userService: UserInfoService,
    private userAuthService: UserAuthService) { }
  ngOnInit(): void {
    this.getCurrentUserInfo();
  }
  getCurrentUserInfo() {
    this.userAuthService.getCompanyId().subscribe(companyId => {
      this.companyId = companyId;
    });

    this.userAuthService.getCompanyName().subscribe(backendCompany => {
      this.backendCompany = backendCompany;
    });
    this.userAuthService.getLogoId().subscribe(logoId => {
      this.logoId = logoId;
    });

    this.userAuthService.getLogo().subscribe(backendLogo => {
      this.backendLogo = backendLogo;
    });
    console.log("Get Login data", this.companyId, this.logoId);
  }
  url: String;
  onSelectFile(event) {
    // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.url = (event.target.result as String);
      };
    }
  }
  onSubmit(customerForm: NgForm) {
    console.log("Testing from onsubmit event")
    if (customerForm.invalid) {
      Object.keys(customerForm.controls).forEach((key) => {
        customerForm.controls[key].markAsTouched();
      });
      console.log("Form Errors");
      return;
    }
    const formData = new FormData();

    if (this.userAuthService.isCompanyNameFromBackend) {
      this.customer.companyId = {companyName: this.backendCompany.companyName };
      this.customer.companyId = {  companyName: this.backendCompany.companyName };
    }
    if (this.userAuthService.isLogoFromBackend) {
      // If the logo is from the backend, set the logo ID accordingly
      this.customer.logo = { file: this.backendLogo.file, url: this.backendLogo.url };
    }

    console.log("Customer Data", this.customer);
    formData.append(
      "customer",
      new Blob([JSON.stringify(this.customer)], { type: "application/json" })
    );

    formData.append("logoId", this.logoId.toString());
    formData.append("companyId", this.companyId.toString());
     this.service.addCustomer(formData).subscribe(
      (response) => {
      // window.alert('Customer Created successfully');
      console.log('Customer Data Added successfully', response);
    },
      (error) => {
        console.error('Error saving customer', error);
      }
    );

    this.router.navigate(['/customer-list']);
      setTimeout(() => {
        window.location.reload();
      }, 100);

  }
   keyPressNumeric(event: KeyboardEvent) {
    const inp = String.fromCharCode(event.keyCode);

    if (/[0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  navigateToPreivousPage() {
    window.history.back();
  }
  onCancel() {
    this.router.navigate(['/customer-list']);
  }
}
