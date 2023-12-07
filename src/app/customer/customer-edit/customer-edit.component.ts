import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';
import { UserInfo } from 'src/app/Model/userInfo';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { FileHandle } from 'src/app/Model/FileHandle';
import { ActivatedRoute, Router } from '@angular/router';

import { Customer } from 'src/app/Model/Customer';
import { CustomerService } from 'src/app/Service/Customer/CustomerService';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit{
  @ViewChild('f') infoForm : NgForm;
  
  customer: Customer ={
    id: null,
    type: "",
    companyName: "",
    personFirstName: "",
    personLastName: "",
    personFirstKana: "",
    personLastKana: "",
    department: "",
    mobileFirst: "",
    mobileSecond: "",
    mobileThird: "",
    fax1: "",
    fax2: "",
    fax3: "",
    mailAdd: "",
    postalFirst: "",
    postalSecond: "",
    address: "",
    createdDate: "",
    createdName: "",
    modifiedDate: "",
    updatedName: "",
    remark: "",
    companyId:{companyName:null},    
    logo:null,
    personFullName:"",
    personFullNameKana:""
  }
    id:string;
    data:any;
  constructor(private service: CustomerService, 
    private route: ActivatedRoute, private router : Router) { }

 
  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];

    this.service.getCustomerById(this.id).subscribe(data=>{
      this.customer = data
      //console.log(this.customer.type)
      console.log(this.customer.id)
    })
  }
  onSubmit(formData:NgForm){
    if (formData.invalid) {
      Object.keys(formData.controls).forEach((key) => {
        formData.controls[key].markAsTouched();
      });
      console.log("Form Errors");
      return;
    }
    console.log("submit" + this.customer.id);

    this.service.updateCustomer(this.id, this.customer).subscribe(
      (response: Customer) => {
        console.log(response);
        window.history.back();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
     
    // window.history.back();
    // setTimeout(()=>{
    //     window.location.reload();
    //   }, 100);

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

  onReset() {
    window.history.back();

  }

  navigateToPreivousPage() {
    window.history.back();
  } 
  }




