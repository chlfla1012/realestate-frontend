import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Borrower } from 'src/app/Model/Borrower';
import { CompanyName } from 'src/app/Model/CompanyName';
import { Contract } from 'src/app/Model/Contract';
import { Lender } from 'src/app/Model/Lender';
import { Property } from 'src/app/Model/Property';
import { Tenant } from 'src/app/Model/Tenant';
import { UserInfo } from 'src/app/Model/userInfo';
import { ContractService } from 'src/app/Service/Contract/ContractService';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.css']
})
export class ContractDetailsComponent {
  companyId: number;
  backendCompany: CompanyName = {

    companyName: null
  };
  maxDate: string;  // Property to hold the max contract start date
  selectedaccounttype:string='regular';
  lendertype: string;
  borrowertype: string;
  data: any;

  // contracts:any;
  id: string;
  propertyid: number;
  // contracts: any;
  deleteStatus: boolean;
  picId: string;

 containers: boolean[] = [true, false, false, false, false, false, false];
 errorMessage: string = '';
  // picId:string;
  propertyId:string;

  picName:string;
  picNamekana:string;
  picdepartment:string;
  propertyname:string;
  roomno:string;
  ownername:string;
  ownernamekana:string;
  mobileFirst:string;
  mobileSecond:string;
  mobileThird:string;
  propertyIDs:Property[];
  picUsers:UserInfo[];
  propertyData:Property;
  picData:UserInfo;
  lender:Lender;
  borrower:Borrower;
  tenant:Tenant;
// lendertype: string;
// borrowertype: string;
contract:Contract={
  companyId: {
    companyName: null
  },
  id: null,
  propertyName: null,
  roomno: null,
  ownerName: null,
  ownerKana: null,

  // lenderId: {
  //   lenderType: null,
  //   lenderFirstName: null,
  //   lenderLastName: null,
  //   lenderFirstKana: null,
  //   lenderLastKana: null,
  //   lenderTelFirst: null,
  //   lenderTelSecond: null,
  //   lenderTelThird: null,
  //   lenderPostalFirst: null,
  //   lenderPostalSecond: null,
  //   lenderAddress: null,
  //   lenderMemo: null,
  //   lenderCooperate: null,
  //   lcKana: null,
  //   lcpicFirstName: null,
  //   lcpicLastName: null,
  //   lcpicFirstKana: null,
  //   lcpicLastKana: null,
  //   lcMail: null,
  //   lcTelFirst: null,
  //   lcTelSecond: null,
  //   lcTelThird: null,
  //   lcPostalFirst: null,
  //   lcPostalSecond: null,
  //   lcAddress: null,
  //   lcMemo: null,
  //   id:null
  // },
  // borrowerId: {
  //   borrowerType: null,
  //   borrowerFirstName: null,
  //   borrowerLastName: null,
  //   borrowerFirstKana: null,
  //   borrowerLastKana: null,
  //   borrowerTelFirst: null,
  //   borrowerTelSecond: null,
  //   borrowerTelThird: null,
  //   borrowerPostalFirst: null,
  //   borrowerPostalSecond: null,
  //   borrowerAddress: null,
  //   borrowerMemo: null,
  //   borrowerCooperate: null,
  //   bcKana: null,
  //   bcpicFirstName: null,
  //   bcpicLastName: null,
  //   bcpicFirstKana: null,
  //   bcpicLastKana: null,
  //   bcMail: null,
  //   bcTelFirst: null,
  //   bcTelSecond: null,
  //   bcTelThird: null,
  //   bcPostalFirst: null,
  //   bcPostalSecond: null,
  //   bcAddress: null,
  //   bcMemo: null,
  //   id:null
  // },
  // tenantId: {
  //   tenantFirstName: null,
  //   tenantLastName: null,
  //   tenantFirstKana: null,
  //   tenantLastKana: null,
  //   tenantTelFirst: null,
  //   tenantTelSecond: null,
  //   tenantTelThird: null,
  //   tenantFurikomisaki: null,
  //   id: null
  // },
  contractStartDate: null,
  contractEndDate: null,
  contractLength: null,
  contractMemo: null,

  classification: null,
  taxRate: null,
  rent: null,
  rentTax: null,
  managementFee: null,
  managementFeeTax: null,
  parkingFee: null,
  parkingFeeTax: null,
  bicycleParkingFee: null,
  bicycleParkingFeeTax: null,
  keymoney: null,
  keymoneyTax: null,
  shikiken: null,
  shikikenTax: null,
  deposit: null,
  depositTax: null,
  renewalFee: null,
  renewalFeeTax: null,
  repairCost: null,
  repairCostTax: null,
  departureTime: false,
  penaltyFee: null,
  penaltyFeeTax: null,
  signboardFee: null,
  signboardFeeTax: null,
  brokerageFee: null,
  brokerageFeeTax: null,
  totalCost: null,
  bankName: null,
  branchName: null,
  accountType: null,
  accountNo: null,
  accountName: null,
  apportionment: null,
  picName: "",
  picNameKana: null,
  mobileFirst: null,
  mobileSecond: null,
  mobileThird: null,
  department: null,
  pic: undefined,
  property: undefined,
  createdDate: null,
  modifiedDate: null,
  createdName: null,
  modifiedName: null,
  tenantFullName: null,
  tenantFullNameKana: null,
  lenderId: undefined,
  borrowerId: undefined,
  tenantId: undefined
}

toggleContainer(index: number) {
  this.containers[index] = !this.containers[index];
}
@ViewChild('searchModal') searchModal: any; // Add this line
filteredProperties: Property[];
searchText: string;


ownerKana: string;
ownerData: UserInfo;
ownerkana: string;

constructor(private contractService:ContractService,
 private sanitizer:DomSanitizer,
 private route:ActivatedRoute,
  private router: Router,
  private dialog: MatDialog,
    private snackBar: MatSnackBar) {

 }
 ngOnInit(): void {
   // this.id = this.route.snapshot.params['id'];
   this. getcontractById();
 }

