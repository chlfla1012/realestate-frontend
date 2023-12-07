import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from 'src/app/Model/userInfo';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit{
  // @ViewChild('f') infoForm : NgForm;
  dateOfBirth:string ='';
  isAbove20:boolean = true;
  hasErrorDOB: boolean = false;
  errorMessageDOB: string;
  
  id: string;
  
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
    createdDate: "",
    modifiedDate: "",
    companyId:{companyName:null},
    apportionment:"",

    logo:null


    // customer: null
  }
  
  data:any;
  constructor(private service: UserInfoService, 
    private route: ActivatedRoute, private router : Router) { }

 
  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];

    this.service.getUserById(this.id).subscribe(data=>{
      this.userInfo = data;
      console.log(this.userInfo.id);
    })
  
  
}
  onSubmit(formData:any){
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
    if (!this.hasErrorDOB){
      this.service.updateUserInfo(this.id, this.userInfo).subscribe(
        (response: UserInfo) => {
          console.log(response);
          console.log(this.userInfo.dateOfBirth);
          window.history.back();
                
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    
      
      }
   
//   this.service.getUserById(this.id).subscribe(data=>{
//     this.userInfo = data;
//     console.log(this.userInfo.id)
  
//   },
  
//   (error) => {
//     console.error('Error saving customer', error)
//     console.log(error)
//    }
// );
// window.history.back();
  // this.router.navigate(['/profile-detail', this.id]);


    // setTimeout(()=>{
    //   window.location.reload();
    // }, 100);
  
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
   
  onReset() {
    window.history.back();

  }
  
  back(){
    window.history.back();
  }
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
  }
