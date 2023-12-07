import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DomSanitizer} from '@angular/platform-browser';
import { CompanyName } from 'src/app/Model/CompanyName';
import { FileHandle } from 'src/app/Model/FileHandle';
import { UserInfo } from 'src/app/Model/userInfo';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';

@Component({
  selector: 'app-usercreate',
  templateUrl: './usercreate.component.html',
  styleUrls: ['./usercreate.component.css']
})
export class UsercreateComponent {
  @ViewChild('f') myForm!: NgForm;

  data:any;
  errorMessage: string = '';
  url: SafeUrl;

  companyId: number;
  logoId: number;
  backendCompany: CompanyName = {
    
    companyName: null
  };
  backendLogo: FileHandle = {
    file: null,
    url:null
  };
  logoImage: SafeUrl;
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
    createdDate:"",
    modifiedDate: "",
    companyId:{companyName:null},
    apportionment:"",
    logo:null

    // customer: null
  }
  // private selectedOption: string;

  constructor(private router: Router, private service: UserInfoService,
  private userAuthService:UserAuthService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
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
    console.log("Get Login data",this.companyId, this.logoId);

    
  }

  

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

    this.userInfo.roleType = "user";
    if (this.userAuthService.isCompanyNameFromBackend) {
      this.userInfo.companyId = {companyName: this.backendCompany.companyName };
      
    }
    if (this.userAuthService.isLogoFromBackend) {
      // If the logo is from the backend, set the logo ID accordingly
      this.userInfo.logo = {file: this.backendLogo.file ,url:this.backendLogo.url};
    } 
    
    console.log("User Data", this.userInfo);
   
    formData.append(
      "user",
      new Blob([JSON.stringify(this.userInfo)], { type: "application/json" })
    );
    
      formData.append("logoId",this.logoId.toString());
    console.log(this.logoId);
  
    // if (this.logoId) { 
    //   formData.append("logoId",this.logoId.toString());

    // } else {
    //   formData.append("logoId", "0");

    // }
    formData.append("companyId", this.companyId.toString());
    console.log(formData.getAll);
  if (!this.hasError && !this.hasErrorDOB ) {
    // console.log(this.hasError);
    
    this.service.addUserInfo(formData).subscribe(
         (response) => {
            console.log('User Data Added successfully', response);
           },
           (error) => {
           console.error('Error saving user', error);
        }
    );
    this.router.navigate(['/user-list']);
 setTimeout(() => {
   window.location.reload();
 }, 100);
    }
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
   onReset() {
    // Reset the form data
    // this.myForm.resetForm();
    // this.router.navigate(['/user-list']);
    window.history.back();
    // Navigate to the previous page
  }

  hasError: boolean = false;
  errorMessageDate: string;
  checkDateRange() {
      if (this.myForm.value.startDate && this.myForm.value.endDate) {
        if (this.myForm.value.endDate< this.myForm.value.startDate) {
        this.errorMessageDate = '利用開始日以降の日付を選択してください。';
        this.hasError = true;
       } else {
        this.errorMessageDate = '';
        this.hasError = false;
      }
    }
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
  
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileHandle: FileHandle = {
        file,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file)),
      };
      this.userInfo.logo = fileHandle;
      this.url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
}
  }
    
    
  }
 
