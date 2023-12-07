import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandle } from 'src/app/Model/FileHandle';
import { UserInfo } from 'src/app/Model/userInfo';
import { ViewChild } from '@angular/core';

import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';

@Component({
  selector: 'app-manageredit',
  templateUrl: './manageredit.component.html',
  styleUrls: ['./manageredit.component.css']
})
export class ManagereditComponent implements OnInit{
  @ViewChild('f') myForm!: NgForm;
    url: SafeUrl;
    logoSizeError: string = '';
    hasError: boolean = false;
    errorMessageDate: string;
    dateOfBirth:string ='';
    isAbove20:boolean = false;
    hasErrorDOB: boolean = false;
    errorMessageDOB: string;

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
    companyId:{companyName:null},
    apportionment:"",

    logo:null


    // customer: null
  }
    id:string;
  data:any;
  constructor(private service: UserInfoService, 
    private route: ActivatedRoute, private router: Router,
    private sanitizer: DomSanitizer) { }

 
  ngOnInit(): void {
    this.getManagerById();
    
    // this.id = this.route.snapshot.params['id'];

    // this.service.getUserById(this.id).subscribe(data=>{
    //   this.userInfo = data
    //   console.log(this.userInfo.id)
    // })
  
  
  }
  getManagerById() {
    this.id = this.route.snapshot.params['id'];

    this.service.getUserById(this.id).subscribe(
      (data: any) => {
      this.userInfo = data;
        this.userInfo.logo = this.createImage(data.logo.image, data.logo.name);
        console.log(data.logo.logo);
        console.log(data.logo.name);
      this.url = this.userInfo.logo.url;
      
      
      console.log(this.userInfo.id)
    })
  }
  public createImage(image,name):FileHandle  {
    console.log('Inside createImages()');
  
      console.log('Processing image:', image);
  
      const image1Blob = this.dataURItoBlob(image);
      console.log('Image1 blob:', image1Blob);
  
      const image1File = new File([image1Blob], name);

    
    const image1FileHandle: FileHandle = {
      file: image1File,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(image1File))
    }
    console.log(image1FileHandle);
     return image1FileHandle;
  
     

  }
  public dataURItoBlob(image) {
    const byteString = window.atob(image);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

  const blob = new Blob([int8Array]);
    return blob;
  }


  onSubmit(editForm: NgForm) {
    if (editForm.invalid) {
      // If the form is invalid, mark all form controls as touched
      Object.keys(editForm.controls).forEach((key) => {
        editForm.controls[key].markAsTouched();
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
  const formData = new FormData();

  formData.append(
    "manager",
    new Blob([JSON.stringify(this.userInfo)], { type: "application/json" })
  );

//   if (!this.hasErrorDOB) {
//     this.service.updateManager(this.id,formData).subscribe(
//       (response) => {
//          console.log('Manager Data Added successfully', response);
//         },
//         (error) => {
//         console.error('Error updating user', error);
//      }
//  );

//   this.router.navigate(['/manager-list']);
//   setTimeout(() => {
//    window.location.reload();
//  }, 100);
//   }

  if (this.userInfo.logo && this.userInfo.logo.file) {

    formData.append('logo', this.userInfo.logo.file, this.userInfo.logo.file.name); // Append the 'logo' File object with filename

  }
  else if (!this.userInfo.logo || !this.userInfo.logo.file) {
    formData.append("logo", new Blob(), null);
  }

//   if (!this.hasError && !this.hasErrorDOB) {
//     this.service.updateManager(this.id,formData).subscribe(
//       (response) => {
//         console.log('Manager Data Updated successfully', response);
        
//       },
//       (error) => {
//         console.error('Error updating manager', error);
        
        
//       }
      
//     );
//     // window.history.back();
//     // setTimeout(()=>{
//     //     window.location.reload();
//     //   }, 100);
//   }
  
//   this.router.navigate(['/manager-list']);
//   setTimeout(() => {
//    window.location.reload();
//  }, 100);
if (!this.hasError) {
  if(!this.hasErrorDOB){
    this.service.updateManager(this.id,formData).subscribe(
            (response) => {
              console.log('Manager Data Updated successfully', response);
              
            },
            (error) => {
              console.error('Error updating manager', error);
              
              
            }
    
  );
  window.history.back();
  setTimeout(()=>{
      window.location.reload();
    }, 100);
  }
  this.router.navigate(['/manager-list']);
  setTimeout(()=>{
      window.location.reload();
    }, 100);
}
    
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