import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../Service/UserInfo/user-auth.service';
import { UserInfoService } from '../Service/UserInfo/userInfoService';
import { UserInfo } from '../Model/userInfo';
import { Observable } from 'rxjs';
import { FileHandle } from '../Model/FileHandle';
import { NgOptimizedImage } from '@angular/common'
import { CompanyName } from '../Model/CompanyName';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  menuVisible = false;
  firstName:string;
  lastName:string;
  id:string;

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
    apportionment:"",
    logo:null


    // customer: null
  }
  
  companyName$: Observable<CompanyName>; // Change the type to Observable<string>
  logo$: Observable<FileHandle>; // Add this property for the logo

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private route: ActivatedRoute,
    public userService: UserInfoService
  ) {

  }

  public roleType: string="admin";

  ngOnInit() {
    // this.id = this.route.snapshot.params['id'];
    // this.userService.getUserById(this.id).subscribe(data => {
    //   this.userInfo = data;
    //   console.log(this.userInfo.id)
    // })
    
    this.id = this.userAuthService.getId();
    // for logo and company name
    this.companyName$ = this.userAuthService.companyName$; // Assign the observable to companyName$
    this.logo$ = this.userAuthService.logo$; // Get the logo observable

    console.log("starting header");

    console.log(this.id);
    console.log(this.companyName$);
  }

 

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login']);
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.menuVisible = !this.menuVisible;//profile menu appear
  }
  
  navigateToDetailPage(id: string) {
    id= this.userAuthService.getId();
    this.userService.getUserById(this.id).subscribe(data => {
    this.userInfo = data;
    console.log(this.userInfo.id)
    })
    this.router.navigate(['/profile-detail',id]);

  }
}
