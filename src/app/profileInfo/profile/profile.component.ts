import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/Model/userInfo';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  private id:string;
  data:any;
  userInfo1:any;
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
  }
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public service: UserInfoService
  ) {}
  
  ngOnInit() {
    //this.roleType = this.userAuthService.getRoleType();
    this.id=this.userAuthService.getId();
    console.log(this.id);
    this.service.getUserInfo().subscribe(data=>{
     // this.userInfo = data
      console.log(this.userInfo.id)
    })

  }
  onSubmit(formData:NgForm){
    this.userInfo = formData.value;
    this.userInfo.roleType ="manager"
    console.log(this.userInfo);
    this.service.addUserInfo(this.userInfo).subscribe((userInfo: any) => {
      console.log("Customer Data Added successfully")
      //console.log(data.phone1)
    },
    
    (error) => {
      console.error('Error saving customer', error)
      console.log(error)
     }
  );
  //this.router.navigate(['/']);
  }

}
