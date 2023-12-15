import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../Service/UserInfo/user-auth.service';
import { UserInfoService } from '../Service/UserInfo/userInfoService';
import { UserInfo } from '../Model/userInfo';
import { Observable, of } from 'rxjs';
import { FileHandle } from '../Model/FileHandle';
import { NgOptimizedImage } from '@angular/common'
import { CompanyName } from '../Model/CompanyName';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { switchMap } from 'rxjs/operators';

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
 imageFileHandle: FileHandle;

  constructor(private sanitizer: DomSanitizer,
    private userAuthService: UserAuthService,
    private router: Router,
    private route: ActivatedRoute,
    public userService: UserInfoService
  ) {

  }

  public roleType: string="admin";
  ngOnInit() {
    this.id = this.userAuthService.getId();
    this.companyName$ = this.userAuthService.companyName$;

    this.logo$ = this.userAuthService.logo$.pipe(
      switchMap(logo => {
        if (logo && logo.url) {
          return of(logo); // Return the logo directly if it exists
        } else {
          const logoData = localStorage.getItem('logoData');
          if (logoData) {
            const parsedLogoData = JSON.parse(logoData);
            const base64Data = parsedLogoData.logo;
            const imageUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + base64Data);
            const imageFileHandle: FileHandle = { file: null, url: imageUrl };
            return of(imageFileHandle); // Update logo$ with the retrieved image data
          } else {
            return this.userAuthService.logo$; // Get the logo observable if no logoData found in localStorage
          }
        }
      })
    );
    
    console.log("starting header");
    console.log(this.id);
    console.log(this.companyName$);
    console.log(this.logo$);
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