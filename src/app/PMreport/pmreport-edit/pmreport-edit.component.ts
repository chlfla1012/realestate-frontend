import { Component, ViewChild, OnInit} from '@angular/core';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgForm} from '@angular/forms';
import { FileHandle } from 'src/app/Model/FileHandle';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CompanyName } from 'src/app/Model/CompanyName';
import { Property } from 'src/app/Model/Property';
import { UserInfo } from 'src/app/Model/userInfo';
import { Expense } from 'src/app/Model/Expense';
import { PmReportService } from 'src/app/Service/PMRepot/pmReport.service';
import { ContractService } from 'src/app/Service/Contract/ContractService';
import { PropertyService } from 'src/app/Service/Property/PropertyService';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';
import { PMReport } from 'src/app/Model/PMReport';
import { MatTableDataSource } from '@angular/material/table';
import { Income } from 'src/app/Model/Income';
import { Rental } from 'src/app/Model/Rental';

@Component({
  selector: 'app-pmreport-edit',
  templateUrl: './pmreport-edit.component.html',
  styleUrls: ['./pmreport-edit.component.css']
})
export class PmreportEditComponent implements OnInit {
  @ViewChild('f') myForm!: NgForm;
  companyId: number;
  backendCompany: CompanyName = {
    companyName: null
  };
  backendLogo: FileHandle = {
    file: null,
    url: null
  };
  id: null;
  dataSource: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any>;
  companyName: CompanyName;
  ownerName: string;
  propertyId: string;
  ownerKana: string;
  picId: string;
  picName: string;
  picNameKana: string;
  propertyname: string;
  branchName: string;
  accountType: string;
  accountNo: string;
  accountHolder: string;
  bankName: string;
  mail: string;
  password:string;
  apportionment: string;
  expDetail: string;
  receipt: string;
  expId: number;
  expDate: string;
  amount: number;
  expTax: number;
  totalAmount: number;
  remark: string;
  logoId: number;
  mobileFirst: string;
  mobileSecond: string;
  mobileThird: string;
  ownerPostalFirst: string;
  ownerPostalSecond: string;
  ownerAddress: string;
  results: any[] = [];
  userPostalFirst: string;
  userPostalSecond: string;
  userAddress: string;
  propertyIDs: Property[];
  ownerUsers: UserInfo[];
  ownerNames: Property[];
  picUsers: UserInfo[];
  expenseRow: Expense[] = [];
  expenseData: Expense[] = [];
  ownerData: UserInfo;
  incomeInfo: any;
  rentalInfo: any;
  ownerInfo: any;
  userInfo: any;
  incomeTotal:number = 0;;
  expenseTotal:number = 0;;
  incomeRemarks: string;
  rentalRemarks: string;
  incomeData: Income[] = []; 
  rentalData: Rental[] = []; 
  pmReport: PMReport = {
    id: null,
    propertyName: "",
    ownerName: "",
    mail: "",
    bankName: "",
    branchName: "",
    accountType: "",
    accountNo: "",
    accountName: "",
    apportionment: "",
    targetMonth: "",
    picName: "",
    totalIncome: null,
    totalExpense: null,
    createdName: "",
    createdDate: "",
    modifiedName: "",
    modifiedDate: "",
    mobileFirst: "",
    mobileSecond: "",
    mobileThird: "",
    picNameKana: "",
    userPostalFirst: "",
    userPostalSecond: "",
    userAddress: "",
    ownerPostalFirst: "",
    ownerPostalSecond: "",
    ownerAddress: "",
    password: "",
    companyId: { companyName: null },
    logo: null,
    pic:null,
  }

  income = {
    id : "",
    incomeRemark : "",
    room: "",
    tenantName: "",
    month: "",
    rent: null,
    managementFee: null,
    bicycleParkingFee: null,
    signboardFees: null,
    parkingFee: null,
    keymoney: null,
    shikiken: null,
    deposit: null,
    renewalFee: null,
    repairCost: null,
    penaltyFee: null,
    tax: null,
    others: null,
    totalIncome: null,
    incomeRemarks: ""
  }

