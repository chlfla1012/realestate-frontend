import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserInfo } from 'src/app/Model/userInfo';
import { Property } from 'src/app/Model/Property';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';
import { Router, ActivatedRoute } from '@angular/router';
import { PmReportUploadService } from 'src/app/Service/PMReportUpload/pmReportUpload.service';
import { tap } from 'rxjs';
import { PMReportUpload } from 'src/app/Model/PMReportUpload';

@Component({
  selector: 'app-pmreport-upload',
  templateUrl: './pmreport-upload.component.html',
  styleUrls: ['./pmreport-upload.component.css']
})
export class PmreportUploadComponent {

  id:string;
  
  report:any;
  errorMessage: string = '';
  username: string;
  usernamekana: string;
  ownerName: string;
  managerName: string = '';
  createdDate: string;
  fileName: string = '';
  fileContent: File | undefined;
  datepipe: any;

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
    private router: Router,
    private route: ActivatedRoute,
    private pmReportUploadService: PmReportUploadService 
  ) { this.createdDate = new Date().toISOString().substring(0, 10);
    
  }


  ngOnInit() {    
    this.id= this.userAuthService.getId();
    console.log(this.id);
    this.managerName = localStorage.getItem('managerName') || ''; // Retrieve managerName from localStorage on page reload
    this.service.getUserById(this.id).subscribe(data=>{
      this.userInfo = data;
      this.username = data.firstName + " " + data.lastName;
      this.usernamekana = data.firstNamekana + " " + data.lastNamekana;
      console.log(this.userInfo.id)

      this.managerName = this.username;       

      // Store managerName in localStorage
    localStorage.setItem('managerName', this.managerName);
    
    },
    
    (error) => {
      console.error('Error saving customer', error)
      console.log(error)
     }
  );
  }

  onDateChange(event: Event) {
    const selectedDate = (event.target as HTMLInputElement).value;
    console.log('Selected Date:', selectedDate);
    this.createdDate = selectedDate;
  }
  
  

  onFileSelected(event: any): void {
    this.fileContent = event.target.files[0]; // Get the selected file
    if (this.fileContent) {
      this.fileName = this.fileContent.name; // Update fileName with the selected file's name
      console.log('File selected:', this.fileContent);
    } else {
      this.fileName = ''; // Clear the file name if no file is selected
    }
  }

  onSubmit(userForm: NgForm) {
    
    if (this.fileContent) {
      const formData = new FormData();
      formData.append('fileContent', this.fileContent);
      formData.append('fileName', this.fileName);
      formData.append('createdDate', this.createdDate);
      formData.append('ownerName', this.ownerName);
      formData.append('managerName', this.managerName);
  
      this.pmReportUploadService.uploadFile(formData).pipe(
        tap(() => {          
        })
      ).subscribe(
        (response) => {                   
          window.location.reload();        
        },
        (error) => {
          console.error('Something wrong from .ts:', error);
        }
      );
    }
  const pdfInputField: HTMLInputElement = document.getElementById('fileContent') as HTMLInputElement;
  if (!pdfInputField.files || pdfInputField.files.length === 0) {
    console.log('PDF file is required');
    return;
  }
  const ownerNameField: HTMLInputElement = document.getElementById('ownerName') as HTMLInputElement;
    if (!ownerNameField.value && (userForm.submitted || userForm.dirty)) {
      console.log('Owner Name is required');      
      return; 
    }

    const createdDateField: HTMLInputElement = document.getElementById('createdDate') as HTMLInputElement;
    if (!createdDateField.value && (userForm.submitted || userForm.dirty)) {
      console.log('Created Date is required');      
      return; 
    }

    //check for request body
    const requestBody = {
      fileContent: this.fileContent,
      fileName: this.fileName,
      createdDate: this.createdDate, // Ensure this is in "yyyy-MM-dd" format
      ownerName: this.ownerName,
      managerName: this.managerName
    };
  
    console.log('Request Payload:', requestBody);
  
  }
  
  reset() {
    window.location.reload();
    this.createdDate = '';
     
  }

}
