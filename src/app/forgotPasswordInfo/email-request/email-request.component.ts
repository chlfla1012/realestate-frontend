import { StickyDirection } from '@angular/cdk/table';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/Model/userInfo';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';

@Component({
  selector: 'app-email-request',
  templateUrl: './email-request.component.html',
  styleUrls: ['./email-request.component.css']
})
export class EmailRequestComponent implements OnInit{
  @ViewChild('f') myForm!: NgForm;

  submitted:boolean = false;
  email:string;
  dbEmail:string;
  id:string;
  formSubmitted:boolean = false;
  errorMessage : string;
  userInfo: UserInfo = {
    id:"",
    firstName: "",
    lastName: "",
    firstNamekana: "",
    lastNamekana: "",
    gender:"",
    dateOfBirth:"",
    department:"",
    phone1: null,
    phone2:null,
    phone3:null,
    password: "",
    email: "",
    postalcode1:null,
    postalcode2:null,
    address:"",
    startDate: "",
    endDate: "",
    roleType: "",
    bankName:"",
    branch:"",
    accountType:"",
    accountNumber:"",
    accountName:"",
    createdDate: "",
    modifiedDate: "",
    companyId:{companyName:null},
    apportionment:"",

    logo:null
  }

  constructor(private http: HttpClient,private userAuthService:UserAuthService,
    private router:Router,private service:UserInfoService){}

  ngOnInit(): void {
    this.id = this.userAuthService.getId();
    console.log(this.id);
    this.service.getUserById(this.id).subscribe
      ((data: UserInfo) => {
        this.userInfo = data;
        this.dbEmail = this.userInfo.email;
        console.log(this.userInfo.email);
      });
  }
  submitForgotPasswordForm(form:NgForm){
    if (form.invalid) {
      // If the form is invalid, mark all form controls as touched
      Object.keys(form.controls).forEach((key) => {
        form.controls[key].markAsTouched();
      });
      console.log("Form Errors");
      return;
    }
    this.formSubmitted = true;
    this.email=form.value.email;
    this.service.getEmail(this.email).subscribe(
      (response: any) => {
    this.dbEmail=response.email;
    this.id = response.id;
    this.userAuthService.setId(this.id);
    console.log(this.email);
    if(this.email == this.dbEmail){
      this.router.navigate(['/reset-password']);
    }else {
      this.router.navigate(['/email-request']);
    }

  }, 
      (error) => {
        // alert('メールアドレスに誤りがあります。メールアドレスを確認した上再度にログインしてください。');
        this.errorMessage = "メールアドレスに誤りがあります。";
      }
    );
  }

back(){
  window.history.back();
}

  // isEmail(){
  //   if(this.email === this.userAuthService.getEmail())
  //   {
  //     return this.router.navigate(['/manager-list']);
  //   }else
  //   return false;
  // }

}
