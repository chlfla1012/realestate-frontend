import {  ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from 'src/app/Model/userInfo';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent {
  @ViewChild('f') myForm!: NgForm;
  userInfo: UserInfo = {
    id:null,
    firstName: "",
    lastName: "",
    firstNamekana: "",
    lastNamekana: "",
    gender:"",
    dateOfBirth:"",
    department:"",
    phone1: 0,
    phone2:0,
    phone3:0,
    password: "",
    email: "",
    postalcode1:"",
    postalcode2:"",
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


    // customer: null
  }
    id:string;
  data:any;
  constructor(private service: UserInfoService, 
    private route: ActivatedRoute, private router : Router) { }

 
  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];

    this.service.getUserById(this.id).subscribe(data=>{
      this.userInfo = data
      console.log(this.userInfo.id)
    })
  
  
}
  onSubmit(formData:NgForm){
    if (formData.invalid) {
      // If the form is invalid, mark all form controls as touched
      Object.keys(formData.controls).forEach((key) => {
        formData.controls[key].markAsTouched();
      });
      console.log("Form Errors");
      return;
    }
    // this.userInfo = formData.value
    console.log("submit" + this.userInfo.id);

  
  // this.customer.item = this.formData.value.item;
  // this.customer.companyName = this.formData.value.companyName;
  // this.customer.nameKana = this.formData.value.nameKana;
  // this.customer.personName = this.formData.value.personName;
  // this.customer.mobileFirst = this.formData.value.mobileFirst;
  // this.customer.mobileSecond = this.formData.value.mobileSecond;
  // this.customer.mobileThird = this.formData.value.mobileThird;
  // this.customer.mailAdd = this.formData.value.mailAdd;
  // this.customer.postalFirst = this.formData.value.postalFirst;
  // this.customer.postalSecond = this.formData.value.postalSecond;
  // this.customer.memo = this.formData.value.memo;
  if (!this.hasError && !this.hasErrorDOB) {
    // console.log(this.hasError);
    this.service.updateUserInfo(this.id, this.userInfo).subscribe(
    (response: UserInfo) => {
      console.log(response);
      // this.router.navigate(['/manager-list']);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 100);
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    }
  );
  window.history.back();
  setTimeout(()=>{
      window.location.reload();
    }, 100);

  }   
   

  // window.history.back();
  // setTimeout(()=>{
  //     window.location.reload();
  //   }, 100);
  
  }


  back(){
    window.history.back();
  }
  
  keyPressNumeric(event:KeyboardEvent){
    const inp=String.fromCharCode(event.keyCode);

    if(/[0-9]/.test(inp))
    {
      return true;
    }
    event.preventDefault();
    return false;
  }
  // getCustomerById(getId:number){
  //   this.service.getCustomerById(getId).subscribe(data=>{
  //     this.customer = data
  //     console.log(this.customer);
  //   });
  // } 
  onReset() {
    window.history.back();

  }

  dateOfBirth:string ='';
  isAbove20:boolean = true;
  hasErrorDOB: boolean = false;
  errorMessageDOB: string;
  
  validateBirthday(){
    if (this.userInfo.dateOfBirth){
      const today: Date = new Date();
      const inputDate: Date = new Date(this.userInfo.dateOfBirth);
      const age: number = today.getFullYear() - inputDate.getFullYear();
      if(this.isAbove20 = age < 20){
        
        this.errorMessageDOB = '生年月日は 20 年以上前の日付を選択してください。';   
        this.hasErrorDOB = true;
      }  
      else{
        
        this.isAbove20=false;
        this.errorMessageDOB = '';
        this.hasErrorDOB = false;
      } 
      
    }
    
  }

  

  errorMessageDate: string;
  hasError: boolean = false;
  checkDateRange() {
      if (this.myForm.value.startDate && this.myForm.value.endDate) {
        if (this.myForm.value.endDate< this.myForm.value.startDate) {
        this.errorMessageDate = '利用開始日以降の日付を選択してください。';
       } else {
        this.errorMessageDate = '';
      }
    }
  }
  
}

