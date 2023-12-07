import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserInfo } from 'src/app/Model/userInfo';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent {
  id:string;
  data:any;
  errorMessage: string = '';
  username: string;
  usernamekana: string;
  
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


    // customer: null
  }
  constructor(
    private userAuthService: UserAuthService,
    private service: UserInfoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //this.roleType = this.userAuthService.getRoleType();
    this.id= this.userAuthService.getId();
    console.log(this.id);
    this.service.getUserById(this.id).subscribe(data=>{
      this.userInfo = data;
      this.username = data.firstName + " " + data.lastName;
      this.usernamekana = data.firstNamekana + " " + data.lastNamekana;
      console.log(this.userInfo.id)
    
    },
    
    (error) => {
      console.error('Error saving customer', error)
      console.log(error)
     }
  );
  }

  navigateToUpdatePage(id: string) {
    this.router.navigate(['/profile-edit',id]);

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
}
