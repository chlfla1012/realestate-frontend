import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyName } from 'src/app/Model/CompanyName';
import { Contract } from 'src/app/Model/Contract';
import { FileHandle } from 'src/app/Model/FileHandle';
import { Invoice } from 'src/app/Model/Invoice';
import { InvoiceList } from 'src/app/Model/InvoiceList';
import { InvoiceServiceService } from 'src/app/Service/InvoiceInfo/invoice-service.service';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent {
  id: string;
  logoId: number;
  companyId: number;
  backendCompany: CompanyName = {
    companyName: null
  };

  backendLogo: FileHandle = {
    file: null,
    url: null
  };
  
  invoiceList :InvoiceList;

  invoiceInfo: Invoice = {
    id: null,
    contractData:"",
    companyId: { companyName: null },
    companyPostalFirst: "",
    companyPostalSecond: "",
    companyAddress: "",
    personName: "",
    mobileFirst: "",
    mobileSecond: "",
    mobileThird: "",
    propertyid:"",
    propertyName: "",
    roomNo: "",
    floor: "",
    buildingPostalFirst: "",
    buildingPostalLast: "",
    address: "",
    lenderCooperate: "",
    lenderPersonName: "",
    paymentDueDate: "",
    billingDate: null,
    invoicelistObj: {
      invoicelistId: undefined,
      rent: null,
      rentTax: null,
      rentTotal: null,
      rentUsagePeriod: null,
      brokerageFee: null,
      brokerageFeeTax: null,
      brokerageFeeTotal: null,
      brokerageFeeUsagePeriod: null,
      serviceFee: null,
      serviceFeeTax: null,
      serviceFeeTotal: null,
      serviceFeeUsagePeriod: null,
      parkingFee: null,
      parkingFeeTax: null,
      parkingFeeTotal: null,
      parkingStartDate: null,
      parkingEndDate: null,
      bicycleParkingFee: null,
      bicycleParkingFeeTax: null,
      bicycleParkingFeeTotal: null,
      bicycleParkingStartDate: null,
      bicycleParkingEndDate: null,
      keymoney: null,
      keymoneyTax: null,
      keymoneyTotal: null,
      keymoneyStartDate: null,
      keymoneyEndDate: null,
      shikikin: null,
      shikikinTax: null,
      shikikinTotal: null,
      shikikinStartDate: null,
      shikikinEndDate: null,
      deposit: null,
      depositTax: null,
      depositTotal: null,
      depositStartDate: null,
      depositEndDate: null,
      renewalFee: null,
      renewalFeeTax: null,
      renewalFeeTotal: null,
      renewalFeeStartDate: null,
      renewalFeeEndDate: null,
      repairCost: null,
      repairCostTax: null,
      repairCostTotal: null,
      repairCostStartDate: null,
      repairCostEndDate: null,
      penaltyFee: null,
      penaltyFeeTax: null,
      penaltyFeeTotal: null,
      penaltyFeeStartDate: null,
      penaltyFeeEndDate: null,
      signboard: null,
      signboardTax: null,
      signboardTotal: null,
      signboardStartDate: null,
      signboardEndDate: null,
      electricBill: null,
      electricBillTax: null,
      electricUsageAmount: null,
      electricBillUsageFee: null,
      electricBillTotal: null,
      electricBillStartDate: null,
      electricBillEndDate: null,
      waterBill: null,
      waterBillTax: null,
      waterUsageAmount: null,
      waterBillUsageFee: null,
      waterBillTotal: null,
      waterBillStartDate: null,
      waterBillEndDate: null,
      gasBill: null,
      gasBillTax: null,
      gasUsageAmount: null,
      gasBillUsageFee: null,
      gasBillTotal: null,
      gasBillStartDate: null,
      gasBillEndDate: null,
      constructionBill: null,
      constructionBillTax: null,
      constructionBillTotal: null,
      constructionBillUsagePeriod: null,
      workNameFirst: null,
      workAmountFirst: null,
      workTaxFirst: null,
      workAmountTotalFirst: null,
      workUsagePeriodFirst: null,
      workNameSecond: null,
      workAmountSecond: null,
      workTaxsecond: null,
      workTotalSecond: null,
      workUsagePeriodSecond: null,
      total: null
    },
    information: "",
    bankName: "",
    branchName: "",
    accountType: "",
    accountNo: null,
    accountName: "",
    // createdName: String
    createdDate: "",
    // upDatedName: String
    modifiedDate: "",
    //userId: null,
    contractObj: null,
    logoId: null
  }

 

  ngOnInit(): void {
    this.getInvocieById();
  }

  constructor(private invoiceService:InvoiceServiceService,
    private sanitizer:DomSanitizer,
    private route:ActivatedRoute,
     private router: Router,
     private dialog: MatDialog,
       private snackBar: MatSnackBar) {}

  getInvocieById() {
    this.id= this.route.snapshot.params['id'];
    this.invoiceService.getInvoiceById(this.id).subscribe(
      (data:any) => { 
        this.invoiceInfo = data;
        this.invoiceList = data.invoiceMoneyList ;

        // console.log("The Contract ID is "+data.id);
        // console.log("The contract length is "+data.contractLength);
        // console.log("The lender ID is "+data.lender.lenderType);
        // console.log("the lender name is"+data.lender.lenderFirstName);
        console.log("This is detail data "+this.invoiceInfo.paymentDueDate);
        console.log("This is detail data "+this.invoiceInfo.billingDate);
      },
   
      (error) => {
        console.error('Error:', error);
      }
    );
   }

   navigateToUpdatePage(id: string) {
    this.router.navigate(['/invoice-edit',id]);
  }
  navigateToPreivousPage() {
    window.history.back();
  }
  confirmDelete(id: string, name: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        message: `  選択された物件名：「${name}」の内容を削除します`,
},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.invoiceService.deleteInvoice(id).subscribe(
          () => {
            this.router.navigate(['/inovice-list']);

         
            console.log('invoice deleted successfully.');
          },
          (error) => {
            console.error('An error occurred:', error);
              //this.showForeignKeyErrorSnackbar(name);
            
          }
        );
      }
    });
  }
}
