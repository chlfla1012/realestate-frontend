import { Component, ViewChild, OnInit} from '@angular/core';
import { NgForm} from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';
import { FileHandle } from 'src/app/Model/FileHandle';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-pmreport-details',
  templateUrl: './pmreport-details.component.html',
  styleUrls: ['./pmreport-details.component.css']
})
export class PmreportDetailsComponent {
  @ViewChild('f') myForm!: NgForm;
  companyId: number;
  backendCompany: CompanyName = {
    companyName: null
  };
  backendLogo: FileHandle = {
    file: null,
    url: null
  };
  
  dataSource: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any>;
  id: null;
  companyName: CompanyName;
  ownerId: string;
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
  ownerData: UserInfo;
  picData: UserInfo;
  incomeInfo: any;
  rentalInfo: any;
  ownerInfo: any;
  userInfo: any;
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
    pic : null
  }
  constructor(private router: Router,
    private userService: UserInfoService,
    private dialog: MatDialog,
    private route:ActivatedRoute,
    private userAuthService: UserAuthService,
    private propertyService: PropertyService,
    private pmReportService: PmReportService,
    private contractService: ContractService,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer) {
    for (let i = 1; i <= 5; i++) {
      this.expenseRow.push({
        id: i,
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
  ngOnInit(): void {
    this.getPMReportById()
  }
  getPMReportById() {
    this.id= this.route.snapshot.params['id'];
    this.pmReportService.getPMReportById(this.id).subscribe(
      (data:any) => {
        this.pmReport = data;
        console.log("The PM ID is "+data.picid);
        console.log("Month",data.targetMonth);
      });
    this.pmReportService.getExpenseDataById(this.id).subscribe(
      (data) => {
        this.expenseRow = data;
        console.log("Expense",data);
      });
    this.pmReportService.getIncomeDataById(this.id).subscribe(
      (data:Income[]) => {
        this.dataSource.data = data;
        console.log("Income",data);
      });
    this.pmReportService.getRentalDataById(this.id).subscribe(
      (data:Rental[]) => {
        this.dataSource2.data= data;
        console.log("Rental",data);
      });
   }
  navigateToPreivousPage() {
    window.history.back();
  }
  navigateToUpdatePage(id: string) {
    this.router.navigate(['/report-edit',id]);
   }

  confirmDelete(id: string, name: string) : void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        message: `  選択されたレポート:「${name}」のPMレポート情報内容を削除します`,
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.pmReportService.deletePMReport(id).subscribe(
          () => {
            this.router.navigate(['/pmreport-list']);
            console.log('PM report deleted successfully.');
          },
          (error) => {
            console.error('An error occurred:', error);
              this.showForeignKeyErrorSnackbar(name);
  
          }
        );
      }
    });
  }
  private showForeignKeyErrorSnackbar(name: string): void {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';
  
    this.snackBar.open(`選択されたレポート:「${name}」の契約情報内容を利用しているところがあるので、削除することは出来ません。`, '', {
      duration: 2000, // Adjust duration as needed
      horizontalPosition,
      verticalPosition,
      panelClass: ['blue-snackbar']
    });
  }
}

