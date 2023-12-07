import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserInfoService } from '../Service/UserInfo/userInfoService';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../Service/UserInfo/user-auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserInfo } from '../Model/userInfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  data:any;
  errorMessage:string = '';
  passwordType: string = 'password';
  formSubmitted: boolean = false;
  isLoginMode: boolean = true;
  // email:string="";
  // password:string="";
  roleType: string ="";
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
    private service: UserInfoService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  loginUser(loginForm: NgForm) {
    if (loginForm.invalid) {
      Object.keys(loginForm.controls).forEach((key) => {
        loginForm.controls[key].markAsTouched();
      });
      console.log("Form Errors");
      return;
    }
    this.formSubmitted = true;
    this.service.login(this.userInfo.email, this.userInfo.password).subscribe(
      (response: any) => {
        const roletype1 = response.userType;
        const id = response.id;
        const companyName = response.companyName;
        const picId = response.companyName.id;
        const logo = response.logo;
        const firstName = response.firstName;
        const lastName = response.lastName;
        const phone1 = response.phone1;
        const phone2 = response.phone2;
        const phone3 = response.phone3;
        // const email = response.email;
        // const password = response.password;
        // console.log("Set Id after login", id);
        // console.log(response.id,response.companyName,response.userType);
        // console.log("Set RoleType after login",roletype1);
        // console.log("Before set",companyName);
        if (roletype1) {
          this.userAuthService.setRoleType(roletype1);
          this.userAuthService.setId(id);
          this.userAuthService.setPicId(picId);
          this.userAuthService.setFirstName(firstName);
          this.userAuthService.setLastName(lastName);
          this.userAuthService.setPhone1(phone1);
          this.userAuthService.setPhone2(phone2);
          this.userAuthService.setPhone3(phone3);

          // for setting  companyName and logo
          // this.userAuthService.setCompanyName(companyName);
          if (companyName) {
            this.userAuthService.setCompanyName(companyName,true);
            this.userAuthService.setCompanyId(companyName.id,true);
          }
          else {
            this.userAuthService.setCompanyName(null,false);
            this.userAuthService.setCompanyId(null,false);
          }
          if (logo && logo.image && logo.name) {
            this.userAuthService.setLogo(logo.image, logo.name, true);
            this.userAuthService.setLogoId(logo.id,true);
          } else {
            this.userAuthService.setLogo(
              null, null, false);
              this.userAuthService.setLogoId(logo.id,false);

          }
          console.log(logo);

          console.log(this.userAuthService.getRoleType());
          console.log("Role exist"); 
        } else {
          console.log('Role type is not valid:', roletype1);
        }

        const roleType = response.userType;
        if (roleType === 'admin') {
          this.router.navigate(['/manager-list']);
        } else if (roleType === 'manager'){
          this.router.navigate(['/user-list']);
        } else if (roleType === 'user'){
          this.router.navigate(['/owner-list']);
        }else{
          this.router.navigate(['/owner-main']);
        }
        
      },
      
      (error) => {
          this.errorMessage = "メールアドレスまたはパスワードに誤りがあります。";
        } 
    );
  }
  closeErrorMessage() {
    this.errorMessage = '';
}

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  handelForgotPasswordAction(){
    this.router.navigate(['/email-request']);
   }

}
