import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyName } from 'src/app/Model/CompanyName';
import { Invoice } from 'src/app/Model/Invoice';
import { InvoiceList } from 'src/app/Model/InvoiceList';
import { Property } from 'src/app/Model/Property';
import { UserInfo } from 'src/app/Model/userInfo';
import { ContractService } from 'src/app/Service/Contract/ContractService';
import { InvoiceServiceService } from 'src/app/Service/InvoiceInfo/invoice-service.service';
import { PropertyService } from 'src/app/Service/Property/PropertyService';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent {
  @ViewChild('f') myForm!: NgForm;
  logoId: number;
  companyId: number;
  backendCompany: CompanyName = {
    companyName: null
  };

  userInfo: UserInfo[];
  picId: string;
  id: string;
  companyfullName: string;
  companyphone1: string;
  companyphone2: string;
  companyphone3: string;
  companypostalCode1: string;
  companypostalCode2: string;
  companyAddress: string;

  contractId: string;
  billingDate:string;
  contractIDs: any[];

  getContractId: string;
  getBorrowerCoporate: string;

  propertyIDs: Property[];
  propertyId: string;
  propertyname: string;
  roomno: string;
  floor: string;
  buildingPostalCode1: string;
  buildingPostalCode2: string;
  buildingAddress: string;
  bcpicName: string;

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

  invoiceForm: any;
  

  ngOnInit() {
    //console.log(this.currentDate);
    this.companyfullName = this.userAuthService.getFirstName() + " " + this.userAuthService.getLastName();
    this.companyphone1 = this.userAuthService.getPhone1();
    this.companyphone2 = this.userAuthService.getPhone2();
    this.companyphone3 = this.userAuthService.getPhone3();
    this.picId = this.userAuthService.getPicId();//company Id
    
    this.getInvocieById();
    this.getCurrentUserByCompanyId();
    this.getCurrentUserInfo();
    this.getContractInfo();
    this.getProperties();

  //   const pId = this.invoiceService.getPropertyId();
  // console.log("This is edit contract data "+pId);
    
  } 

  // getInvocieById() 
  // {
  //   this.id= this.route.snapshot.params['id'];
  //   this.invoiceService.getInvoiceById(this.id).subscribe(
  //     (data: any) => {
  //       this.invoiceInfo.id = data.Id;
  //       this.invoiceInfo.lenderCooperate = data.lenderCooperate;
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //     }
  //   );
  //  }

  getInvocieById() {
    this.id= this.route.snapshot.params['id'];
    this.invoiceService.getInvoiceById(this.id).subscribe(
      (data:any) => { 
        //this.invoiceInfo = data;
        this.invoiceList = data.invoiceMoneyList;

        this.invoiceInfo.lenderCooperate = data.lenderCooperate;
        this.invoiceInfo.lenderPersonName = data.lenderPersonName;
        this.invoiceInfo.contractData = data.contractData;
        this.invoiceInfo.billingDate = data.billingDate;
        this.invoiceInfo.paymentDueDate = data.paymentDueDate;
        //console.log("This is invoice info billing data "+this.invoiceInfo.billingDate);
        this.invoiceInfo.propertyid = data.propertyid;
        this.invoiceInfo.roomNo = data.roomNo;
        this.invoiceInfo.floor = data.floor;
        this.invoiceInfo.buildingPostalFirst = data.buildingPostalFirst;
        this.invoiceInfo.buildingPostalLast = data.buildingPostalLast;
        this.invoiceInfo.address = data.address;

        this.contractId = this.invoiceInfo.contractData;
        this.billingDate = this.invoiceInfo.billingDate;
        this.bcpicName = this.invoiceInfo.lenderPersonName;
        this.propertyId = this.invoiceInfo.propertyid;
        this.roomno = this.invoiceInfo.roomNo;
        this.floor = this.invoiceInfo.floor;
        this.buildingPostalCode1 = this.invoiceInfo.buildingPostalFirst;
        this.buildingPostalCode2 = this.invoiceInfo.buildingPostalLast;
        this.buildingAddress = this.invoiceInfo.address;
        
        this.invoiceList.rent = data.invoiceMoneyList.rent;
        this.invoiceList.rentTax = data.invoiceMoneyList.rentTax;
        this.invoiceList.rentTotal = data.invoiceMoneyList.rentTotal;
        this.invoiceInfo.invoicelistObj.rentUsagePeriod = data.invoiceMoneyList.rentUsagePeriod;
        this.rentPrice = this.invoiceList.rent;
        this.rentConsumeTax = this.invoiceList.rentTax;
        this.rentTotalPrice = this.invoiceList.rentTotal;

        this.invoiceList.serviceFee = data.invoiceMoneyList.serviceFee;
        this.invoiceList.serviceFeeTax = data.invoiceMoneyList.serviceFeeTax;
        this.invoiceList.serviceFeeTotal = data.invoiceMoneyList.serviceFeeTotal;
        this.invoiceInfo.invoicelistObj.serviceFeeUsagePeriod = data.invoiceMoneyList.serviceFeeUsagePeriod;
        this.managementFeePrice = this.invoiceList.serviceFee;
        this.managementFeeConsumeTax = this.invoiceList.serviceFeeTax;
        this.managementFeeTotalPrice = this.invoiceList.serviceFeeTotal;

        this.invoiceList.brokerageFee = data.invoiceMoneyList.brokerageFee;
        this.invoiceList.brokerageFeeTax = data.invoiceMoneyList.brokerageFeeTax;
        this.invoiceList.brokerageFeeTotal = data.invoiceMoneyList.brokerageFeeTotal;
        this.invoiceInfo.invoicelistObj.brokerageFeeUsagePeriod = data.invoiceMoneyList.brokerageFeeUsagePeriod;
        this.brokerageFeePrice = this.invoiceList.brokerageFee;
        this.brokerageFeeConsumeTax = this.invoiceList.brokerageFeeTax;
        this.brokerageFeeTotalPrice = this.invoiceList.brokerageFeeTotal;

        this.invoiceList.parkingFee = data.invoiceMoneyList.brokerageFee;
        this.invoiceList.parkingFeeTax = data.invoiceMoneyList.brokerageFeeTax;
        this.invoiceList.parkingFeeTotal = data.invoiceMoneyList.brokerageFeeTotal;
        this.invoiceInfo.invoicelistObj.parkingStartDate = data.invoiceMoneyList.parkingStartDate;
        this.invoiceInfo.invoicelistObj.parkingEndDate = data.invoiceMoneyList.parkingEndDate;
        this.parkingFeePrice = this.invoiceList.parkingFee;
        this.parkingFeeConsumeTax = this.invoiceList.parkingFeeTax;
        this.parkingFeeTotalPrice = this.invoiceList.parkingFeeTotal;

        this.invoiceList.bicycleParkingFee = data.invoiceMoneyList.bicycleParkingFee;
        this.invoiceList.bicycleParkingFeeTax = data.invoiceMoneyList.bicycleParkingFeeTax;
        this.invoiceList.bicycleParkingFeeTotal = data.invoiceMoneyList.bicycleParkingFeeTotal;
        this.invoiceInfo.invoicelistObj.bicycleParkingStartDate = data.invoiceMoneyList.bicycleParkingStartDate;
        this.invoiceInfo.invoicelistObj.bicycleParkingEndDate = data.invoiceMoneyList.bicycleParkingEndDate;
        this.bicycleParkingFeePrice = this.invoiceList.bicycleParkingFee;
        this.bicycleParkingFeeConsumeTax = this.invoiceList.bicycleParkingFeeTax;
        this.bicycleParkingFeeTotalPrice = this.invoiceList.bicycleParkingFeeTotal;

        this.invoiceList.keymoney = data.invoiceMoneyList.keymoney;
        this.invoiceList.keymoneyTax = data.invoiceMoneyList.keymoneyTax;
        this.invoiceList.keymoneyTotal = data.invoiceMoneyList.keymoneyTotal;
        this.invoiceInfo.invoicelistObj.keymoneyStartDate = data.invoiceMoneyList.keymoneyStartDate;
        this.invoiceInfo.invoicelistObj.keymoneyEndDate = data.invoiceMoneyList.keymoneyEndDate;
        this.keymoneyFeePrice = this.invoiceList.keymoney;
        this.keymoneyFeeConsumeTax = this.invoiceList.keymoneyTax;
        this.keymoneyFeeTotalPrice = this.invoiceList.keymoneyTotal;

        this.invoiceList.shikikin = data.invoiceMoneyList.shikikin;
        this.invoiceList.shikikinTax = data.invoiceMoneyList.shikikinTax;
        this.invoiceList.shikikinTotal = data.invoiceMoneyList.shikikinTotal;
        this.invoiceInfo.invoicelistObj.shikikinStartDate = data.invoiceMoneyList.shikikinStartDate;
        this.invoiceInfo.invoicelistObj.shikikinEndDate = data.invoiceMoneyList.shikikinEndDate;
        this.shikikinPrice = this.invoiceList.shikikin;
        this.shikikinConsumeTax = this.invoiceList.shikikinTax;
        this.shikikinTotalPrice = this.invoiceList.shikikinTotal;

        this.invoiceList.deposit = data.invoiceMoneyList.deposit;
        this.invoiceList.depositTax = data.invoiceMoneyList.depositTax;
        this.invoiceList.depositTotal = data.invoiceMoneyList.depositTotal;
        this.invoiceInfo.invoicelistObj.depositStartDate = data.invoiceMoneyList.depositStartDate;
        this.invoiceInfo.invoicelistObj.depositEndDate = data.invoiceMoneyList.depositEndDate;
        this.depositPrice = this.invoiceList.deposit;
        this.depositConsumeTax = this.invoiceList.depositTax;
        this.depositTotalPrice = this.invoiceList.depositTotal;

        this.invoiceList.renewalFee = data.invoiceMoneyList.renewalFee;
        this.invoiceList.renewalFeeTax = data.invoiceMoneyList.renewalFeeTax;
        this.invoiceList.renewalFeeTotal = data.invoiceMoneyList.depositTotal;
        this.invoiceInfo.invoicelistObj.renewalFeeStartDate = data.invoiceMoneyList.renewalFeeStartDate;
        this.invoiceInfo.invoicelistObj.renewalFeeEndDate = data.invoiceMoneyList.renewalFeeEndDate;
        this.renewalFeePrice = this.invoiceList.renewalFee;
        this.renewalFeeConsumeTax = this.invoiceList.renewalFeeTax;
        this.renewalFeeTotalPrice = this.invoiceList.renewalFeeTotal;

        this.invoiceList.repairCost = data.invoiceMoneyList.repairCost;
        this.invoiceList.repairCostTax = data.invoiceMoneyList.repairCostTax;
        this.invoiceList.repairCostTotal = data.invoiceMoneyList.repairCostTotal;
        this.invoiceInfo.invoicelistObj.repairCostStartDate = data.invoiceMoneyList.repairCostStartDate;
        this.invoiceInfo.invoicelistObj.repairCostEndDate = data.invoiceMoneyList.repairCostEndDate;
        this.repairCostPrice = this.invoiceList.repairCost;
        this.repairCostConsumeTax = this.invoiceList.repairCostTax;
        this.repairCostTotalPrice = this.invoiceList.repairCostTotal;

        this.invoiceList.penaltyFee = data.invoiceMoneyList.penaltyFee;
        this.invoiceList.penaltyFeeTax = data.invoiceMoneyList.penaltyFeeTax;
        this.invoiceList.penaltyFeeTotal = data.invoiceMoneyList.penaltyFeeTotal;
        this.invoiceInfo.invoicelistObj.penaltyFeeStartDate = data.invoiceMoneyList.penaltyFeeStartDate;
        this.invoiceInfo.invoicelistObj.penaltyFeeEndDate = data.invoiceMoneyList.penaltyFeeEndDate;
        this.penaltyFeePrice = this.invoiceList.penaltyFee;
        this.penaltyFeeConsumeTax = this.invoiceList.penaltyFeeTax;
        this.penaltyFeeTotalPrice = this.invoiceList.penaltyFeeTotal;

        this.invoiceList.signboard = data.invoiceMoneyList.signboard;
        this.invoiceList.signboardTax = data.invoiceMoneyList.signboardTax;
        this.invoiceList.signboardTotal = data.invoiceMoneyList.signboardTotal;
        this.invoiceInfo.invoicelistObj.signboardStartDate = data.invoiceMoneyList.signboardStartDate;
        this.invoiceInfo.invoicelistObj.signboardEndDate = data.invoiceMoneyList.signboardEndDate;
        this.signboardFeePrice = this.invoiceList.signboard;
        this.signboardFeeConsumeTax = this.invoiceList.signboardTax;
        this.signboardFeeTotalPrice = this.invoiceList.signboardTotal;

        this.invoiceInfo.invoicelistObj.electricBill = data.invoiceMoneyList.electricBill;
        this.invoiceInfo.invoicelistObj.electricBillTax = data.invoiceMoneyList.electricBillTax;
        this.invoiceInfo.invoicelistObj.electricUsageAmount = data.invoiceMoneyList.electricUsageAmount;
        this.electricBillTotal = data.invoiceMoneyList.electricBillTotal;
        this.invoiceInfo.invoicelistObj.electricBillStartDate =data.invoiceMoneyList.electricBillStartDate;
        this.invoiceInfo.invoicelistObj.electricBillEndDate =data.invoiceMoneyList.electricBillEndDate;

        this.invoiceInfo.invoicelistObj.waterBill = data.invoiceMoneyList.waterBill;
        this.invoiceInfo.invoicelistObj.waterBillTax = data.invoiceMoneyList.waterBillTax;
        this.invoiceInfo.invoicelistObj.waterUsageAmount = data.invoiceMoneyList.waterUsageAmount;
        this.waterBillTotal = data.invoiceMoneyList.waterBillTotal;
        this.invoiceInfo.invoicelistObj.waterBillStartDate =data.invoiceMoneyList.waterBillStartDate;
        this.invoiceInfo.invoicelistObj.waterBillEndDate =data.invoiceMoneyList.waterBillEndDate;

        this.invoiceInfo.invoicelistObj.gasBill = data.invoiceMoneyList.gasBill;
        this.invoiceInfo.invoicelistObj.gasBillTax = data.invoiceMoneyList.gasBillTax;
        this.invoiceInfo.invoicelistObj.gasUsageAmount = data.invoiceMoneyList.gasUsageAmount;
        this.gasBillTotal = data.invoiceMoneyList.gasBillTotal;
        this.invoiceInfo.invoicelistObj.gasBillStartDate =data.invoiceMoneyList.gasBillStartDate;
        this.invoiceInfo.invoicelistObj.gasBillEndDate =data.invoiceMoneyList.gasBillEndDate;

        this.invoiceInfo.invoicelistObj.constructionBill = data.invoiceMoneyList.constructionBill;
        this.invoiceInfo.invoicelistObj.constructionBillTax = data.invoiceMoneyList.constructionBillTax;
        this.constructionBillTotal = data.invoiceMoneyList.constructionBillTotal;
        this.invoiceInfo.invoicelistObj.constructionBillUsagePeriod =data.invoiceMoneyList.constructionBillUsagePeriod;

        this.invoiceInfo.invoicelistObj.workNameFirst = data.invoiceMoneyList.workNameFirst;
        this.invoiceInfo.invoicelistObj.workAmountFirst = data.invoiceMoneyList.workAmountFirst;
        this.invoiceInfo.invoicelistObj.workTaxFirst = data.invoiceMoneyList.workTaxFirst;
        this.workFirstTotal = data.invoiceMoneyList.workAmountTotalFirst;
        this.invoiceInfo.invoicelistObj.workUsagePeriodFirst =data.invoiceMoneyList.workUsagePeriodFirst;
        
        this.invoiceInfo.invoicelistObj.workNameSecond = data.invoiceMoneyList.workNameSecond;
        this.invoiceInfo.invoicelistObj.workAmountSecond = data.invoiceMoneyList.workAmountSecond;
        this.invoiceInfo.invoicelistObj.workTaxsecond = data.invoiceMoneyList.workTaxsecond;
        this.workSecondTotal = data.invoiceMoneyList.workTotalSecond;
        this.invoiceInfo.invoicelistObj.workUsagePeriodSecond =data.invoiceMoneyList.workUsagePeriodSecond;

        this.invoiceList.total = data.invoiceMoneyList.total;
        this.totalSumPrice = this.invoiceList.total;
        this.invoiceInfo.information = data.information;
        //this.invoiceInfo.invoicelistObj.rentUsagePeriod = this.invoiceList.rentUsagePeriod;
        this.invoiceInfo.bankName = data.bankName;
        this.invoiceInfo.branchName = data.branchName;
        this.invoiceInfo.accountName = data.accountName;
        this.invoiceInfo.accountNo = data.accountNo;
        this.invoiceInfo.accountType = data.accountType;

        this.bankName = this.invoiceInfo.bankName;
        this.branchName = this.invoiceInfo.branchName;
        this.accountName = this.invoiceInfo.accountName;
        this.accountNo = this.invoiceInfo.accountNo;
        this.accountType = this.invoiceInfo.accountType;
        //console.log("This is detail data "+this.invoiceInfo.billingDate);
        
      },
   
      (error) => {
        console.error('Error:', error);
      }
    );
   }

  getCurrentUserInfo() {
    this.userAuthService.getCompanyId().subscribe(companyId => {
      this.companyId = companyId;
    });

    this.userAuthService.getCompanyName().subscribe(backendCompany => {
      this.backendCompany = backendCompany;
    });
    console.log("Get Login company name data", this.backendCompany.companyName);
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
        this.getBorrowerCoporate = contractInfo.borrower.borrowerCooperate;
       // this.bcpicName = data.borrower.bcpicFirstName + " " + data.borrower.bcpicLastName;
        console.log("Hello Contract " + this.getContractId);
        console.log("the contract length " + contractInfo.borrower.borrowerCooperate);
      }
    }, (error) => {
      console.error('Error fetching owners:', error);
    }
    );
  }

  getProperties() {
    this.invoiceService.getPropertyByBorrowerType(this.companyId).subscribe(data => {
      this.propertyIDs = data;
      // console.log("Hello PropertyData "+this.propertyIDs);
    }, (error) => {
      console.error('Error fetching owners:', error);
    }
    );
  }

  constructor(private router: Router,
    private route:ActivatedRoute,
    private userService: UserInfoService,
    private contractService: ContractService,
    private propertyService: PropertyService,
    private invoiceService: InvoiceServiceService,
    private userAuthService: UserAuthService,
    //@Inject(LOCALE_ID) private locale: string
  ) {}


  onPropertySelectionChange() {
    this.propertyService.getPropertyById(this.propertyId).
      subscribe((data: any) => {
        this.roomno = data.room;
        this.floor = data.floor;
        this.propertyname = data.propertyName;
        this.buildingPostalCode1 = data.postalFirst;
        this.buildingPostalCode2 = data.postalLast;
        this.buildingAddress = data.address;
        console.log("this is check for selected property room " + this.roomno);
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

  onSubmit(invoiceForm: NgForm) {
    this.invoiceInfo.companyId = { companyName: this.backendCompany.companyName };
    this.invoiceInfo.personName = this.companyfullName;
    this.invoiceInfo.mobileFirst = this.companyphone1;
    this.invoiceInfo.mobileSecond = this.companyphone2;
    this.invoiceInfo.mobileThird = this.companyphone3;
    this.invoiceInfo.companyPostalFirst = this.companypostalCode1;
    this.invoiceInfo.companyPostalSecond = this.companypostalCode2;
    this.invoiceInfo.companyAddress = this.companyAddress;
    //this.electricBillTotal = this.electricBill + this.electricBillTax;
    //請求期間情報
    this.invoiceInfo.lenderCooperate = this.getBorrowerCoporate;
    this.invoiceInfo.lenderPersonName = this.bcpicName;
   // this.invoiceInfo.billingDate = this.currentDate.toString();
    this.invoiceInfo.contractData = this.getContractId;
    //物件情報
    this.invoiceInfo.propertyid = this.propertyId;
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
    formData.append("companyId", this.companyId.toString());
    // formData.append("contractId", this.contractId);
    console.log(formData.getAll);
    this.invoiceService.updateInvoices(this.id,formData).subscribe((response: Invoice) => {
      console.log("Invoice response " + this.id);
    }
    );
    this.router.navigate(['/invoice-list']);
  }

  navigateToPreivousPage() 
  {
    window.history.back();
  }

  keyPressNumeric(event: KeyboardEvent) {
    const inp = String.fromCharCode(event.keyCode);

    if (/[0-9]/.test(inp)) {
      return true;
    }
    event.preventDefault();
    return false;
  }

  cancel(): void {
    console.log('Cancel function called');
    // Clear form values
    this.invoiceForm.reset();
    // Navigate back to "Ichiran" screen
    this.router.navigate(['/contract-list']);
  }
}
