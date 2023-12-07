import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CompanyName } from 'src/app/Model/CompanyName';
import { FileHandle } from 'src/app/Model/FileHandle';
import { UserInfo } from 'src/app/Model/userInfo';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';

@Component({
  selector: 'app-ownercreate',
  templateUrl: './ownercreate.component.html',
  styleUrls: ['./ownercreate.component.css']
})
export class OwnercreateComponent {
  @ViewChild('f') myForm!: NgForm;

  data: any;
  errorMessage: string = '';
  hasError: boolean = false;
  dateOfBirth: string = '';
  isAbove20: boolean = false;
  hasErrorDOB: boolean = false;
  errorMessageDOB: string;
  // companyName: CompanyName;
  // logoId: number;
  // backendLogo: FileHandle = {
  //   file: null,
  //   url:null
  // };
  // logoImage: SafeUrl;
  companyId: number;
  logoId: number;
  backendCompany: CompanyName = {
    
    companyName: null
  };
  backendLogo: FileHandle = {
    file: null,
    url: null
  };
  logoImage: SafeUrl;
  userInfo: UserInfo = {
    id: null,
    firstName: "",
    lastName: "",
    firstNamekana: "",
    lastNamekana: "",
    gender: "",
    dateOfBirth: "",
    department: "",
    phone1: null,
    phone2: null,
    phone3: null,
    password: "",
    email: "",
    postalcode1: "",
    postalcode2: "",
    address: "",
    startDate: "",
    endDate: "",
    roleType: "",
    bankName: "",
    branch: "",
    accountType: "",
    accountNumber: "",
    accountName: "",
    createdDate: "",
    modifiedDate: "",
    companyId:{companyName:null},


    apportionment: "",
    logo: null
  }
  constructor(private router: Router, private service: UserInfoService, private userAuthService: UserAuthService) {
  }

