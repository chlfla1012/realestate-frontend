import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from 'src/app/Model/userInfo';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';

@Component({
  selector: 'app-owner-main',
  templateUrl: './owner-main.component.html',
  styleUrls: ['./owner-main.component.css']
})
export class OwnerMainComponent {
  imageUrl = 'assets/ownermainpage.png';

  companyName:string="桜不動産管理会社";
  firstName:string;
  lastName:string;
  id: string;
  name: string;

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
  

  constructor(private service: UserInfoService,
    private userAuthService: UserAuthService, 
    private route: ActivatedRoute, private router : Router) { }

  //   ngOnInit(): void {
  //     this.service.getUserInfo().subscribe(data => {
  //     this.userInfo= data;
  //     console.log(this.userInfo);
  //     this.firstName=this.userInfo.firstName;
  //     this.lastName=this.userInfo.lastName;
  //   });
  // }
  ngOnInit() {
    //this.roleType = this.userAuthService.getRoleType();
    this.id= this.userAuthService.getId();
    console.log("Owner Id",this.id);
    this.service.getUserById(this.id).subscribe(data=>{
      this.userInfo = data;
      this.name = data.firstName + " " + data.lastName;
      console.log(this.userInfo.id);
      console.log(this.name);
    
    },
    
    (error) => {
      console.error('Error retreiving owner data', error)
      console.log(error)
     }
  );
  }

    onSubmit(f:NgForm){
// const firstName = this.userAuthService.getFirstName();
// const lastName=this.userAuthService.getLastName();
   
}
}