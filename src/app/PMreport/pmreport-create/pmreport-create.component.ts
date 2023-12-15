import { Component, ViewChild, OnInit, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileHandle } from 'src/app/Model/FileHandle';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';
@Component({
  selector: 'app-pmreport-create',
  templateUrl: './pmreport-create.component.html',
  styleUrls: ['./pmreport-create.component.css'],

})
export class PmreportCreateComponent implements OnInit {
  @ViewChild('f') myForm!: NgForm;
  companyId: number;
  backendCompany: CompanyName = {
    companyName: null
  };
  backendLogo: FileHandle = {
    file: null,
    url: null
  };
  private searchTextChanged = new Subject<string>();
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
  userInfo: UserInfo;
  owner:UserInfo;
  incomeRemarks: string;
  rentalRemarks: string;
  incomeTotal:number = 0;;
  expenseTotal:number = 0;;
  incomeData: Income[] = []; 
  rentalData: Rental[] = []; 
  selectedPropertyName: string;
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
  property: Property = {
    propertyName: '',
    id: '',
    companyId: undefined,
    propertyType: '',
    status: '',
    propertyKana: '',
    floor: '',
    room: '',
    ownerName: '',
    ownerKana: '',
    owner: undefined,
    picName: '',
    mobileFirst: '',
    mobileSecond: '',
    mobileThird: '',
    pic: undefined,
    postalFirst: '',
    postalLast: '',
    address: '',
    line1: '',
    station1: '',
    line2: '',
    station2: '',
    busStop1: '',
    busStop2: '',
    ride1: '',
    stroll1: '',
    ride2: '',
    stroll2: '',
    taxRate: 0,
    rentTsubo: 0,
    totalRent: 0,
    rentTax: '',
    serviceFeesTsubo: 0,
    serviceFeesTotal: 0,
    serviceFeesTax: '',
    parkingFees: 0,
    parkingFeesTax: '',
    repairExpenses: 0,
    repairTax: '',
    deposit: 0,
    depositTax: '',
    keyMoney: 0,
    keyMoneyTax: '',
    toalDeposit: 0,
    toalDepositTax: '',
    restorationFees: 0,
    restorationFeesTax: '',
    restorationStatus: false,
    fireInsuranceFees: 0,
    fireInsuranceFeesTax: '',
    insuranceYears: 0,
    renewalFees: 0,
    renewalFeesTax: '',
    signboardFees: 0,
    signboardFeesTax: '',
    consumptionTax: 0,
    ground: '',
    underground: '',
    elevator: false,
    structure: '',
    buildingDate: '',
    newBuild: false,
    buildNo: '',
    exclusiveArea: '',
    exclusiveStatus: '',
    layout: '',
    layoutStatus: '',
    totalUnits: '',
    layoutRemarks: '',
    classification: '',
    areaMeter: 0,
    areaTsubo: 0,
    waterSupply: '',
    gas: '',
    electricity: '',
    drainage: '',
    pets: '',
    diy: '',
    bathToilet: false,
    lightning: false,
    doorPhone: false,
    shower: false,
    furniture: false,
    twoFamily: false,
    publicBath: false,
    indoorBath: false,
    loft: false,
    internet: false,
    catv: false,
    flooring: false,
    allElectric: false,
    csAntenna: false,
    aircon: false,
    counterKitchen: false,
    bsAntenna: false,
    parking: false,
    systemKitchen: false,
    autoLock: false,
    deliveryBox: false,
    homeTel: false,
    balcony: false,
    rosette: false,
    image1: undefined,
    image2: undefined,
    image3: undefined,
    image4: undefined,
    image5: undefined,
    image6: undefined,
    image7: undefined,
    image8: undefined,
    managerName: '',
    manageCompany: '',
    managementForm: '',
    constructCompany: ''
  }
  income = {
    id: null,
    incomeRemark: "",
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
    incomeRemarks: "",
    rentTax: null,
    managementFeeTax: null,
    bicycleParkingFeeTax: null,
    signboardFeesTax: null,
    parkingFeeTax: null,
    keymoneyTax: null,
    shikikenTax: null,
    depositTax: null,
    renewalFeeTax: null,
    repairCostTax: null,
    penaltyFeeTax: null,
    owner:null
  }
  rental = {
    id: null,
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
    totalRental: "",
    contractStartDate: "",
    contractEndDate: "",
    renewalFees: null,
    rentalRemarks: "",
    owner:null
  }
  expense = {
    id: null,
    expen: "",
    voucher: "",
    expenseDate: "",
    expenseMoney: null,
    expenseTax: null,
    expenseTotal: null,
    expenseRemarks: "",
    owner:null
  }
  constructor(private router: Router,
    private userService: UserInfoService,
    private dialog: MatDialog,
    private userAuthService: UserAuthService,
    private propertyService: PropertyService,
    private pmReportService: PmReportService,
    private contractService: ContractService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer) {
    this.ownerData = {
      id: null,
      firstName: "",
      lastName: "",
      firstNamekana: "",
      lastNamekana: "",
      gender: "",
      dateOfBirth: "",
      department: "",
      phone1: 0,
      phone2: 0,
      phone3: 0,
      password: "",
      email: "",
      postalcode1: "",
      postalcode2: "",
      address: "",
      startDate: "",
      endDate: "",
      roleType: "",
      bankName: "",
      branch: "",
      accountType: "",
      accountNumber: "",
      accountName: "",
      createdDate: "",
      modifiedDate: "",
      companyId: { companyName: null },
      apportionment: "",
      logo: null
    }
    for (let i = 1; i <= 5; i++) {
      this.expenseRow.push({
        id: i,
        expenseDetail: '',
        voucher: '無し',
        expenseDate: '',
        expenseMoney: 0,
        expenseTax: 0,
        expenseTotal: 0,
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

  ngOnInit() {
    this.getCurrentUserInfo();
    this.getPICUsers();
    this.getProperties();
    this.searchTextChanged.pipe(debounceTime(300)).subscribe(() => {
      this.searchByPropertyName();
    });
 }
  getProperties() {
    this.propertyService.getPropertiesByCompanyId(this.companyId).subscribe(data => {
      this.propertyIDs = data;
      console.log(data);
    },
      (error) => {
        console.error('Error fetching owners:', error);
      }
    );
  }
  searchByPropertyName(): void {
    console.log("Property Name  " + this.propertyname);
    this.pmReportService.findByPropertyName(this.propertyname,this.companyId).subscribe((data) => {
      console.log("Property Name 2 " + this.propertyname);
      console.log("Property Name 3 " + this.companyId);
      this.results = data;
    });
  }
  onPropertyChange() {
    this.pmReportService.getOwnersByPropertyName(this.propertyname).
      subscribe((data: Property[]) => {
        this.propertyIDs = data;        
      },
        (error) => {
          console.error('Error fetching Property data:', error);
        }
      );
  }
  onInputChanged(): void {
    this.searchTextChanged.next(this.propertyname);
  } 
  selectPropertyName(event: MatAutocompleteSelectedEvent): void {    
    this.propertyname = event.option.value;
    this.selectedPropertyName = this.propertyname;   
    console.log("selected Property Name"+this.selectedPropertyName);
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
    console.log("Get Login data", this.companyId, this.logoId);
  }

  onSubmit(reportForm: NgForm) {
    console.log("Testing Form Onsubmit");
    if (reportForm.invalid) {
      Object.keys(reportForm.controls).forEach((key) => {
        reportForm.controls[key].markAsTouched();
      });
      return;
    }
    console.log("Testing Form Onsubmit12");
    const formData = new FormData();
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
    this.pmReport.pic=this.userInfo;   
    this.rental=this.rentalInfo;  
    this.income=this.incomeInfo;
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
          owner: this.owner,
          pmReport: undefined         
        });
        this.expenseTotal+=this.expenseRow[i].expenseTotal;     
      }
     
    }
    this.pmReport.totalExpense=this.expenseTotal; 
    formData.append("pmReport", new Blob([JSON.stringify(this.pmReport)], { type: "application/json" }));
    formData.append("expense", new Blob([JSON.stringify(this.expenseData)], { type: "application/json" }));
    formData.append("rental", new Blob([JSON.stringify(this.rental)], { type: "application/json" }));
    formData.append("income", new Blob([JSON.stringify(this.income)], { type: "application/json" }));
    formData.append("logoId", this.logoId.toString());
    formData.append("companyId", this.companyId.toString());
    console.log('PM', this.pmReport);
    console.log('expen', this.expenseData);
    console.log('rental', this.rental);
    console.log('income', this.income);
    console.log('incomeData', this.incomeData);
    console.log('UserData', this.userInfo);
    
    this.pmReportService.addPMreport(formData).subscribe(
      (response: PMReport) => {
        console.log(response);
        console.log('Data added successfully');
        this.router.navigate(['/report-list']);
      },
      (error: HttpErrorResponse) => {
        console.error('Error submitting contract:', error);
      }
    );   
  }

