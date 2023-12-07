import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from 'src/app/Model/userInfo';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  @ViewChild('f') myForm!: NgForm;
  passwordType: string = 'password';
  errorMessage:string = '';
  errorMessage1:string = '';
  formSubmitted: boolean = false;

  userInfo: UserInfo = {
    id: null,
    firstName: "",
    lastName: "",
    firstNamekana: "",
    lastNamekana: "",
    gender: "",
    dateOfBirth: "",
    department: "",
    phone1: 0,
    phone2: 0,
    phone3: 0,
    password: "",
    email: "",
    postalcode1: "",
    postalcode2:"",
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
    apportionment:"",

    logo:null
  }

  id: string;
  password: string;
  confirmPassword: string;
  passwordMatch: boolean = false;

  constructor(private service: UserInfoService,
    private userAuthService: UserAuthService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.userAuthService.getId();
    this.service.getUserById(this.id).subscribe(data => {
      this.userInfo = data;
      console.log(this.userInfo.id)
    })

  }

  passwordSubmit(formData: any) {
    if (formData.invalid) {
      // If the form is invalid, mark all form controls as touched
      Object.keys(formData.controls).forEach((key) => {
        formData.controls[key].markAsTouched();
      });
      console.log("Form Errors");
      return;
    }
    this.formSubmitted = true;
    this.password = formData.value.password;
    this.confirmPassword = formData.value.confirmPassword;

    // if (this.password == this.confirmPassword) {
    //   this.userInfo.password = this.password;
    // }
    // else {
    //  this.errorMessage = "パスワードの確認に誤りがあります。";
    // }
    if (this.password == this.confirmPassword) {
      this.userInfo.password = this.password;
      this.service.updateUserInfo(this.id, this.userInfo).subscribe(
        (response: UserInfo) => {
          alert("パスワードを正常に変更できました。")
          this.router.navigate(['/login']);
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          // this.errorMessage= "パスワードを8文字以上入力してください。";
          console.log("Error");
        }
      );
    }
    else {
      //  alert("パスワードの確認に誤りがあります。");
      this.errorMessage= "パスワードの確認に誤りがあります。";
      this.errorMessage1 = "パスワードを8文字以上入力してください。";
      }
  }

  checkPasswordMatch() {
    const newPassword = this.myForm.value.password;
    const confirmPassword = this.myForm.value.confirmPassword;
    console.log(newPassword, confirmPassword);
    this.passwordMatch = newPassword === confirmPassword;
    console.log(this.passwordMatch);
  }

  onReset() {
    window.history.back();

  }

}
