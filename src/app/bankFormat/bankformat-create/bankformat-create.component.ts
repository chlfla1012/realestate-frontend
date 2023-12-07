import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BankFormat } from 'src/app/Model/BankFormat';
import { BankFormatService } from 'src/app/Service/BankFormat/bankFormat.service'
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bankformat-create',
  templateUrl: './bankformat-create.component.html',
  styleUrls: ['./bankformat-create.component.css']
})
export class BankFormatCreateComponent {
  @ViewChild('f') myForm!: NgForm;
  id: string;
  data: any;
  bankformat: BankFormat = {
    id: null,
    bankName: "",
    date: "",
    content: "",
    income: "",
    remark: "",
    createdDate: "",
    modifiedDate: ""
  }
  constructor(private router: Router, private service: BankFormatService,
    private userAuthService: UserAuthService) { }

  onSubmit(BankFormatForm: NgForm) {
    if (BankFormatForm.invalid) {
      Object.keys(BankFormatForm.controls).forEach((key) => {
        BankFormatForm.controls[key].markAsTouched();
      });
      return;
    }
    const formData = new FormData();
    formData.append(
      "customer",
      new Blob([JSON.stringify(this.bankformat)], { type: "application/json" })
    );

    this.service.addBankFormat(formData).subscribe(
      (response) => {
        console.log('Bank Format Data Added successfully', response);
      },
      (error) => {
        console.error('Error saving', error);
      }
    );
    this.router.navigate(['/bankformat-list']);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
  back() {
    window.history.back();
  }
  onReset() {
    this.router.navigate(['/bankformat-list']);
  }
  onCancel() {
    this.router.navigate(['/bankformat-list']);
  }
  navigateToPreivousPage() {
    window.history.back();
  }

}