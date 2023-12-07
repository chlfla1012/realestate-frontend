import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CompanyName } from 'src/app/Model/CompanyName';
import { PMReport } from 'src/app/Model/PMReport';
import { Property } from 'src/app/Model/Property';
import { UserInfo } from 'src/app/Model/userInfo';

@Component({
  selector: 'app-pmreport-create',
  templateUrl: './pmreport-create.component.html',
  styleUrls: ['./pmreport-create.component.css']
})
export class PmreportCreateComponent {
  ownerId: string;
  currentRoute: string;
  selectedOption:string;
  properties: any;
  searchPropertyName: string;
  searchPropertyType: string;
  deleteStatus: boolean=true;
  companyName: CompanyName;
  companyId: number;
  backendCompany: CompanyName = {
    
    companyName: null
  };
  userAuthService: any;
  propertyService: any;

  property: PMReport = {
    id : null,
    propertyName :"",
    ownerName : "",
    mail : "",
    bankName : "",
    branchName : "",
    accountType : "",
    accountNo : null,
    accountName : "",
    apportionment : "",
    targetMonth : "",
    picName : "",
    totalIncome : null,
    totalExpense : null,
    createdName : "",
    createdDate : "",
    modifiedName : "",
    modifiedDate: "",
    companyId: { companyName: null },
    logo : null,
    contractId: null,
    propertyId: null,
    invoiceId: null,
    paymentCheckId : null
  }

  income = {
    id : "",
    incomeRemark : "",
    // owner : UserInfo,
    // pmReport : PMReport,
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
    // owner : UserInfo,
    // pmReport : PMReport
}

onContentChange(event: Event): void {
  // Handle content changes here
  const editedContent = (event.target as HTMLElement).innerText;
  console.log('Content changed:', editedContent);
}


  ngOnInit(): void {
   
    // this.getAllProperties();
    // this.getCurrentCompanyName();
    // this.getPropertiesByCompanyName();
    this.getCurrentUserInfo();
    this.getPropertiesByCompanyId();
    
  
   
  }
  getPropertiesByCompanyId() {
    this.propertyService.getPropertiesByCompanyId(this.companyId).subscribe(data => {
    this.properties = data;
     
    this.dataSource = new MatTableDataSource<any>(this.properties);
    console.log("Data"+this.dataSource);
    // Set the paginator for the MatTableDataSource
    this.dataSource.paginator = this.paginator;
      console.log("List" +this.properties);
    //  this.dtTrigger.next(null);
    });
   
    this.dataSource = new MatTableDataSource<any>(this.properties);
    console.log("Data"+this.dataSource);
    // Set the paginator for the MatTableDataSource
    this.dataSource.paginator = this.paginator;
  }
  getCurrentUserInfo() {
    this.userAuthService.getCompanyId().subscribe(companyId => {
      this.companyId = companyId;
    });

    this.userAuthService.getCompanyName().subscribe(backendCompany => {
      this.backendCompany = backendCompany;
    });

   
    console.log("Get Login data", this.companyId);
  }



  filteredData: Property[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['号室', '入居者名前', '対象月', '賃料',
  '共益費', '駐車料', '駐輪料', '礼金', '敷金','保証金','更新料','退去時補修費','違約金','看板料','消費税','その他','合計金額','備考'];
    
  //   dataSource2: MatTableDataSource<any>;
  //   displayedColumns2: string[] = ['支出明細', '領収書', '年/月', '金額','消費税', '合計金額', '備考'];

  dataSource2: MatTableDataSource<any>;
  displayedColumns2: string[] = ['号室', '区分', '入居者名前', '面積(m2)','面積(坪)','賃料(円/坪)', '賃料(総額)', '共益費(円/坪)','共益費(総額)','共込賃料(円/坪)','敷金','保証金','契約開始日','契約終了日','更新料','備考'];

    constructor(private router: Router,
    private dialog: MatDialog,private snackBar:MatSnackBar) {
    }
    navigateToPreivousPage() {
      window.history.back();
    }
    onCancel() {
      this.router.navigate(['/customer-list']);
    }
}
