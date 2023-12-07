import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Borrower } from 'src/app/Model/Borrower';
import { CompanyName } from 'src/app/Model/CompanyName';
import { Contract } from 'src/app/Model/Contract';
import { FileHandle } from 'src/app/Model/FileHandle';
import { Invoice } from 'src/app/Model/Invoice';
import { InvoiceList } from 'src/app/Model/InvoiceList';
import { Lender } from 'src/app/Model/Lender';
import { Property } from 'src/app/Model/Property';
import { Tenant } from 'src/app/Model/Tenant';
import { UserInfo } from 'src/app/Model/userInfo';
import { ContractService } from 'src/app/Service/Contract/ContractService';
import { InvoiceServiceService } from 'src/app/Service/InvoiceInfo/invoice-service.service';
import { PropertyService } from 'src/app/Service/Property/PropertyService';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.css']
})
export class InvoiceCreateComponent {

  @ViewChild('f') myForm!: NgForm;

  
  errorMessage: string = '';
  currentDate = new Date().toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
  // currentDate = new Date().toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
  // currentDate:string = new Date().toISOString().split('T')[0];
  //不動産会社情報 line 27~37//////
  userInfo: UserInfo[];
  picId: string;//to retrieve the company address and postal code by user table and company table;
  companyfullName: string;
  companyphone1: string;
  companyphone2: string;
  companyphone3: string;
  companypostalCode1: string;
  companypostalCode2: string;
  companyAddress: string;
  //物件情報 line 38~45//////
  propertyId: string;
  propertyname: string;
  roomno: string;
  floor: string;
  buildingPostalCode1: string;
  buildingPostalCode2: string;
  buildingAddress: string;
  bcpicName: string;
  billingDate: string;

  taxRate: number;

  rent: number;
  managementFee: number;
  parkingFee: number;
  bicycleParkingFee: number;
  keymoney: number;
  shikikin: number;
  deposit: number;
  renewalFee: number;
  repairCost: number;
  penaltyFee: number;
  signboardFee: number;
  brokerageFee: number;

  rentTax: string;
  managementFeeTax: string;
  parkingFeeTax: string;
  bicycleParkingFeeTax: string;
  keymoneyTax: string;
  shikikinTax: string;
  depositTax: string;
  renewalFeeTax: string;
  repairCostTax: string;
  penaltyFeeTax: string;
  signboardFeeTax: string;
  brokerageFeeTax: string;

  rentPrice: number;
  rentConsumeTax: number;
  rentTotalPrice: number;

  managementFeePrice: number;
  managementFeeConsumeTax: number;
  managementFeeTotalPrice: number;

  brokerageFeePrice: number;
  brokerageFeeConsumeTax: number;
  brokerageFeeTotalPrice: number;

  parkingFeePrice: number;
  parkingFeeConsumeTax: number;
  parkingFeeTotalPrice: number;

  bicycleParkingFeePrice: number;
  bicycleParkingFeeConsumeTax: number;
  bicycleParkingFeeTotalPrice: number;

  keymoneyFeePrice: number;
  keymoneyFeeConsumeTax: number;
  keymoneyFeeTotalPrice: number;

  shikikinPrice: number;
  shikikinConsumeTax: number;
  shikikinTotalPrice: number;

  depositPrice: number;
  depositConsumeTax: number;
  depositTotalPrice: number;

  renewalFeePrice: number;
  renewalFeeConsumeTax: number;
  renewalFeeTotalPrice: number;

  repairCostPrice: number;
  repairCostConsumeTax: number;
  repairCostTotalPrice: number;

  penaltyFeePrice: number;
  penaltyFeeConsumeTax: number;
  penaltyFeeTotalPrice: number;

  signboardFeePrice: number;
  signboardFeeConsumeTax: number;
  signboardFeeTotalPrice: number;

  electricBill: number = 0;
  electricBillTax: number = 0;
  electricBillTotal: number = 0;

  waterBill: number;
  waterBillTax: number;
  waterBillTotal: number;

  gasBill: number;
  gasBillTax: number;
  gasBillTotal: number;

  constructionBill: number;
  constructionBillTax: number;
  constructionBillTotal: number;

  workAmountFirst: number;
  workTaxFirst: number;
  workFirstTotal: number;

  workAmountSecond: number;
  workTaxsecond: number;
  workSecondTotal: number;

