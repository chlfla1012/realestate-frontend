import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandle } from 'src/app/Model/FileHandle';
import { UserInfo } from 'src/app/Model/userInfo';
import { ViewChild } from '@angular/core';

import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-manageredit',
  templateUrl: './manageredit.component.html',
  styleUrls: ['./manageredit.component.css']
})
export class ManagereditComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();
  private objectUrls = new Map<SafeUrl, string>();
  @ViewChild('f') myForm!: NgForm;
    url1: SafeUrl;
    url2: SafeUrl;
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
    logo:null,
    signature: null
    // customer: null
  }
    id:string;
    data:any;
  constructor(private service: UserInfoService, 
    private route: ActivatedRoute, private router: Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getManagerById();
  }

  getManagerById() {
    this.id = this.route.snapshot.params['id'];

    this.service.getUserById(this.id).pipe(takeUntil(this.destroy$)).subscribe(
      (data: any) => {
      const previousLogoUrl = this.url1;
      const previousSignatureUrl = this.url2;
      this.userInfo = data;
        this.userInfo.logo = this.createImage(data.logo.image, data.logo.name);
        this.userInfo.signature = this.createImage(data.signature.image, data.signature.name);
        console.log(data.logo.logo);
        console.log(data.logo.name);
      this.url1 = this.userInfo.logo.url;
      this.url2 = this.userInfo.signature.url;
      this.revokeObjectUrl(previousLogoUrl);
      this.revokeObjectUrl(previousSignatureUrl);
      // console.log("This is URL 1 "+data.logo.name);
    })
    // console.log("This is URL 2 "+this.url2);
  }
  public createImage(image,name):FileHandle  {
    //console.log('Inside createImages()');
      //console.log('Processing image:', image);
      const image1Blob = this.dataURItoBlob(image);
      //console.log('Image1 blob:', image1Blob);
      const image1File = new File([image1Blob], name);
      const image1FileHandle: FileHandle = {
      file: image1File,
      url: this.createSafeObjectUrl(image1File)
      }
     // console.log(image1FileHandle);
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

  if (this.userInfo.signature && this.userInfo.signature.file) {

    formData.append('signature', this.userInfo.signature.file, this.userInfo.signature.file.name); // Append the 'logo' File object with filename

  }
  else if (!this.userInfo.signature || !this.userInfo.signature.file) {
    formData.append('signature', new Blob(), null);
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
    this.service.updateManager(this.id,formData).pipe(takeUntil(this.destroy$)).subscribe(
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
  //this.router.navigate(['/manager-list']);
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
  onSelectFile(event: any,imageNumber: number) {
  
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const previousUrl = imageNumber === 1 ? this.url1 : imageNumber === 2 ? this.url2 : null;
      let isFileHandleUsed = false;
      const fileHandle: FileHandle = {
        file,
        url: this.createSafeObjectUrl(file),
      };

      if (file) {
        if (file.size > 1 * 1024 * 1024) {
           // Check if file size is greater than 2MB
           if (imageNumber === 1) {
            this.logoSizeError = '1MB以下のイメージを選択してください。';
            this.userInfo.logo = null;
  
            this.url1 = null;
          } else if (imageNumber === 2) {
            this.logoSizeError = '1MB以下のイメージを選択してください。';
  
            this.userInfo.signature = null;
            this.url2 = null;
          }
         
        }else {
          if (imageNumber === 1) {
            this.logoSizeError = '';
            this.userInfo.logo = fileHandle;
  
            this.url1 = fileHandle.url;
            isFileHandleUsed = true;
          }
          else if (imageNumber === 2) {
            this.logoSizeError = '';
  
            this.userInfo.signature = fileHandle;
            this.url2 = fileHandle.url;
            isFileHandleUsed = true;
          }
      }
      if (!isFileHandleUsed) {
        this.revokeObjectUrl(fileHandle.url);
      }
      this.revokeObjectUrl(previousUrl);
     
    }
  }

}

  private createSafeObjectUrl(file: File): SafeUrl {
    const objectUrl = window.URL.createObjectURL(file);
    const safeUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
    this.objectUrls.set(safeUrl, objectUrl);
    return safeUrl;
  }

  private revokeObjectUrl(url: SafeUrl | null | undefined): void {
    if (!url) {
      return;
    }
    const objectUrl = this.objectUrls.get(url);
    if (objectUrl) {
      window.URL.revokeObjectURL(objectUrl);
      this.objectUrls.delete(url);
    }
  }

  private revokeAllObjectUrls(): void {
    this.objectUrls.forEach((objectUrl) => window.URL.revokeObjectURL(objectUrl));
    this.objectUrls.clear();
  }
 
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.revokeAllObjectUrls();
  }
}
