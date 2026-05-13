import { Component, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import {BankFormat} from 'src/app/Model/BankFormat';
import {BankFormatService} from 'src/app/Service/BankFormat/bankFormat.service'
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-bankformat-edit',
  templateUrl: './bankformat-edit.component.html',
  styleUrls: ['./bankformat-edit.component.css']
})
export class BankFormatEditComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  @ViewChild('f') myForm!: NgForm;
  id:string;
  data:any;
  bankformat: BankFormat = {
    id:null,
    bankName:"",
    date:"",
    content:"",
    income:"",
    remark:"",
    createdDate:"",
    modifiedDate:""
  }
  constructor(private router: Router, private service: BankFormatService,
    private userAuthService: UserAuthService, private route: ActivatedRoute) { }

    ngOnInit(): void {
    
      this.id = this.route.snapshot.params['id'];
  
      this.service.getBankFormatById(this.id).pipe(takeUntil(this.destroy$)).subscribe(data=>{
        this.bankformat = data
        console.log(this.bankformat.id)
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
      console.log("submit" + this.bankformat.id);
  
      this.service.updateBankFormat(this.id, this.bankformat).pipe(takeUntil(this.destroy$)).subscribe(
        (response: BankFormat) => {
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

    onReset() {
      this.router.navigate(['/bankformat-list']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}