  rental = {
    id : "",
    room: null,
    classification: "",
    tenantName: null,
    areaMeter: null,
    areaTsubo: null,
    rentTsubo: null,
    totalRent: null,
    serviceFeesTsubo: "",
    serviceFeesTotal: "",
    deposit: "",
    toalDeposit: "",
    contractStartDate: "",
    contractEndDate: "",
    renewalFees: null,
    rentalRemarks : ""
}
constructor(private router: Router,
  private userService: UserInfoService,
  private userAuthService: UserAuthService,
  private propertyService: PropertyService,
  private pmReportService: PmReportService,
  private route:ActivatedRoute,
  private dialog: MatDialog,
  private contractService: ContractService,
  private sanitizer: DomSanitizer) {
  
  for (let i = 1; i <= 5; i++) {
    this.expenseRow.push({
      id: null,
      expenseDetail: '',
      voucher: '',
      expenseDate: '',
      expenseMoney: null,
      expenseTax: null,
      expenseTotal: null,
      expenseRemarks: '',
      owner: undefined,
      pmReport: undefined
    });
  }

  this.dataSource = new MatTableDataSource<any>([]);
  this.dataSource2 = new MatTableDataSource<any>([]);
}

displayedColumns: string[] = ['room', 'tenantName', 'month', 'rent',
  'managementFee', 'parkingFee', 'bicycleParkingFee', 'keymoney', 'shikiken', 'deposit', 'renewalFee', 'repairCost', 'penaltyFee', 'signboardFees', 'tax', 'other', 'totalIncome', 'incomeRemarks'];


displayedColumns2: string[] = ['room', 'classification', 'tenantName', 'areaMeter', 'areaTsubo', 'rentTsubo', 'totalRent', 'totalRental', 'serviceFeesTotal', 'serviceFeesTsubo', 'deposit', 'toalDeposit', 'contractStartDate', 'contractEndDate', 'renewalFees', 'rentalRemarks'];
  ngOnInit() : void{
    this.getCurrentUserInfo();
    this.getPMReportById();
     }
 
  getCurrentUserInfo() {
    this.userAuthService.getCompanyId().subscribe(companyId => {
      this.companyId = companyId;
    });
    this.userAuthService.getCompanyName().subscribe(backendCompany => {
      this.backendCompany = backendCompany;
    });
    this.userAuthService.getLogoId().subscribe(logoId => {
      this.logoId = logoId;
    });
    this.userAuthService.getLogo().subscribe(backendLogo => {
      this.backendLogo = backendLogo;
    });
  }
  getPMReportById() {
    this.id= this.route.snapshot.params['id'];
    this.pmReportService.getPMReportById(this.id).subscribe(
      (data:any) => {
        this.pmReport = data;
      });
    this.pmReportService.getExpenseDataById(this.id).subscribe(
      (data) => {
        this.expenseRow = data;
        console.log("Expense",data);
      });
    this.pmReportService.getIncomeDataById(this.id).subscribe(
      (data:Income[]) => {
        this.dataSource.data = data;
      });
    this.pmReportService.getRentalDataById(this.id).subscribe(
      (data:Rental[]) => {
        this.dataSource2.data= data;
      });
   }

    
    