 getcontractById() {
 this.id= this.route.snapshot.params['id'];
 this.contractService.getcontractById(this.id).subscribe(
   (data:any) => {
     this.contract = data;
     this.contract.id = data.id;
    this.lender=data.lender;
    this.borrower=data.borrower;
    this.tenant=data.tenant;
    this.picId = this.contract.pic?.id;
    this.picName = this.contract.picName;
     console.log("The Contract ID is "+data.id);
     console.log("The contract length is "+data.contractLength);
     console.log("The lender ID is "+data.lender.id);
     console.log("the lender name is"+data.lender.lenderFirstName);
     console.log("the pic id "+this.contract.picName);


   },

   (error) => {
     console.error('Error:', error);
   }
 );
}
navigateToUpdatePage(id: string) {
 this.router.navigate(['/contract-update',id]);
 // window.history.back();

}
navigateToPreivousPage() {
  window.history.back();
}
confirmDelete(id: string, name: string, room: string) : void {
  const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
    data: {
      message: `  選択された物件:「${name+room}号」の契約情報内容を削除します`,
    },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.contractService.deleteContract(id).subscribe(
        () => {
          this.router.navigate(['/contract-list']);


          console.log('contract deleted successfully.');
        },
        (error) => {
          console.error('An error occurred:', error);
            this.showForeignKeyErrorSnackbar(name,room);

        }
      );
    }
  });
}

private showForeignKeyErrorSnackbar(name: string,room:string): void {
  const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  const verticalPosition: MatSnackBarVerticalPosition = 'top';

  this.snackBar.open(`選択された物件:「${name+room}号」の契約情報内容を利用しているところがあるので、削除することは出来ません。`, '', {
    duration: 2000, // Adjust duration as needed
    horizontalPosition,
    verticalPosition,
    panelClass: ['blue-snackbar']
  });
}


}