  onCancel() {
    this.myForm.resetForm();
    this.router.navigate(['/report-list']);
  }
  navigateToPreivousPage() {
    window.history.back();
  }
  getPICUsers() {
    this.userService.getUsersByCompanyId(this.companyId).subscribe((data: UserInfo[]) => {
        this.picUsers = data;
        for (const user of this.picUsers) {
          this.userInfo=user;
          this.picId=user.id.toString();
          this.mobileFirst = user.phone1.toString();
          this.mobileSecond = user.phone2.toString();
          this.mobileThird = user.phone3.toString();
          this.picName = user.firstName + " " + data[0].lastName;
          this.picNameKana = user.firstNamekana + " " + data[0].lastNamekana;
          this.userPostalFirst = user.postalcode1.toString();
          this.userPostalSecond = user.postalcode2.toString();
          this.userAddress = user.address.toString();
          console.log("User id0"+this.picId);
        }
      },
      (error) => {
        console.error('Error fetching owners:', error);
      });
  }
  onOwnerSelectionChange() {
    this.pmReportService.getOwnerName(this.ownerName).subscribe((data: UserInfo[]) => {
        this.ownerInfo = data;
        for (const owner of this.ownerInfo) {
          this.owner=owner;
          this.accountHolder = owner.accountName;
          this.accountNo = owner.accountNumber.toString();
          this.accountType = owner.accountType;
          this.bankName = owner.bankName;
          this.branchName = owner.branch;
          this.mail = owner.email;
          this.apportionment = owner.apportionment;
          this.ownerPostalFirst = owner.postalcode1;
          this.ownerPostalSecond = owner.postalcode2;
          this.ownerAddress = owner.address;
          this.password=owner.password;
        }       
      });
    this.pmReportService.getIncomeInformation(this.ownerName).subscribe(data => {
      console.log("This is income" + data);
      this.incomeInfo = data;
      this.incomeInfo.forEach(income => income.owner = this.owner);
      for (const income of this.incomeInfo) {
        this.incomeData=income;
        this.incomeTotal+=income.totalIncome;  
        console.log("This is income total" + this.incomeTotal);    
      }
      this.dataSource = new MatTableDataSource<any>(this.incomeInfo);
    });
    this.pmReportService.getRentalInformation(this.ownerName).subscribe(data => {
      console.log("This is rental" + data);
      this.rentalInfo = data;
      this.rentalInfo.forEach(rental => rental.owner = this.owner);
      this.dataSource2 = new MatTableDataSource<any>(this.rentalInfo);
    });
  }

  onInputChange() {
    this.calculateTotals();
  }
  calculateTotals() {
    this.expenseRow.forEach(row => {
      const amount = row.expenseMoney;
      const originalExpTax = row.expenseTax;
  
      if (!isNaN(amount) && !isNaN(originalExpTax) && amount > 0 && originalExpTax > 0) {
        row.expenseTotal = amount + (amount * (originalExpTax / 100));
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
deleteLastRow() {
  if (this.expenseRow.length > 0) {
      this.expenseRow.pop();
  }
}

confirmDeleteLastRow() {
const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
  data: {
    title: 'Confirmation',
    message: '最後の行を削除してもよろしいでしょうか？',
  },
});

dialogRef.afterClosed().subscribe((result) => {
  if (result) {
    this.deleteLastRow();
  }
});
}
  

}