  ngOnInit(): void {
    // this.getLoginUserLogo();
    this.getCurrentUserInfo();

  }
  getCurrentUserInfo() {

    //getting companyName and logo of current loggined manager

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

  /*getLoginUserLogo() {


    this.userAuthService.getCompanyName().subscribe(companyName => {
      this.companyName = companyName;
    });

    this.userAuthService.getLogoId().subscribe(logoId => {
      this.logoId = logoId;
    });

    this.userAuthService.getLogo().subscribe(backendLogo => {
      this.backendLogo = backendLogo;
    });
    console.log("Get Login data",this.companyName, this.logoId);

    
  }*/

  onSubmit(userForm: NgForm) {
    if (userForm.invalid) {
      // If the form is invalid, mark all form controls as touched
      Object.keys(userForm.controls).forEach((key) => {
        userForm.controls[key].markAsTouched();
      });
      console.log("Form Errors");
      return;
    }
    const formData = new FormData();

    this.userInfo.roleType = "owner";
    if (this.userAuthService.isCompanyNameFromBackend) {
      this.userInfo.companyId = {companyName: this.backendCompany.companyName };
      this.userInfo.companyId = {  companyName: this.backendCompany.companyName };
    }
    if (this.userAuthService.isLogoFromBackend) {
      // If the logo is from the backend, set the logo ID accordingly
      this.userInfo.logo = { file: this.backendLogo.file, url: this.backendLogo.url };
    }

    console.log("Owner Data", this.userInfo);
    formData.append(
      "owner",
      new Blob([JSON.stringify(this.userInfo)], { type: "application/json" })
);

  formData.append("logoId",this.logoId.toString());
  formData.append("companyId", this.companyId.toString());


    // this.service.addOwnerInfo(formData).subscribe(
    //      (response) => {
    //         console.log('Owner Data Added successfully', response);
    //        },
    //        (error) => {
    //        console.error('Error saving owner', error);
    //     }
    // );

    formData.append("logoId", this.logoId.toString());

    if (!this.hasError && !this.hasErrorDOB) {
      console.log(this.companyId);
      this.service.addOwnerInfo(formData).subscribe(
        (response) => {
          console.log('Owner Data Added successfully', response);
        },
        (error) => {
          console.error('Error saving owner', error);
        }
      );
      this.router.navigate(['/owner-list']);
      setTimeout(() => {
        window.location.reload();
      }, 20);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }


  /*onSubmit(ownerForm: NgForm) {
    if (ownerForm.invalid) {
      Object.keys(ownerForm.controls).forEach((key) => {
        ownerForm.controls[key].markAsTouched();
      });
      console.log("Form Errors");
      return;
    }
    const formData = new FormData();

    this.userInfo.roleType = "owner";
    this.userInfo.companyId = this.companyName;
    if (this.userAuthService.isLogoFromBackend) {
      this.userInfo.logo = { file: this.backendLogo.file, url: this.backendLogo.url };
    }
    
    console.log("Owner Data", this.userInfo);
    formData.append(
      "owner",
      new Blob([JSON.stringify(this.userInfo)], { type: "application/json" })
    );

    formData.append("logoId", this.logoId.toString());


    this.service.addOwnerInfo(formData).subscribe(
      (response) => {
        console.log('Owner Data Added successfully', response);
      },
      (error) => {
        console.error('Error saving owner', error);
      }
    );
 
    this.router.navigate(['/owner-list']);
    setTimeout(() => {
      window.location.reload();
    }, 20);
  }*/

  //   if (formData.invalid) {
  //     // If the form is invalid, mark all form controls as touched
  //     Object.keys(formData.controls).forEach((key) => {
  //       formData.controls[key].markAsTouched();
  //     });
  //     console.log("Form Errors");
  //     return;
  //   }
  //   this.userInfo = formData.value;
  //   this.userInfo.roleType ="owner"
  //   console.log(this.userInfo);
  //   this.service.addUserInfo(this.userInfo).subscribe((userInfo: any) => {
  //     console.log("Customer Data Added successfully")
  //   },

  //   (error) => {
  //     console.error('Error saving customer', error)
  //     console.log(error)
  //    }
  // );
  // this.router.navigate(['/']);



  keyPressAlpha(event: KeyboardEvent) {
    const inp = String.fromCharCode(event.keyCode);
    if (/[a-zA]/.test(inp)) {
      return true;
    }
    else {
      event.preventDefault();
      return false;
    }
  }
  keyPressNumeric(event: KeyboardEvent) {
    const inp = String.fromCharCode(event.keyCode);

    if (/[0-9]/.test(inp)) {
      return true;
    }
    event.preventDefault();
    return false;
  }
  keyPressCode(event: KeyboardEvent) {
    const inp = String.fromCharCode(event.keyCode);

    if (/^[ァ-ヶー　]+$/.test(inp)) {
      return true;
    }
    else {
      event.preventDefault();
      return false;
    }
  }
  keyPressKanjihira(event: KeyboardEvent) {
    const inp = String.fromCharCode(event.keyCode);

    if (/^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+$/.test(inp)) {
      return true;
    }
    else {
      event.preventDefault();
      return false;
    }
  }
  keyPressKana(event: KeyboardEvent) {
    const inp = String.fromCharCode(event.keyCode);

    if (/^[ァ-ヶー　]+$/.test(inp)) {
      return true;
    }
    else {
      event.preventDefault();
      return false;
    }
  }
  validateKatakana(inputElement: HTMLInputElement): void {
    const inputValue = inputElement.value;
    const value = inputElement.value;
    const regex = /^[ァ-ヶー　]+$/; // Regular expression for katakana characters

    if (!regex.test(inputValue)) {
      this.errorMessage = 'Please enter katakana characters only.';
    } else {
      this.errorMessage = ''; // Clear the error message if input is valid
    }
  }
  // onReset() {
  //   window.history.back();

  // }
  onCancel() {
    // Reset the form data
    // this.myForm.resetForm();
    this.router.navigate(['/owner-list']);

    // Navigate to the previous page
  }
  back(){
    window.history.back();
  }

  //for 利用開始日 利用終了日 check 

  //for 利用開始日 利用終了日 check 

  errorMessageDate: string;


  checkDateRange() {
    if (this.myForm.value.startDate && this.myForm.value.endDate) {
      if (this.myForm.value.endDate <= this.myForm.value.startDate) {
        this.errorMessageDate = '利用開始日以降の日付を選択してください。';
        this.hasError = true;
      } else {
        this.errorMessageDate = '';
        this.hasError = false;
      }
    }
  }
  validateBirthday() {
    if (this.userInfo.dateOfBirth) {
      const today: Date = new Date();
      const inputDate: Date = new Date(this.userInfo.dateOfBirth);
      const age: number = today.getFullYear() - inputDate.getFullYear();
      if (this.isAbove20 = age < 20) {
        console.log("Test above 20" + this.isAbove20);
        this.errorMessageDOB = '生年月日は 20 年以上前の日付を選択してください。';
        this.hasErrorDOB = true;
      }
      else {
        console.log("Test above 20 else " + this.isAbove20);
        this.isAbove20 = false;
        this.errorMessageDOB = '';
        this.hasErrorDOB = false;
      }

    }

  }
}
