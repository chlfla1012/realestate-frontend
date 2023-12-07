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
        
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
     
    window.history.back();
    setTimeout(()=>{
        window.location.reload();
      }, 100);

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
  // onSubmit(formData:NgForm){
  //   this.customer = formData.value
  //   console.log("submit" + this.customer.type);
  // // this.customer.item = this.formData.value.item;
  // // this.customer.companyName = this.formData.value.companyName;
  // // this.customer.nameKana = this.formData.value.nameKana;
  // // this.customer.personName = this.formData.value.personName;
  // // this.customer.mobileFirst = this.formData.value.mobileFirst;
  // // this.customer.mobileSecond = this.formData.value.mobileSecond;
  // // this.customer.mobileThird = this.formData.value.mobileThird;
  // // this.customer.mailAdd = this.formData.value.mailAdd;
  // // this.customer.postalFirst = this.formData.value.postalFirst;
  // // this.customer.postalSecond = this.formData.value.postalSecond;
  // // this.customer.memo = this.formData.value.memo;
  //  this.service.updateCustomer(this.id,this.customer).subscribe(customer => {
  //     })
  //   this.router.navigate(['/']);
  //   setTimeout(()=>{
  //     window.location.reload();
  //   }, 100);
  
  // }
  // getCustomerById(getId:number){
  //   this.service.getCustomerById(getId).subscribe(data=>{
  //     this.customer = data
  //     console.log(this.customer);
  //   });
  // } 
    // onSubmit(formData:any){
  //   this.customer = formData.value
  //   console.log("submit" + this.customer.id);
  // this.service.updateCustomer(this.id,this.customer).subscribe(customer => {
  //     })

  //   this.router.navigate(['/customer-list']);
  
  // }
 
 
  }




