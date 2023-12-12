import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/Model/Expense';
import { Income } from 'src/app/Model/Income';
import { PMReport } from 'src/app/Model/PMReport';
import { Rental } from 'src/app/Model/Rental';
import { PmReportService } from 'src/app/Service/PMRepot/pmReport.service';
import * as html2pdf from 'html2pdf.js';
import { CompanyName } from 'src/app/Model/CompanyName';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';


@Component({
  selector: 'app-pmreport-create-pdf',
  templateUrl: './pmreport-create-pdf.component.html',
  styleUrls: ['./pmreport-create-pdf.component.css']
})
export class PmreportCreatePdfComponent {
  @ViewChild('f') myForm!: NgForm;

  id: string;
  data: any;
  incomeInfo: any;
  rentalInfo: any;
  expenseInfo: any;
  calculatedSum: number = 0;
  // Initialize total variables
  totalAmount: number = 0;
  totalTax: number = 0;
  totalGrandTotal: number = 0;
  rentTax: number = 0;
  managementFeeTax: number = 0;
  bicycleParkingFeeTax: number = 0;
  signboardFeesTax: number = 0;
  parkingFeeTax: number = 0;
  keymoneyTax: number = 0;
  shikikenTax: number = 0;
  depositTax: number = 0;
  renewalFeeTax: number = 0;
  repairCostTax: number = 0;
  penaltyFeeTax: number = 0;
  ownerName: string;
  ownerMail: string;
  emailId: string;
  password: string;
  ownerKana: string;
  picName: string;
  picNameKana: string;
  mobileFirst: string;
  mobileSecond: string;
  mobileThird: string;
  ownerPostalFirst: string;
  ownerPostalSecond: string;
  userPostalFirst: string;
  userPostalSecond: string;
  ownerAddress: string;
  address: string;
  createdDate: string;
  backendCompany: CompanyName = {
    companyName: null
  };
  companyName: string;
  pmReport: PMReport = {
    id: null,
    propertyName: null,
    ownerName: null,
    mail: null,
    bankName: null,
    branchName: null,
    accountType: null,
    accountNo: null,
    accountName: null,
    apportionment: null,
    targetMonth: null,
    picName: null,
    totalIncome: null,
    totalExpense: null,
    createdName: null,
    createdDate: null,
    modifiedName: null,
    modifiedDate: null,
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
  income: Income = {
    id: null,
    incomeRemark: null,
    room: null,
    tenantName: null,
    month: null,
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
    incomeRemarks: null,
    owner: null,
    pmReport: null,
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
    workFirst: null,
    workSecond: null,
    workFirstTax: null,
    workSecondTax: null,
  }
  rental: Rental = {
    id: null,
    room: null,
    classification: null,
    tenantName: null,
    areaMeter: null,
    areaTsubo: null,
    rentTsubo: null,
    totalRent: null,
    serviceFeesTsubo: null,
    serviceFeesTotal: null,
    deposit: null,
    toalDeposit: null,
    totalRental: null,
    contractStartDate: null,
    contractEndDate: null,
    renewalFees: null,
    rentalRemarks: null,
    owner: null,
    pmReport: null,
  }
  expense: Expense = {
    id: null,
    expenseDetail: null,
    voucher: null,
    expenseDate: null,
    expenseMoney: null,
    expenseTax: null,
    expenseTotal: null,
    expenseRemarks: null,
    owner: null,
    pmReport: null

  }

  constructor(private service: PmReportService,
    private route: ActivatedRoute, private router: Router, private userAuthService: UserAuthService,private cdr: ChangeDetectorRef) {
  }

  onContentChange(event: Event): void {
    // Handle content changes here
    const editedContent = (event.target as HTMLElement).innerText;
    console.log('Content changed:', editedContent);
  }
  ngOnInit(): void {
    console.log("Testing from detail" + this.id)
    this.userAuthService.getCompanyName().subscribe(backendCompany => {
      this.backendCompany = backendCompany;
      this.companyName = backendCompany.companyName;
    });
    this.id = this.route.snapshot.params['id'];
    this.service.getPmReportDataById(this.id).subscribe(data => {
      this.pmReport = data;
      this.createdDate = data.createdDate;
      this.picName = data.picName;
      this.picNameKana = data.picNameKana;
      this.mobileFirst = data.mobileFirst;
      this.mobileSecond = data.mobileSecond;
      this.mobileThird = data.mobileThird;
      this.userPostalFirst = data.userPostalFirst;
      this.userPostalSecond = data.userPostalSecond;
      this.address = data.userAddress;
      this.ownerPostalFirst = data.ownerPostalFirst;
      this.ownerPostalSecond = data.ownerPostalSecond;
      this.ownerAddress = data.ownerAddress;
      this.ownerName = data.ownerName;
      this.ownerMail = data.mail;
      this.emailId = data.mail;
      this.password = data.password;
    });
    this.service.getIncomeInformationById(this.id).subscribe((data: Income[]) => {
      this.incomeInfo = data;
      for (const income of this.incomeInfo) {
        this.rentTax += income.rentTax;
        this.managementFeeTax += income.managementFeeTax;
        this.bicycleParkingFeeTax += income.bicycleParkingFeeTax;
        this.signboardFeesTax += income.signboardFeesTax;
        this.parkingFeeTax += income.parkingFeeTax;
        this.keymoneyTax += income.keymoneyTax;
        this.shikikenTax += income.shikikenTax;
        this.depositTax += income.depositTax;
        this.renewalFeeTax += income.renewalFeeTax;
        this.repairCostTax += income.repairCostTax;
        this.penaltyFeeTax += income.penaltyFeeTax;
        console.log("Testing from income id" + this.incomeInfo)
      }
    });
    this.service.getExpenseInformationById(this.id).subscribe(data => {
      this.expenseInfo = data;
      console.log("Testing from rental id" + this.expenseInfo)
    });
    this.service.getRentalInformationById(this.id).subscribe(data => {
      this.rentalInfo = data;
      this.cdr.detectChanges();
      console.log("Testing from rental id" + this.rentalInfo)
    });

  }
  inputValue: number = 0;
  todayDate: string;
  onTextboxInput() {
    // Update todayDate whenever the input changes
    this.todayDate = this.getCurrentDate();
    this.calculatedSum = (
      this.calculateSum('rent') +
      this.calculateSum('managementFee') +
      this.calculateSum('bicycleParkingFee') +
      this.calculateSum('signboardFees') +
      this.calculateSum('parkingFee') +
      this.calculateSum('keymoney') +
      this.calculateSum('shikiken') +
      this.calculateSum('deposit') +
      this.calculateSum('renewalFee') +
      this.calculateSum('repairCost') +
      this.calculateSum('penaltyFee') +
      this.calculateSum('others') +
      this.calculateSum('tax') - this.calculateSumExpense('expenseTotal')
    ) - this.inputValue;
  }

  private getCurrentDate(): string {
    const today = new Date();
    const dd: string | number = today.getDate();
    const mm: string | number = today.getMonth() + 1; // January is 0!
    const yyyy: number = today.getFullYear();
    return `${yyyy}年${mm}月${dd}日`;
  }

  // Function to calculate the sum for a specific property in the incomeInfo array
  calculateSum(property: string): number {
    return this.incomeInfo.reduce((sum, income) => sum + (income[property] || 0), 0);
  }

  // Function to calculate the total sum for each column
  calculateTotalSum(): number[] {
    const totalSum: number[] = [];
    const incomeToSum: string[] = ['rent', 'managementFee', 'bicycleParkingFee', 'signboardFees',
      'parkingFee', 'keymoney', 'shikiken', 'deposit', 'renewalFee', 'repairCost', 'penaltyFee', 'tax',
      'others', 'totalIncome', 'workFirst', 'workSecond', 'workFirstTax', 'workSecondTax'];

    incomeToSum.forEach(property => {
      totalSum.push(this.calculateSum(property));
    });

    return totalSum;
  }
  // Function to calculate the sum for a specific property in the incomeInfo array
  calculateSumExpense(property: string): number {
    return this.expenseInfo.reduce((sum, expense) => sum + (expense[property] || 0), 0);
  }

  // Function to calculate the total sum for each column
  calculateTotalSumExpense(): number[] {
    const totalSum: number[] = [];
    const expenseToSum: string[] = ['expenseMoney', 'expenseTax', 'expenseTotal'];

    expenseToSum.forEach(property => {
      totalSum.push(this.calculateSumExpense(property));
    });

    return totalSum;
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  generatePDF() {
    const today = new Date();
    const formattedDate = this.formatDate(today);
    const element = document.getElementById('contentToConvert');
    const pdfOptions = {
      filename: `pmreport_(${formattedDate}).pdf`,
      image: { type: 'jpeg', quality: 0.6 },
      html2canvas: { scale: 2 }, 
      jsPDF: { unit: 'mm', format: 'legal', orientation: 'landscape' },
      compress: true,
    };

    element.style.fontSize = '12px';
    element.style.marginBottom = '12mm';
    element.style.padding = '3px';
   
      html2pdf()
        .from(element)
        .set(pdfOptions)
        .save();    
    // const mainContainer = document.getElementById('contentToConvert');
    // mainContainer.style.fontSize = '12px';

    // // Specify the selector for the tables you want to include in the PDF
    // const tableSelector = '.table';
    // const tables = document.querySelectorAll(tableSelector);
  
    // tables.forEach((table, index) => {
    //   // Add a page break before each table (except the first one)
    //   if (index > 0) {
    //     const blankPage = document.createElement('div');
    //     blankPage.style.pageBreakBefore = 'always';
    //     mainContainer.appendChild(blankPage);
    //   }
    // });
  
    // // Generate PDF with keepTogether option
    // html2pdf()
    //   .from(mainContainer)
    //   .set({ ...pdfOptions, keepTogether: '.table' }) // Keep tables together
    //   .save();
  }

    sentMail() {
      const subject = 'レポートのお知らせ';
      const bodyTemplate = `%recipientName%  様、

いつもお世話になっております。
今月のPMレポートの作成が完了しましたのでお送り致します。
    ユーザー名: %username%
    パスワード: %password%
上のアカウント名やパスワードを使って以下のリンクから確認することができます。
ウェブサイトへのリンク: %websiteLink%

よろしくお願いいたします。`;

      const body = bodyTemplate
        .replace('%recipientName%', this.ownerName)
        .replace('%username%', this.emailId)
        .replace('%password%', this.password)
        .replace('%websiteLink%', 'http://localhost:4200/login');
      const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${this.ownerMail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Open the Gmail compose window
      window.open(gmailURL, '_blank');
    }


    isOneMonthAway(endDate: string): boolean {
      const oneMonthLater = new Date();
      oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);  
      const contractEndDate = new Date(endDate);      
        return contractEndDate.getFullYear() === oneMonthLater.getFullYear() &&
        contractEndDate.getMonth() === oneMonthLater.getMonth() &&
        contractEndDate.getDate() === oneMonthLater.getDate();
    }

    isSameMonth(contractStartDate: string): boolean {
      const today = new Date();
      const startDate = new Date(contractStartDate);
  
      return startDate.getFullYear() === today.getFullYear() &&
             startDate.getMonth() === today.getMonth();
    }
    navigateToPreivousPage() {
      window.history.back();
    }

  }