  totalSumOne: number;
  totalSumTwo: number;
  totalSumThree: number;
  totalSumPrice: number;

  bankName: string;
  branchName: string;
  accountType: string;
  accountNo: string;
  accountName: string;

  propertyIDs: Property[];
  propertyData: Property;
  contractIDs: any[];
  borrowerIDs: any[];
  contractData1: any;
  contractId: string;
  getContractId: string;
  getBorrowerCoporate: string;
  //getBorrowerId:Long;


  invoicelistId: InvoiceList
  logoId: number;
  companyId: number;
  backendCompany: CompanyName = {
    companyName: null
  };

  backendLogo: FileHandle = {
    file: null,
    url: null
  };
  containers: boolean[] = [true, false, false, false, false];
  logoImage: SafeUrl;
  ///////////////******************************** *////////////// 
  userData: UserInfo;
  picData: UserInfo;
  contracts: Contract;
  borrower: Borrower;
  lender: Lender;
  tenant: Tenant;
  contractBorrowerName: string;

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

  contract: Contract = {
    companyId: {
      companyName: null
    },
    id: null,
    propertyName: null,
    roomno: null,
    ownerName: null,
    ownerKana: null,
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
    picName: null,
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
  invoiceForm: any;
  propertyIdforEdit:string;

  constructor(private router: Router,
    private userService: UserInfoService,
    private contractService: ContractService,
    private propertyService: PropertyService,
    private invoiceService: InvoiceServiceService,
    private userAuthService: UserAuthService,
    //@Inject(LOCALE_ID) private locale: string
  ) {
    this.picData = {
      id: null,
      firstName: "",
      lastName: "",
      firstNamekana: "",
      lastNamekana: "",
      gender: "",
      dateOfBirth: "",
      department: "",
      phone1: null,
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
      apportionment: "",
      companyId: { companyName: null },

      logo: null
    }
    this.contractData1 = {
      companyId: { companyName: null },
      id: null,
      propertyName: null,
      roomno: null,
      ownerName: null,
      ownerKana: null,
      lenderId: {
        id: undefined,
        lenderType: 'LK',
        lenderFirstName: null,
        lenderLastName: null,
        lenderFirstKana: null,
        lenderLastKana: null,
        lenderTelFirst: null,
        lenderTelSecond: null,
        lenderTelThird: null,
        lenderPostalFirst: null,
        lenderPostalSecond: null,
        lenderAddress: null,
        lenderMemo: null,
        lenderCooperate: null,
        lcKana: null,
        lcpicFirstName: null,
        lcpicLastName: null,
        lcpicFirstKana: null,
        lcpicLastKana: null,
        lcMail: null,
        lcTelFirst: null,
        lcTelSecond: null,
        lcTelThird: null,
        lcPostalFirst: null,
        lcPostalSecond: null,
        lcAddress: null,
        lcMemo: null,
      },
      borrowerId: {
        id: undefined,
        borrowerType: 'BK',
        borrowerFirstName: null,
        borrowerLastName: null,
        borrowerFirstKana: null,
        borrowerLastKana: null,
        borrowerTelFirst: null,
        borrowerTelSecond: null,
        borrowerTelThird: null,
        borrowerPostalFirst: null,
        borrowerPostalSecond: null,
        borrowerAddress: null,
        borrowerMemo: null,
        borrowerCooperate: null,
        bcKana: null,
        bcpicFirstName: null,
        bcpicLastName: null,
        bcpicFirstKana: null,
        bcpicLastKana: null,
        bcMail: null,
        bcTelFirst: null,
        bcTelSecond: null,
        bcTelThird: null,
        bcPostalFirst: null,
        bcPostalSecond: null,
        bcAddress: null,
        bcMemo: null,

      },
      tenantId: {
        id: undefined,
        tenantFirstName: null,
        tenantLastName: null,
        tenantFirstKana: null,
        tenantLastKana: null,
        tenantTelFirst: null,
        tenantTelSecond: null,
        tenantTelThird: null,
        tenantFurikomisaki: null,

      },
      contractStartDate: null,
      contractEndDate: null,
      contractLength: null,
      contractMemo: null,

      classification: null,
      taxRate: null,
      rent: 0.00,
      rentTax: "税込",
      managementFee: 0.00,
      managementFeeTax: null,
      parkingFee: 0.00,
      parkingFeeTax: null,
      bicycleParkingFee: 0.00,
      bicycleParkingFeeTax: null,
      keymoney: 0.00,
      keymoneyTax: null,
      shikiken: 0.00,
      shikikenTax: null,
      deposit: 0.00,
      depositTax: null,
      renewalFee: 0.00,
      renewalFeeTax: null,
      repairCost: 0.00,
      repairCostTax: null,
      departureTime: false,
      penaltyFee: 0.00,
      penaltyFeeTax: null,
      signboardFee: 0.00,
      signboardFeeTax: null,
      brokerageFee: 0.00,
      brokerageFeeTax: null,
      totalCost: 0.00,
      bankName: null,
      branchName: null,
      accountType: null,
      accountNo: null,
      accountName: null,
      apportionment: null,
      picName: null,
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
      tenantFullNameKana: null

    }

  }

  ngOnInit() {
    console.log(this.currentDate);
    console.log("Company Name "+this.backendCompany.companyName);
    this.companyfullName = this.userAuthService.getFirstName() + " " + this.userAuthService.getLastName();
    this.companyphone1 = this.userAuthService.getPhone1();
    this.companyphone2 = this.userAuthService.getPhone2();
    this.companyphone3 = this.userAuthService.getPhone3();
    this.picId = this.userAuthService.getPicId();//company Id
    // console.log("This is companyfullName. "+this.companyfullName);
    this.getCurrentUserByCompanyId();
    this.getCurrentUserInfo();
    this.getContractInfo();
    this.getProperties();
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

    console.log("Get Login company name data", this.backendCompany.companyName,this.logoId);
  }

  getCurrentUserByCompanyId() {
    this.userService.getUserAddressByCompanyId(this.picId).subscribe(
      (data: UserInfo[]) => {
        this.userInfo = data;
        console.log("User address by company id " + data);
        for (const user of this.userInfo) {
          this.companypostalCode1 = user.postalcode1.toString();
          this.companypostalCode2 = user.postalcode2.toString();
          this.companyAddress = user.address;
          console.log("Company Address : " + this.companyAddress);
        }
        // console.log(this.companyAddress);
      },
      (error) => {
        console.error('Error fetching PIC data:', error);
      }
    );
  }

  getContractInfo() {
    this.invoiceService.getContractsByBorrowerType(this.companyId).subscribe((data: any) => {
      this.contractIDs = data;
      for (const contractInfo of data) {
        this.getContractId = contractInfo.id;
        // this.propertyIdforEdit = contractInfo.property.Id;
        this.getBorrowerCoporate = contractInfo.borrower.borrowerCooperate;
        console.log("Hello Contract " + this.getContractId);
        console.log("the contract length " + contractInfo.borrower.borrowerCooperate);
        console.log("法人担当者名　"+this.bcpicName);
        console.log("物件ID　"+this.propertyIdforEdit);
      }
    }, (error) => {
      console.error('Error fetching owners:', error);
    }
    );
  }

  getProperties() {
    this.invoiceService.getPropertyByBorrowerType(this.companyId).subscribe(data => {
      this.propertyIDs = data;
       //console.log("Hello PropertyData "+this.propertyIDs);
    }, (error) => {
      console.error('Error fetching owners:', error);
    }
    );
  }

  onPropertySelectionChange() {
    this.propertyService.getPropertyById(this.propertyId).
      subscribe((data: any) => {
        this.propertyIdforEdit = this.propertyId;
        // this.invoiceService.setPropertyId(this.propertyId);
         console.log("Property id  for"+this.propertyIdforEdit);
        this.roomno = data.room;
        this.floor = data.floor;
        this.propertyname = data.propertyName;
        this.buildingPostalCode1 = data.postalFirst;
        this.buildingPostalCode2 = data.postalLast;
        this.buildingAddress = data.address;
        //console.log("this is check for selected property room " + this.invoiceService.getPropertyId());
      },
        (error) => {
          console.error('Error fetching Property data:', error);
        }

      );
  }

   

  onContractSelectionChange() {
    this.contractService.getcontractById(this.contractId).
      subscribe((data: any) => {
        // this.getBorrowerCoporate =data.borrower.borrowerCooperate;
        this.bcpicName = data.borrower.bcpicFirstName + " " + data.borrower.bcpicLastName;
        console.log("担当者名 is "+this.bcpicName);
        //this.billingDate = data.createdDate;
        this.taxRate = data.taxRate;

        this.rent = data.rent;
        this.managementFee = data.managementFee;
        this.parkingFee = data.parkingFee;
        this.bicycleParkingFee = data.bicycleParkingFee;
        this.keymoney = data.keymoney;
        this.shikikin = data.shikiken;
        this.deposit = data.deposit;
        this.renewalFee = data.renewalFee;
        this.repairCost = data.repairCost;
        this.penaltyFee = data.penaltyFee;
        this.signboardFee = data.signboardFee;
        this.brokerageFee = data.brokerageFee;

        this.rentTax = data.rentTax;
        this.managementFeeTax = data.managementFeeTax;
        this.parkingFeeTax = data.parkingFeeTax;
        this.bicycleParkingFeeTax = data.bicycleParkingFeeTax;
        this.keymoneyTax = data.keymoneyTax;
        this.shikikinTax = data.shikikenTax;
        this.renewalFeeTax = data.renewalFeeTax;
        this.depositTax = data.depositTax;
        this.repairCostTax = data.repairCostTax;
        this.penaltyFeeTax = data.penaltyFeeTax;
        this.signboardFeeTax = data.signboardFeeTax;
        this.brokerageFeeTax = data.brokerageFeeTax;
        //******賃料
        if (this.rentTax == "税込") {
          this.rentPrice = this.rent - (this.rent * this.taxRate / 100);
          this.rentConsumeTax = this.rent * this.taxRate / 100;
        }
        else {
          this.rentPrice = this.rent;
          this.rentConsumeTax = 0;
        }
        this.rentTotalPrice = this.rentPrice + this.rentConsumeTax;
        this.totalSumCalculate();
        //******共益費
        if (this.managementFeeTax == "税込") {
          this.managementFeePrice = this.managementFee - (this.managementFee * this.taxRate / 100);
          this.managementFeeConsumeTax = this.managementFee * this.taxRate / 100;
        }
        else {
          this.managementFeePrice = this.managementFee;
          this.managementFeeConsumeTax = 0;
        }
        this.managementFeeTotalPrice = this.managementFeePrice + this.managementFeeConsumeTax;
        this.totalSumCalculate();
        //******仲介手数料
        if (this.brokerageFeeTax == "税込") {
          this.brokerageFeePrice = this.brokerageFee - (this.brokerageFee * this.taxRate / 100);
          this.brokerageFeeConsumeTax = this.brokerageFee * this.taxRate / 100;
        }
        else {
          this.brokerageFeePrice = this.brokerageFee;
          this.brokerageFeeConsumeTax = 0;
        }
        this.brokerageFeeTotalPrice = this.brokerageFeePrice + this.brokerageFeeConsumeTax;
        this.totalSumCalculate();
        //******駐車料
        if (this.parkingFeeTax == "税込") {
          this.parkingFeePrice = this.parkingFee - (this.parkingFee * this.taxRate / 100);
          this.parkingFeeConsumeTax = this.parkingFee * this.taxRate / 100;
        }
        else {
          this.parkingFeePrice = this.parkingFee;
          this.parkingFeeConsumeTax = 0;
        }
        this.parkingFeeTotalPrice = this.parkingFeePrice + this.parkingFeeConsumeTax;
        this.totalSumCalculate();
        //******駐輪料
        if (this.bicycleParkingFeeTax == "税込") {
          this.bicycleParkingFeePrice = this.bicycleParkingFee - (this.bicycleParkingFee * this.taxRate / 100);
          this.bicycleParkingFeeConsumeTax = this.bicycleParkingFee * this.taxRate / 100;
        }
        else {
          this.bicycleParkingFeePrice = this.brokerageFee;
          this.bicycleParkingFeeConsumeTax = 0;
        }
        this.bicycleParkingFeeTotalPrice = this.bicycleParkingFeePrice + this.bicycleParkingFeeConsumeTax;
        this.totalSumCalculate();
        //******礼金
        if (this.keymoneyTax == "税込") {
          this.keymoneyFeePrice = this.keymoney - (this.keymoney * this.taxRate / 100);
          this.keymoneyFeeConsumeTax = this.keymoney * this.taxRate / 100;
        }
        else {
          this.keymoneyFeePrice = this.keymoney;
          this.keymoneyFeeConsumeTax = 0;
        }
        this.keymoneyFeeTotalPrice = this.keymoneyFeePrice + this.keymoneyFeeConsumeTax;
        this.totalSumCalculate();
        //******敷金
        if (this.shikikinTax == "税込") {
          this.shikikinPrice = this.shikikin - (this.shikikin * this.taxRate / 100);
          this.shikikinConsumeTax = this.shikikin * this.taxRate / 100;
        }
        else {
          this.shikikinPrice = this.shikikin;
          this.shikikinConsumeTax = 0;
        }
        this.shikikinTotalPrice = this.shikikinPrice + this.shikikinConsumeTax;
        this.totalSumCalculate();
        //******保証金
        if (this.depositTax == "税込") {
          this.depositPrice = this.deposit - (this.deposit * this.taxRate / 100);
          this.depositConsumeTax = this.deposit * this.taxRate / 100;
        }
        else {
          this.depositPrice = this.deposit;
          this.depositConsumeTax = 0;
        }
        this.depositTotalPrice = this.depositPrice + this.depositConsumeTax;
        this.totalSumCalculate();
        //******更新料  
        if (this.renewalFeeTax == "税込") {
          this.renewalFeePrice = this.renewalFee - (this.renewalFee * this.taxRate / 100);
          this.renewalFeeConsumeTax = this.renewalFee * this.taxRate / 100;
        }
        else {
          this.renewalFeePrice = this.renewalFee;
          this.renewalFeeConsumeTax = 0;
        }
        this.renewalFeeTotalPrice = this.renewalFeePrice + this.renewalFeeConsumeTax;
        this.totalSumCalculate();
        //******退去時補修費
        if (this.repairCostTax == "税込") {
          this.repairCostPrice = this.repairCost - (this.repairCost * this.taxRate / 100);
          this.repairCostConsumeTax = this.repairCost * this.taxRate / 100;
        }
        else {
          this.repairCostPrice = this.repairCost;
          this.repairCostConsumeTax = 0;
        }
        this.repairCostTotalPrice = this.repairCostPrice + this.repairCostConsumeTax;
        this.totalSumCalculate();
        //******違約金
        if (this.penaltyFeeTax == "税込") {
          this.penaltyFeePrice = this.penaltyFee - (this.penaltyFee * this.taxRate / 100);
          this.penaltyFeeConsumeTax = this.penaltyFee * this.taxRate / 100;
        }
        else {
          this.penaltyFeePrice = this.penaltyFee;
          this.penaltyFeeConsumeTax = 0;
        }
        this.penaltyFeeTotalPrice = this.penaltyFeePrice + this.penaltyFeeConsumeTax;
        this.totalSumCalculate();
        //******看板料
        if (this.signboardFeeTax == "税込") {
          this.signboardFeePrice = this.signboardFee - (this.signboardFee * this.taxRate / 100);
          this.signboardFeeConsumeTax = this.signboardFee * this.taxRate / 100;
        }
        else {
          this.signboardFeePrice = this.signboardFee;
          this.signboardFeeConsumeTax = 0;
        }
        this.signboardFeeTotalPrice = this.signboardFeePrice + this.signboardFeeConsumeTax;
        this.totalSumCalculate();

        console.log("this is check for selected property room " + data.managementFeeTax);

        this.bankName = data.bankName;
        this.branchName = data.branchName;
        this.accountType = data.accountType;
        this.accountName = data.accountName;
        this.accountNo = data.accountNo;
      },
        (error) => {
          console.error('Error fetching Property data:', error);
        }
      );
  }

  totalSumCalculate() {
    this.totalSumOne = this.rentTotalPrice + this.managementFeeTotalPrice + this.brokerageFeeTotalPrice +
      this.parkingFeeTotalPrice + this.bicycleParkingFeeTotalPrice + this.keymoneyFeeTotalPrice +
      this.shikikinTotalPrice + this.depositTotalPrice + this.renewalFeeTotalPrice +
      this.repairCostTotalPrice + this.penaltyFeeTotalPrice + this.signboardFeeTotalPrice;

    if (!isNaN(this.electricBillTotal)) {
      this.electricBillTotal = this.electricBillTotal;
    } else {
      this.electricBillTotal = 0;
    }

    if (!isNaN(this.waterBillTotal)) {
      this.waterBillTotal = this.waterBillTotal;
    } else {
      this.waterBillTotal = 0;
    }

    if (!isNaN(this.gasBillTotal)) {
      this.gasBillTotal = this.gasBillTotal;
    } else {
      this.gasBillTotal = 0;
    }

    if (!isNaN(this.constructionBillTotal)) {
      this.constructionBillTotal = this.constructionBillTotal;
    } else {
      this.constructionBillTotal = 0;
    }

    if (!isNaN(this.workFirstTotal)) {
      this.workFirstTotal = this.workFirstTotal;
    } else {
      this.workFirstTotal = 0;
    }

    if (!isNaN(this.workSecondTotal)) {
      this.workSecondTotal = this.workSecondTotal;
    } else {
      this.workSecondTotal = 0;
    }

    this.totalSumTwo = this.electricBillTotal+this.waterBillTotal+this.gasBillTotal+
    this.constructionBillTotal + this.workFirstTotal + this.workSecondTotal;

    // this.totalSumThree = this.constructionBillTotal + this.workFirstTotal + this.workSecondTotal;
    this.totalSumPrice = this.totalSumOne + this.totalSumTwo;

    console.log("total sum price " + this.totalSumPrice);

  }
  
  electricBillCalculate() {
    this.electricBill = this.myForm.value.electricBill;
    this.electricBillTax = this.myForm.value.electricBillTax;
    this.electricBillTotal = this.electricBill + this.electricBillTax;
    //console.log(this.electricBillTotal);
    this.totalSumCalculate();
  }

  waterBillCalculate() {
    this.waterBill = this.myForm.value.waterBill;
    console.log(this.waterBill);
    this.waterBillTax = this.myForm.value.waterBillTax;
    console.log(this.waterBillTax);
    this.waterBillTotal = this.waterBill + this.waterBillTax;
    console.log(this.waterBillTotal);
    this.totalSumCalculate();
  }

  gasBillCalculate() {
    this.gasBill = this.myForm.value.gasBill;
    console.log(this.gasBill);
    this.gasBillTax = this.myForm.value.gasBillTax;
    console.log(this.gasBillTax);
    this.gasBillTotal = this.gasBill + this.gasBillTax;
    console.log(this.gasBillTotal);
    this.totalSumCalculate();
  }

  constructionBillCalculate() {
    this.constructionBill = this.myForm.value.constructionBill;
    this.constructionBillTax = this.myForm.value.constructionBillTax;
    this.constructionBillTotal = this.constructionBill + this.constructionBillTax;
    console.log(this.gasBillTax);
    this.totalSumCalculate();
  }

  workFirstCalculate() {
    this.workAmountFirst = this.myForm.value.workAmountFirst;
    this.workTaxFirst = this.myForm.value.workTaxFirst;
    this.workFirstTotal = this.workAmountFirst + this.workTaxFirst;
    //console.log(this.gasBillTax);
    this.totalSumCalculate();
  }

  workSecondCalculate() {
    this.workAmountSecond = this.myForm.value.workAmountSecond;
    this.workTaxsecond = this.myForm.value.workTaxsecond;
    this.workSecondTotal = this.workAmountSecond + this.workTaxsecond;
    console.log(this.workSecondTotal);
    this.totalSumCalculate();
  }

  onSubmit(invoiceForm: NgForm) {
    if (invoiceForm.invalid) {
      // If the form is invalid, mark all form controls as touched
      Object.keys(invoiceForm.controls).forEach((key) => {
        invoiceForm.controls[key].markAsTouched();
      });
      console.log("Form Errors");
      return;
    }
    //console.log("this.invoiceInfo.paymentDueDate "+this.invoiceInfo.paymentDueDate);
    //console.log("this.invoiceList.rentUsagePeriod "+this.invoiceInfo.invoicelistObj.rentUsagePeriod);
    //this.electricBillTotal = this.electricBill + this.electricBillTax;
     
    //不動産会社情報
    this.invoiceInfo.companyId = { companyName: this.backendCompany.companyName };
    this.invoiceInfo.personName = this.companyfullName;
    this.invoiceInfo.mobileFirst = this.companyphone1;
    this.invoiceInfo.mobileSecond = this.companyphone2;
    this.invoiceInfo.mobileThird = this.companyphone3;
    this.invoiceInfo.companyPostalFirst = this.companypostalCode1;
    this.invoiceInfo.companyPostalSecond = this.companypostalCode2;
    this.invoiceInfo.companyAddress = this.companyAddress;
    //請求期間情報
    this.invoiceInfo.lenderCooperate = this.getBorrowerCoporate;
    this.invoiceInfo.lenderPersonName = this.bcpicName;
    this.invoiceInfo.billingDate = this.currentDate.toString();
    this.invoiceInfo.contractData = this.getContractId;
    //物件情報
    this.invoiceInfo.propertyid = this.propertyIdforEdit;
    this.invoiceInfo.propertyName = this.propertyname;
    this.invoiceInfo.roomNo = this.roomno;
    this.invoiceInfo.floor = this.floor;
    this.invoiceInfo.buildingPostalFirst = this.buildingPostalCode1;
    this.invoiceInfo.buildingPostalLast = this.buildingPostalCode2;
    this.invoiceInfo.address = this.buildingAddress;
    //支払い必要の情報
    this.invoiceInfo.invoicelistObj.rent = this.rentPrice;
    this.invoiceInfo.invoicelistObj.rentTax = this.rentConsumeTax;
    this.invoiceInfo.invoicelistObj.rentTotal = this.rent;

    this.invoiceInfo.invoicelistObj.serviceFee = this.managementFeePrice;
    this.invoiceInfo.invoicelistObj.serviceFeeTax = this.managementFeeConsumeTax;
    this.invoiceInfo.invoicelistObj.serviceFeeTotal = this.managementFee;

    this.invoiceInfo.invoicelistObj.brokerageFee = this.brokerageFeePrice;
    this.invoiceInfo.invoicelistObj.brokerageFeeTax = this.brokerageFeeConsumeTax;
    this.invoiceInfo.invoicelistObj.brokerageFeeTotal = this.brokerageFeeTotalPrice;

    this.invoiceInfo.invoicelistObj.parkingFee = this.parkingFeePrice;
    this.invoiceInfo.invoicelistObj.parkingFeeTax = this.parkingFeeConsumeTax;
    this.invoiceInfo.invoicelistObj.parkingFeeTotal = this.parkingFeeTotalPrice;

    this.invoiceInfo.invoicelistObj.bicycleParkingFee = this.bicycleParkingFeePrice;
    this.invoiceInfo.invoicelistObj.bicycleParkingFeeTax = this.bicycleParkingFeeConsumeTax;
    this.invoiceInfo.invoicelistObj.bicycleParkingFeeTotal = this.bicycleParkingFeeTotalPrice;

    this.invoiceInfo.invoicelistObj.keymoney = this.keymoneyFeePrice;
    this.invoiceInfo.invoicelistObj.keymoneyTax = this.keymoneyFeeConsumeTax;
    this.invoiceInfo.invoicelistObj.keymoneyTotal = this.keymoneyFeeTotalPrice; 

    this.invoiceInfo.invoicelistObj.shikikin = this.shikikinPrice;
    this.invoiceInfo.invoicelistObj.shikikinTax = this.shikikinConsumeTax;
    this.invoiceInfo.invoicelistObj.shikikinTotal = this.shikikinTotalPrice;

    this.invoiceInfo.invoicelistObj.deposit = this.depositPrice;
    this.invoiceInfo.invoicelistObj.depositTax = this.depositConsumeTax;
    this.invoiceInfo.invoicelistObj.depositTotal = this.depositTotalPrice;

    this.invoiceInfo.invoicelistObj.renewalFee = this.renewalFeePrice;
    this.invoiceInfo.invoicelistObj.renewalFeeTax = this.renewalFeeConsumeTax;
    this.invoiceInfo.invoicelistObj.renewalFeeTotal = this.renewalFeeTotalPrice;

    this.invoiceInfo.invoicelistObj.repairCost = this.repairCostPrice;
    this.invoiceInfo.invoicelistObj.repairCostTax = this.repairCostConsumeTax;
    this.invoiceInfo.invoicelistObj.repairCostTotal = this.repairCostTotalPrice;

    this.invoiceInfo.invoicelistObj.penaltyFee = this.penaltyFeePrice;
    this.invoiceInfo.invoicelistObj.penaltyFeeTax = this.penaltyFeeConsumeTax;
    this.invoiceInfo.invoicelistObj.penaltyFeeTotal = this.penaltyFeeTotalPrice;

    this.invoiceInfo.invoicelistObj.signboard = this.signboardFeePrice;
    this.invoiceInfo.invoicelistObj.signboardTax = this.signboardFeeConsumeTax;
    this.invoiceInfo.invoicelistObj.signboardTotal = this.signboardFeeTotalPrice;

    this.invoiceInfo.invoicelistObj.electricBillTotal = this.electricBillTotal;
    this.invoiceInfo.invoicelistObj.waterBillTotal =this.waterBillTotal;
    this.invoiceInfo.invoicelistObj.gasBillTotal = this.gasBillTotal;
    this.invoiceInfo.invoicelistObj.constructionBillTotal = this.constructionBillTotal;
    this.invoiceInfo.invoicelistObj.workAmountTotalFirst = this.workFirstTotal;
    this.invoiceInfo.invoicelistObj.workTotalSecond = this.workSecondTotal;
    this.invoiceInfo.invoicelistObj.total = this.totalSumPrice;

    //振込先情報
    this.invoiceInfo.bankName = this.bankName;
    this.invoiceInfo.branchName = this.branchName;
    this.invoiceInfo.accountType = this.accountType;
    this.invoiceInfo.accountNo = this.accountNo;
    this.invoiceInfo.accountName = this.accountName;
    //this.invoiceInfo.logoId = this.logoId.toString();

    // if (this.userAuthService.isCompanyNameFromBackend) {
    //   this.invoiceInfo.companyId = {companyName: this.backendCompany.companyName };
      
    // }
    // if (this.userAuthService.isLogoFromBackend) {
    //   // If the logo is from the backend, set the logo ID accordingly
    //   this.invoiceInfo.logoId = {file: this.backendLogo.file ,url:this.backendLogo.url};
    // } 

    const formData = new FormData();
    // const formDataAll = this.invoiceInfo;

    formData.append(
      "invoiceInfo",
      new Blob([JSON.stringify(this.invoiceInfo)], { type: "application/json" })
    );
    formData.append(
      "invoiceList",
      new Blob([JSON.stringify(this.invoiceInfo.invoicelistObj)], { type: "application/json" })
    );
    formData.append(
      "companyId", this.companyId.toString());
    // formData.append("contractId", this.contractId);
    console.log(formData.getAll);

    // formData.append("logo",this.logoId.toString());
    // console.log(this.logoId);

    this.invoiceService.addInvoice(formData).subscribe((response: Invoice) => {
      console.log("Invoice response " + response);
      this.router.navigate(['/invoice-list']);

    }
    );
  }
  
  onReset() {
    window.history.back();
   }

  navigateToPreivousPage() {
    window.history.back();
  }

  cancel(): void {
    console.log('Cancel function called');
    // Clear form values
    //this.invoiceForm.reset();
    window.history.back();
    // Navigate back to "Ichiran" screen
    //this.router.navigate(['/invoice-list']);
  }

  keyPressAlpha(event: KeyboardEvent) {
    const inp = String.fromCharCode(event.keyCode);
    if (/[a-zA]/.test(inp)) {
      return true;
    }
    else {
      event.preventDefault();
      return false;
    }
  }
  keyPressNumeric(event: KeyboardEvent) {
    const inp = String.fromCharCode(event.keyCode);

    if (/[0-9]/.test(inp)) {
      return true;
    }
    event.preventDefault();
    return false;
  }
  keyPressKana(event: KeyboardEvent) {
    const inp = String.fromCharCode(event.keyCode);

    if (/^[ァ-ヶー　]+$/.test(inp)) {
      return true;
    }
    else {
      event.preventDefault();
      return false;
    }
  }
  keyPressKanjihira(event: KeyboardEvent) {
    const inp = String.fromCharCode(event.keyCode);

    if (/^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+$/.test(inp)) {
      return true;
    }
    else {
      event.preventDefault();
      return false;
    }
  }

  // ]
  validateKatakana(inputElement: HTMLInputElement): void {
    const inputValue = inputElement.value;
    const value = inputElement.value;
    const regex = /^[ァ-ヶー　]+$/; // Regular expression for katakana characters

    if (!regex.test(inputValue)) {
      this.errorMessage = 'Please enter katakana characters only.';
    } else {
      this.errorMessage = ''; // Clear the error message if input is valid
    }
  }
  keyPressDecimal(event: KeyboardEvent) {
    const allowedKeys = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']);

    const inputValue = (event.target as HTMLInputElement).value;
    const key = event.key;

    if (!allowedKeys.has(key) || (key === '.' && inputValue.includes('.'))) {
      event.preventDefault();
    }
  }


 
}


