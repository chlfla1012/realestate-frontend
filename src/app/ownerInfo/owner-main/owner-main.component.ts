import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from 'src/app/Model/userInfo';
import { PmReportUploadService } from 'src/app/Service/PMReportUpload/pmReportUpload.service';
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

  //suwai
  ownerName: string; // Set the owner's name
  reports: any[] = [];

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
    private pmReportUploadService: PmReportUploadService,
    private route: ActivatedRoute, private router : Router) { }

  ngOnInit() {
    //this.roleType = this.userAuthService.getRoleType();
    this.id= this.userAuthService.getId();
    console.log("Owner Id",this.id);
    this.service.getUserById(this.id).subscribe(data=>{
      this.userInfo = data;
      this.name = data.firstName + " " + data.lastName;
      console.log(this.userInfo.id);
      console.log(this.name);
      this.ownerName = this.name;
    
      this.getReportsByOwnerName();
    },
    
    (error) => {
      console.error('Error retreiving owner data', error)
      console.log(error)
     }
  );
  }

  getReportsByOwnerName(): void {
    this.pmReportUploadService.getReportsByOwnerName(this.ownerName).subscribe(
      (data: any) => {
        this.reports = data.filter((report: any) => {
          const createdDate = new Date(report.createdDate);        
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
          return createdDate >= sixMonthsAgo;          
        });
      },
      (error: any) => {
        console.error('Error fetching reports:', error);
      }
    );
  }

  // downloadReport(id: number): void {
  //   this.pmReportUploadService.downloadReportById(id).subscribe(      
  //      (data:any) => {                  
  //       window.alert('File downloaded successfully!');
       
  //     },
  //     (error: any) => {
  //       console.error('Error downloading report:', error);
  //     }
  //   );
  // }
 

onSubmit(f:NgForm){
// const firstName = this.userAuthService.getFirstName();
// const lastName=this.userAuthService.getLastName();
   
}
}