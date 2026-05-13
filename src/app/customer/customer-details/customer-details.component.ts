import { Customer } from 'src/app/Model/Customer';
import { CustomerService } from 'src/app/Service/Customer/CustomerService';
import { ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, catchError, map, of, throwError , Subject } from "rxjs";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';
import { CompanyName } from 'src/app/Model/CompanyName';
import { FileHandle } from 'src/app/Model/FileHandle';
import { SafeUrl } from '@angular/platform-browser';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  @ViewChild('f') myForm!:NgForm;
  deleteStatus: boolean;
  id:string;
  data:any;
  companyId: number;
  logoId: number;
  searchName: string;
  backendCompany: CompanyName = {
    companyName: null
  };
  backendLogo: FileHandle = {
    file: null,
    url: null
  };
  logoImage: SafeUrl;
  customer: Customer = {
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
    logo: null,
    personFullName:"",
    personFullNameKana:""
  }
  constructor(private userService: UserInfoService, private service: CustomerService, private userAuthService: UserAuthService,
    private route: ActivatedRoute, private router: Router,private dialog: MatDialog,
    private snackBar: MatSnackBar) { 
    
    }
 
  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];
    this.service.getCustomerById(this.id).pipe(takeUntil(this.destroy$)).subscribe(data=>{
      this.customer = data;
      console.log(this.customer.id)
    })
  
  
  }
  
  navigateToUpdatePage(id: string) {
    this.router.navigate(['/customer-update',id]);

  }
 


  confirmDelete(id: string, companyName: string): void {
    console.log(this.customer.id)
      const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
        data: {
          message: `選択された会社名：「${companyName}」の内容を削除します`,
        },
      });
      console.log(this.customer.id)

      dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
        if (result) {
       this.service.deleteCustomer(this.id).pipe(takeUntil(this.destroy$)).subscribe(
            () => {
            // Item deleted successfully, update your local data source or UI.
              console.log('Customer deleted successfully.');
            },
           
          );
          setTimeout(() => {
            window.history.back();
          }, 100);

        }
      });
    }

  private showForeignKeyErrorSnackbar(name: string): void {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';

    this.snackBar.open(`この取引先連絡先「${name}」を利用しているところがあるので、削除することはできません。`, '', {
      duration: 2000, // Adjust duration as needed
      horizontalPosition,
      verticalPosition,
      panelClass: ['blue-snackbar']
    });
  }

  navigateToCreatePage() {
    this.router.navigate(['/customer-create']);

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

  back(){
    window.history.back();
  }

  onReset() {
    window.history.back();

  }

 
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
