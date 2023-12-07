import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from 'src/app/Model/userInfo';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-owneredit',
  templateUrl: './owneredit.component.html',
  styleUrls: ['./owneredit.component.css']
})
export class OwnereditComponent implements OnInit {
  errorMessage: string = '';
  hasError: boolean = false;
  dateOfBirth:string ='';
  isAbove20:boolean = false;
  hasErrorDOB: boolean = false;
  errorMessageDOB: string;

  @ViewChild('f') infoForm: NgForm;
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


    // customer: null
  }
  id: string;
  data: any;
  constructor(private service: UserInfoService,
    private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.service.getUserById(this.id).subscribe(data => {
      this.userInfo = data
      console.log(this.userInfo.id)
    })


  }
  onSubmit(formData: NgForm) {
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
      this.service.updateUserInfo(this.id, this.userInfo).subscribe(
        (response: UserInfo) => {
          console.log(response);

          // propertyForm.reset();

          // this.router.navigate(['/property-list']);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 100);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
      window.history.back();
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }

  back() {
    window.history.back();
  }

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
  // getCustomerById(getId:number){
  //   this.service.getCustomerById(getId).subscribe(data=>{
  //     this.customer = data
  //     console.log(this.customer);
  //   });
  // } 
  onReset() {
    window.history.back();

  }
   //for 利用開始日 利用終了日 check 

   errorMessageDate: string;

   checkDateRange() {
     if (this.infoForm.value.startDate && this.infoForm.value.endDate) {
       if (this.infoForm.value.endDate <= this.infoForm.value.startDate) {
         this.errorMessageDate = '利用開始日以降の日付を選択してください。';
         this.hasError = true;
       } else {
         this.errorMessageDate = '';
         this.hasError = false;
       }
     }
   }
   validateBirthday(){
     if (this.userInfo.dateOfBirth){
       const today: Date = new Date();
       const inputDate: Date = new Date(this.userInfo.dateOfBirth);
       const age: number = today.getFullYear() - inputDate.getFullYear();
       if(this.isAbove20 = age < 20){
         console.log("Test above 20"+this.isAbove20);
         this.errorMessageDOB = '生年月日は 20 年以上前の日付を選択してください。';   
         this.hasErrorDOB = true;
       }  
       else{
         console.log("Test above 20 else "+this.isAbove20);
         this.isAbove20=false;
         this.errorMessageDOB = '';
         this.hasErrorDOB = false;
       } 
       
     }
     
   }

}
