import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/Model/userInfo';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  @ViewChild('f') myForm!: NgForm;


  constructor(private router: Router, private userService: UserInfoService,
    private userAuthService: UserAuthService) {

  }
  passwordMatch: boolean = false;
  errorMessage: string = '';
  realPassword: String;
  oldPassword: String;
  newPassword: String;
  confirmPassword: String;
  id: string;
  formSubmitted: boolean = false;

  userInfo: UserInfo = {
    id: "",
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
    postalcode1: null,
    postalcode2: null,
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
    companyId: { companyName: null },
    apportionment:"",

    logo: null
  }
  ngOnInit() {
    //this.roleType = this.userAuthService.getRoleType();
    this.id = this.userAuthService.getId();
    console.log(this.userAuthService.getId());
    this.userService.getUserById(this.id).subscribe
      ((data: UserInfo) => {
        this.userInfo = data;
        this.realPassword = this.userInfo.password;
        console.log(this.userInfo.password);
      });
  }
  checkPasswordMatch() {
    const newPassword = this.myForm.value.newPassword;
    const confirmPassword = this.myForm.value.confirmPassword;
    console.log(newPassword, confirmPassword);
    this.passwordMatch = newPassword === confirmPassword;
    return this.passwordMatch;
    console.log(this.passwordMatch);
  }

  onSubmit(changeForm: NgForm) {
    if (changeForm.invalid) {
      // If the form is invalid, mark all form controls as touched
      Object.keys(changeForm.controls).forEach((key) => {
        changeForm.controls[key].markAsTouched();
      });
      console.log("Form Errors");
      return;
    }
    // this.formSubmitted = true;
    if ((this.realPassword === this.myForm.value.oldPassword) && this.checkPasswordMatch()) {
      this.userInfo.password = this.myForm.value.newPassword;
      this.confirmPassword = this.myForm.value.confirmPassword;
      this.userService.updateUserInfo(this.id, this.userInfo).subscribe(
        (response: UserInfo) => {
          console.log(response);
          alert("パスワードを正常に変更できました。");
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          alert("Something Wrong!!!");
        }
      );
      this.router.navigate(['/profile-details', this.id]);
      window.history.back();
    }
    else {
      // this.errorMessage ="パスワードが一致しません。";
      this.formSubmitted = true;
      this.errorMessage = 'パスワードが一致しません。';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);

    }

  }
  onProfile(id: string) {
    id = this.userAuthService.getId();
    this.userService.getUserById(this.id).subscribe
      ((data: UserInfo) => {
        this.userInfo = data;
        this.realPassword = this.userInfo.password;
        console.log(this.userInfo.password);
      });
    this.router.navigate(['/profile-detail', id]);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 100);

  }
  onReset() {
    window.history.back();

  }

}
