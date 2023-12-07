//import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FileHandle } from 'src/app/Model/FileHandle';
import { UserInfo } from 'src/app/Model/userInfo';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';
import { Component, ViewChild } from '@angular/core';


@Component({
  selector: 'app-managercreate',
  templateUrl: './managercreate.component.html',
  styleUrls: ['./managercreate.component.css']
})
export class ManagercreateComponent {
  data:any;
  errorMessage: string = '';
  logoSizeError: string = '';
  url: SafeUrl;
  hasError: boolean = false;
  dateOfBirth:string ='';
  isAbove20:boolean = false;
  hasErrorDOB: boolean = false;
  errorMessageDOB: string;
  errorMessageDate: string;

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
    phone1: null,
    phone2:null,
    phone3:null,
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
    apportionment:"",
    companyId:null,

    logo:null


    // customer: null
  }
 

  constructor(private router: Router, private service: UserInfoService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void { }
  

  onSubmit(managerForm: NgForm) {
    if (managerForm.invalid) {
      // If the form is invalid, mark all form controls as touched
      Object.keys(managerForm.controls).forEach((key) => {
        managerForm.controls[key].markAsTouched();
      });
      console.log("Form Errors");
      return;
    }
    // this.userInfo = managerForm.value;

    const formData = new FormData();
    
    this.userInfo.roleType = "manager"
    console.log("manager data", this.userInfo.companyId);
  
  
    formData.append(
      "manager",
      new Blob([JSON.stringify(this.userInfo)], { type: "application/json" })
    );
      
    formData.append(
      "companyId",
      new Blob([JSON.stringify(this.userInfo.companyId)], { type: "application/json" })
    );
    
    if (this.userInfo.logo && this.userInfo.logo.file) {

      formData.append('logo', this.userInfo.logo.file, this.userInfo.logo.file.name); // Append the 'logo' File object with filename

    }
    else if (!this.userInfo.logo || !this.userInfo.logo.file) {
      formData.append("logo", new Blob(), null);
    }
    // if (!this.hasError ) {
    //   this.service.addManagerInfo(formData).subscribe(
    //     (response) => {
    //       console.log('Manager Data Added successfully', response);
    //       // window.history.back();
    //   // setTimeout(()=>{
    //   //     window.location.reload();
    //   //   }, 100);
    //     },
    //     (error) => {
    //       console.error('Error saving manager', error);
          
    //     }
        
    //   );
     
     
    // }
    if (!this.hasError) {
      if(!this.hasErrorDOB){
      this.service.addManagerInfo(formData).subscribe(
        (response) => {
          console.log('Manager Data Added successfully', response);
          console.log("success")
          
        },
        (error) => {
          console.error('Error saving manager', error);
          console.log("fail")
          
        }
        
      );
      window.history.back();
      setTimeout(()=>{
          window.location.reload();
        }, 100);
      }
      // this.router.navigate(['/manager-list']);
      // setTimeout(()=>{
      //     window.location.reload();
      //   }, 100);
    }
    
  //   this.router.navigate(['/manager-list']);
  //   setTimeout(() => {
  //    window.location.reload();
  //  }, 100);
   
  //   if (!this.hasErrorDOB) {
  //     this.service.addUserInfo(formData).subscribe(
  //       (response) => {
  //          console.log('User Data Added successfully', response);
  //         },
  //         (error) => {
  //         console.error('Error saving user', error);
  //      }
  //  );
  
  //  this.router.navigate(['/user-list']);
  //  setTimeout(() => {
  //    window.location.reload();
  //  }, 100);
  //   }
//   if (!this.hasErrorDOB) {
//     this.service.addUserInfo(formData).subscribe(
//       (response) => {
//          console.log('User Data Added successfully', response);
//         },
//         (error) => {
//         console.error('Error saving user', error);
//      }
//  );

//  this.router.navigate(['/manager-list']);
//  setTimeout(() => {
//    window.location.reload();
//  }, 100);
//   }

    //navigate to manager list page and refresh 
    // this.router.navigate(['/manager-list']);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 20);
    
  }
  

  /*onSubmit(formData:NgForm){
    if (formData.invalid) {
      // If the form is invalid, mark all form controls as touched
      Object.keys(formData.controls).forEach((key) => {
        formData.controls[key].markAsTouched();
      });
      console.log("Form Errors");
      return;
    }
    this.userInfo = formData.value;
    this.userInfo.roleType ="manager"
    console.log(this.userInfo);
    this.service.addUserInfo(this.userInfo).subscribe((userInfo: any) => {
      console.log("Customer Data Added successfully")
      this.router.navigate(['/manager-list']);
      //console.log(data.phone1)
    },
    
    (error) => {
      console.error('Error saving customer', error)
      console.log(error)
     }
  );
  //this.router.navigate(['/']);
  }*/
  
  // validateBirthday(){
  //   if (this.userInfo.dateOfBirth){
  //     const today: Date = new Date();
  //     const inputDate: Date = new Date(this.userInfo.dateOfBirth);
  //     const age: number = today.getFullYear() - inputDate.getFullYear();
  //     if(this.isAbove20 = age < 20){
  //       console.log("Test above 20"+this.isAbove20);
  //       this.errorMessageDOB = '生年月日は 20 年以上前の日付を選択してください。';   
  //       this.hasErrorDOB = true;
  //     }  
  //     else{
  //       console.log("Test above 20 else "+this.isAbove20);
  //       this.isAbove20=false;
  //       this.errorMessageDOB = '';
  //       this.hasErrorDOB = false;
  //     } 
      
  //   }
    
  // }
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

  onReset() {
    window.history.back();

  }
  back(){
    window.history.back();
  }

  keyPressAlpha(event:KeyboardEvent){
    const inp=String.fromCharCode(event.keyCode);
    if(/[a-zA]/.test(inp)){
      return true;
    }
    else{
      event.preventDefault();
      return false;
    }
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
  
  keyPressCode(event:KeyboardEvent)
  {
    const inp=String.fromCharCode(event.keyCode);

    if(/^[ァ-ヶー　]+$/.test(inp))
    {
      return true;
    }
    else{
      event.preventDefault();
      return false;
    }
  }
  
  keyPressKanjihira(event:KeyboardEvent)
  {
    const inp=String.fromCharCode(event.keyCode);

    if(/^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+$/.test(inp))
    {
      return true;
    }
    else{
      event.preventDefault();
      return false;
    }
  }
  keyPressKana(event:KeyboardEvent)
  {
    const inp=String.fromCharCode(event.keyCode);

    if(/^[ァ-ヶー　]+$/.test(inp))
    {
      return true;
    }
    else{
      event.preventDefault();
      return false;
    }
  }

  checkDateRange() {
    if (this.myForm.value.startDate && this.myForm.value.endDate) {
      if (this.myForm.value.endDate <= this.myForm.value.startDate) {
        this.errorMessageDate = '利用開始日以降の日付を選択してください。';
        console.log("end date less than start date")
        this.hasError = true;
      } else {
        this.errorMessageDate = '';
        console.log("end date greater than start date")
        this.hasError = false;
      }
      
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
  onSelectFile(event: any) {
  
    if (event.target.files && event.target.files[0]) {
      
      const file = event.target.files[0];
      if (file) {
        if (file.size > 1 * 1024 * 1024) { // Check if file size is greater than 2MB
          this.logoSizeError = '1MB以下のイメージを選択してください。';
         
        }
        else {
          this.logoSizeError = '';
          const fileHandle: FileHandle = {
            file,
            url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file)),
          };
          this.userInfo.logo = fileHandle;
          this.url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
        }
      }
     
    }
  }
}