    onSubmit(reportForm: NgForm) {
      if (reportForm.invalid) {
        Object.keys(reportForm.controls).forEach((key) => {
          reportForm.controls[key].markAsTouched();
        });
        return;
      }
      this.pmReport.ownerName = this.ownerName;
      this.pmReport.propertyName = this.propertyname;
      this.pmReport.mail = this.mail;
      this.pmReport.accountName = this.accountHolder;
      this.pmReport.accountNo = this.accountNo;
      this.pmReport.accountType = this.accountType;
      this.pmReport.branchName = this.branchName;
      this.pmReport.bankName = this.bankName;
      this.pmReport.apportionment = this.apportionment;
      this.pmReport.mobileFirst = this.mobileFirst;
      this.pmReport.mobileSecond = this.mobileSecond;
      this.pmReport.mobileThird = this.mobileThird;
      this.pmReport.picName = this.picName;
      this.pmReport.picNameKana = this.picNameKana;
      this.pmReport.userPostalFirst = this.userPostalFirst;
      this.pmReport.userPostalSecond = this.userPostalSecond;
      this.pmReport.userAddress = this.userAddress;
      this.pmReport.ownerPostalFirst = this.ownerPostalFirst;
      this.pmReport.ownerPostalSecond = this.ownerPostalSecond;
      this.pmReport.ownerAddress = this.ownerAddress;
      this.pmReport.password = this.password;
      this.pmReport.totalIncome=this.incomeTotal;   
      this.income.incomeRemarks = this.incomeRemarks;
      this.rental.rentalRemarks = this.rentalRemarks;
      this.income=this.incomeInfo;
      this.rental=this.rentalInfo;       
     
      for (let i = 0; i < this.expenseRow.length; i++) {      
        if(this.expenseRow[i].expenseDetail !== null && this.expenseRow[i].expenseDetail !== '') {
          this.expenseData.push({
            id: null,
            expenseDetail: this.expenseRow[i].expenseDetail,
            voucher:this.expenseRow[i].voucher,
            expenseDate: this.expenseRow[i].expenseDate,
            expenseMoney: this.expenseRow[i].expenseMoney,
            expenseTax: this.expenseRow[i].expenseTax,
            expenseTotal: this.expenseRow[i].expenseTotal,
            expenseRemarks: this.expenseRow[i].expenseRemarks,
            owner: undefined,
            pmReport: undefined
           
          });
        }
      }
      this.pmReportService.updatePMReport(this.id,this.expenseRow).subscribe(
        (response:Expense) => {
          console.log(response);
          console.log('Data added successfully');
        },
        (error: HttpErrorResponse) => {
          console.error('Error submitting contract:', error);
        }
      );   
    }

    onInputChange() {
      this.calculateTotals();
    }
    calculateTotals() {
      this.expenseRow.forEach(row => {
        const amount = row.expenseMoney;
        const originalExpTax = row.expenseTax/100;
        if (!isNaN(amount) && !isNaN(originalExpTax) && amount > 0 && originalExpTax > 0) {
          row.expenseTotal = amount + (amount * originalExpTax );
        } else {
          row.expenseTotal = null; // or row.expenseTotal = 0; depending on your requirements
        }
      });
    }

    addRow() {
      const newRow = {
          id: null,
          expenseDetail: '',
          voucher: '無し',
          expenseDate: '',
          expenseMoney: 0,
          expenseTax: 0,
          expenseTotal: 0,
          expenseRemarks: '',
          owner: undefined,
          pmReport: undefined
      };
      this.expenseRow.push(newRow);
  }
  deleteLastRow(expId:number) {
    console.log('id',this.expId);
    this.pmReportService.deleteExpenseRow(this.expId).subscribe(
      () => {
        console.log('success id',this.expId);
        this.pmReportService.getExpenseDataById(this.id).subscribe(
          (data) => {
            this.expenseRow = data;
            console.log("Expense",data);
          });
      },
      (error) => {
        console.error('Something wrong from .ts:', error);
      }
    );
}
confirmDeleteLastRow(event:any,expId:number) {
  const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
    data: {
      title: 'Confirmation',
      message: '最後の行を削除してもよろしいでしょうか？',
    },
  });
console.log("Chooese ID"+expId);
this.expId=expId;
  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.deleteLastRow(expId);
    }
  });
}
onCancel() {
  this.router.navigate(['/pmreport-list']);
}
navigateToPreivousPage() {
  window.history.back();
}

}
