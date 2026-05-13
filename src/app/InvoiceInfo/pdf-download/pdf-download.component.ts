import { Component, OnInit,ViewChild,ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceServiceService } from 'src/app/Service/InvoiceInfo/invoice-service.service';
import { Invoice } from 'src/app/Model/Invoice';
import { InvoiceList } from 'src/app/Model/InvoiceList';
import { FileHandle } from 'src/app/Model/FileHandle';
import { ActivatedRoute } from '@angular/router';
import { Borrower } from 'src/app/Model/Borrower';
import * as html2pdf from 'html2pdf.js';
import { MatTableDataSource } from '@angular/material/table';
import { UserInfo } from 'src/app/Model/userInfo';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { tap , Subject } from 'rxjs';
import { environment } from '../../../environment/environment';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pdf-download',
  templateUrl: './pdf-download.component.html',
  styleUrls: ['./pdf-download.component.css'],

})
export class PdfDownloadComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();
  private objectUrls = new Map<SafeUrl, string>();
  @ViewChild('contentToConvert') contentToConvert!: ElementRef;

  borrower:Borrower[];
  borrowerData:Borrower;
  invoiceList:InvoiceList[];
  invoiceMoneyList: InvoiceList;
  userId:UserInfo
  url: SafeUrl | string;
 testing:string;

  borrowerCooperate:string;
  companyId: number;
  // status: string = 'OK';
  filteredData: any[] = [];
// bcMail: string;
itemVariables: any = {}; 
// dataSource: MatTableDataSource<any>;
sumOfAmount: number = 0;
  invoice: Invoice[];
  propertyName:string;
  borrowerPersonName:string;
  id: string;
  invoiceInfo: any;
  bc:string;
  bcooperate:string;
invoiceId:string;
dataSource: MatTableDataSource<any>;
displayedColumns: string[] = ['period','itemNo', 'amount', 'tax', 'total'];
  contractIDs: any;
  getContractId: any;
  getBorrowerCoporate: any;
  createdDate: string;
  personName: string;
  filename: string;

constructor( private invoiceService: InvoiceServiceService,
              private sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private router: Router ) { }


ngOnInit() {
  this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
    if (params['filteredData']) {
      try {
        const data = JSON.parse(params['filteredData']);
        this.initializeInvoiceData(data);
      } catch {
        this.setMockInvoiceData();
      }
    } else {
      this.setMockInvoiceData();
    }
  });
}

  private initializeInvoiceData(data: any[]) {
    this.filteredData = Array.isArray(data) ? data : [];

    if (!this.filteredData || this.filteredData.length === 0) {
      this.itemVariables = {};
      this.revokeObjectUrl(this.url);
      this.url = 'assets/logo.png';
      return;
    }

    const item = this.filteredData[0];

    this.itemVariables = {
      id: item.id,
      companyPostalFirst: item.companyPostalFirst,
      companyPostalSecond: item.companyPostalSecond,
      companyName: item.companyId?.companyName ?? item.companyName,
      companyAddress: item.companyAddress,
      personName: item.personName,
      mobileFirst: item.mobileFirst,
      mobileSecond: item.mobileSecond,
      mobileThird: item.mobileThird,
      propertyName: item.propertyName,
      roomNo: item.roomNo,
      floor: item.floor,
      buildingPostalFirst: item.buildingPostalFirst,
      buildingPostalLast: item.buildingPostalLast,
      address: item.address,
      borrowerCooperate: item.borrowerCooperate,
      borrowerPersonName: item.borrowerPersonName,
      paymentDueDate: item.paymentDueDate,
      billingDate: item.billingDate,
      bankName: item.bankName,
      branchName: item.branchName,
      accountType: item.accountType,
      accountNo: item.accountNo,
      accountName: item.accountName,
      information: item.information,
      userId: item.userId,
      url: item.userId?.signature?.url,
      borrowerRegNo: item.borrowerRegNo,
    };

    console.log('Register No.' + this.itemVariables.borrowerRegNo);
    this.testing = this.itemVariables.userId;
    console.log('Item Variables:', this.invoiceId);
    console.log('Item userId:', this.itemVariables.userId?.signature);

    if (this.itemVariables.userId?.signature?.image && this.itemVariables.userId?.signature?.name) {
      console.log('the borrower cooperate is ', this.itemVariables.userId.signature.id);
      const previousUrl = this.url;
      this.url = this.createImages(
        this.itemVariables.userId.signature.image,
        this.itemVariables.userId.signature.name
      ).url;
      this.revokeObjectUrl(previousUrl);
    } else {
      this.revokeObjectUrl(this.url);
      this.url = 'assets/logo.png';
    }

    console.log('Image URL ' + this.url);
  }

  private setMockInvoiceData() {
    const mockInvoiceMoneyList = {
      rent: 165330,
      rentTax: 18370,
      rentTotal: 183700,
      rentUsagePeriod: '1',
      brokerageFee: 0,
      brokerageFeeTax: 0,
      brokerageFeeTotal: 0,
      brokerageFeeUsagePeriod: '',
      serviceFee: 4500,
      serviceFeeTax: 0,
      serviceFeeTotal: 4500,
      serviceFeeUsagePeriod: '1',
      parkingFee: 0,
      parkingFeeTax: 0,
      parkingFeeTotal: 0,
      parkingStartDate: '',
      parkingEndDate: '',
      bicycleParkingFee: 0,
      bicycleParkingFeeTax: 0,
      bicycleParkingFeeTotal: 0,
      bicycleParkingStartDate: '',
      bicycleParkingEndDate: '',
      keymoney: 0,
      keymoneyTax: 0,
      keymoneyTotal: 0,
      keymoneyStartDate: '',
      keymoneyEndDate: '',
      shikikin: 0,
      shikikinTax: 0,
      shikikinTotal: 0,
      shikikinStartDate: '',
      shikikinEndDate: '',
      deposit: 0,
      depositTax: 0,
      depositTotal: 0,
      depositStartDate: '',
      depositEndDate: '',
      renewalFee: 0,
      renewalFeeTax: 0,
      renewalFeeTotal: 0,
      renewalFeeStartDate: '',
      renewalFeeEndDate: '',
      repairCost: 0,
      repairCostTax: 0,
      repairCostTotal: 0,
      repairCostStartDate: '',
      repairCostEndDate: '',
      penaltyFee: 0,
      penaltyFeeTax: 0,
      penaltyFeeTotal: 0,
      penaltyFeeStartDate: '',
      penaltyFeeEndDate: '',
      signboard: 0,
      signboardTax: 0,
      signboardTotal: 0,
      signboardStartDate: '',
      signboardEndDate: '',
      electricBill: null,
      electricBillTax: 0,
      electricUsageAmount: 0,
      electricBillUsageFee: 0,
      electricBillTotal: 0,
      electricBillStartDate: '',
      electricBillEndDate: '',
      waterBill: null,
      waterBillTax: 0,
      waterUsageAmount: 0,
      waterBillUsageFee: 0,
      waterBillTotal: 0,
      waterBillStartDate: '',
      waterBillEndDate: '',
      gasBill: null,
      gasBillTax: 0,
      gasUsageAmount: 0,
      gasBillUsageFee: 0,
      gasBillTotal: 0,
      gasBillStartDate: '',
      gasBillEndDate: '',
      constructionBill: null,
      constructionBillTax: 0,
      constructionBillTotal: 0,
      constructionBillUsagePeriod: '',
    };

    const mockData = [{
      id: 'mock-invoice-1',
      companyPostalFirst: '111',
      companyPostalSecond: '0035',
      companyId: {
        companyName: '株式会社ベストホーム',
      },
      companyAddress: '東京都台東区西浅草2丁目14番13号',
      personName: '権 勇',
      mobileFirst: '03',
      mobileSecond: '5806',
      mobileThird: '1677',
      propertyName: 'NWビル花川戸',
      roomNo: '401',
      floor: '4F',
      buildingPostalFirst: '111',
      buildingPostalLast: '0033',
      address: '東京都台東区花川戸1-11-4 NWビル花川戸 4F',
      borrowerCooperate: '田中商事',
      borrowerPersonName: '田中 一朗',
      borrowerRegNo: 'T7010501038250',
      paymentDueDate: '2025-01-23',
      billingDate: '12/04/2024',
      bankName: '朝日信用金庫',
      branchName: '合羽橋支店',
      accountType: '普通',
      accountNo: '0544872',
      accountName: 'ベストホーム',
      information: 'お振込み手数料はご負担ください。',
      userId: {
        signature: null,
      },
      invoiceMoneyList: mockInvoiceMoneyList,
    }];

    this.initializeInvoiceData(mockData);
  }
  

  public createImages(image,name):FileHandle  {
    console.log('Inside createImages()');
  
      console.log('Processing image:', image);
  
      const image1Blob = this.dataURItoBlob(image);
      console.log('Image1 blob:', image1Blob);
  
      const image1File = new File([image1Blob], name);
  
    
    const image1FileHandle: FileHandle = {
      file: image1File,
      url: this.createSafeObjectUrl(image1File)
    }
     return image1FileHandle;
  
     
  
  }

  private createSafeObjectUrl(file: File): SafeUrl {
    const objectUrl = window.URL.createObjectURL(file);
    const safeUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
    this.objectUrls.set(safeUrl, objectUrl);
    return safeUrl;
  }

  private revokeObjectUrl(url: SafeUrl | string | null | undefined): void {
    if (!url) {
      return;
    }
    const objectUrl = this.objectUrls.get(url as SafeUrl);
    if (objectUrl) {
      window.URL.revokeObjectURL(objectUrl);
      this.objectUrls.delete(url as SafeUrl);
    }
  }

  private revokeAllObjectUrls(): void {
    this.objectUrls.forEach((objectUrl) => window.URL.revokeObjectURL(objectUrl));
    this.objectUrls.clear();
  }

  public dataURItoBlob(image) {
    const byteString = window.atob(image);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
  
    for(let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
  
  const blob = new Blob([int8Array]);
    return blob;
  }

  calculateTotal(invoiceMoneyList: any): number {
    // Calculate the total based on the properties of invoiceMoneyList
    return (
      invoiceMoneyList.rentTotal +
      invoiceMoneyList.serviceFeeTotal +
      invoiceMoneyList.brokerageFeeTotal +
      invoiceMoneyList.parkingFee +
      invoiceMoneyList.bicycleParkingFeeTotal +
      invoiceMoneyList.keymoneyTotal +
      invoiceMoneyList.shikikinTotal +
      invoiceMoneyList.depositTotal +
      invoiceMoneyList.renewalFeeTotal +
      invoiceMoneyList.repairCostTotal +
      invoiceMoneyList.penaltyFeeTotal +
      invoiceMoneyList.signboardTotal +
      invoiceMoneyList.electricBillTotal +
      invoiceMoneyList.waterBillTotal +
      invoiceMoneyList.gasBillTotal +
      invoiceMoneyList.constructionBillTotal
    );
  }

  
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }


openGmail() {

  const today = new Date();
  const formattedDate = this.formatDate(today);
  // const filename = `Invoice_${this.itemVariables.borrowerPersonName}(${formattedDate}).pdf`;
  const filename = `Invoice.pdf`;


  const pdfOptions = {
    filename: filename,
    image: { type: 'jpeg', quality: 0.78 },
    html2canvas: { scale: 4 },
    jsPDF: { unit: 'mm', format: 'A4', printBackground: true },
    compress: true,
  };

  const mainContainer = document.getElementById('contentToConvert');
  mainContainer.style.fontSize = '12px';

  // Specify the selector for the tables you want to include in the PDF
  const tableSelector = '.table-to-convert';
  const tables = document.querySelectorAll(tableSelector);

  tables.forEach((table, index) => {
    // Add a page break before each table (except the first one)
    if (index > 0) {
      const blankPage = document.createElement('div');
      blankPage.style.pageBreakBefore = 'always';
      mainContainer.appendChild(blankPage);
    }
  });

  html2pdf().from(mainContainer).set(pdfOptions).output('blob').then((pdf) => {
    // Create a File object from the Blob
    const file = new File([pdf], pdfOptions.filename, { type: 'application/pdf' });
    // Save the File 
    this.savePdf(file, pdfOptions.filename);
  }).catch((error) => {
    console.error('Error generating PDF:', error);
  });
}
savePdf(pdf: File, filename: string) {
  const formData = new FormData();
  this.createdDate = new Date().toISOString().substring(0, 10);   
  formData.append('fileContent', pdf);
  formData.append('fileName', filename);
  formData.append('createdDate', this.createdDate);
  
  this.invoiceService.uploadFile(formData).pipe(tap(() => {
      console.log('PDF uploaded successfully.');
    })
  ).pipe(takeUntil(this.destroy$)).subscribe(
    (response) => {
      console.log('PDF uploaded successfully response.');
    },
    (error) => {
      console.error('Something went wrong during PDF upload:', error);
    }
  );



  this.bcooperate = this.itemVariables.borrowerCooperate;
  console.log("the borrowercooperate open gmail" + this.bcooperate);

  this.invoiceService.getBcMail(this.bcooperate).pipe(takeUntil(this.destroy$)).subscribe(
    (data: any) => {
      console.log("The company ID get bc mail  " + this.bcooperate);
      this.borrower = data;
      this.bc = data.bcMail;

      //console.log("Entire Contract " + JSON.stringify(this.borrower));

      // Assuming data is an array, loop through it
      for (const contractInfo of data) {
        console.log("Borrower Mail: " + contractInfo.bcMail);

        const subject = '請求書';
        const bodyTemplate = `%recipientName%  様、
        
      
      いつもお世話になっております。
      今月の請求書をお送り致します。
      ご確認よろしくお願い致します。
      %websiteLink%
      %personName%
      %companyName%
      〒%companyPostalFirst%-%companyPostalSecond% %address%
      %mobileFirst%-%mobileSecond%-%mobileThird%
      `;


      const concatenatedLink = environment.hostUrl + '/download/' + filename;

        const body = bodyTemplate


.replace('%recipientName%', this.itemVariables.borrowerPersonName)
.replace('%personName%', this.itemVariables.personName)
.replace('%companyName%', this.itemVariables.companyName)
.replace('%mobileFirst%', this.itemVariables.mobileFirst)
.replace('%mobileSecond%', this.itemVariables.mobileSecond)
.replace('%mobileThird%', this.itemVariables.mobileThird)
.replace('%companyPostalFirst%', this.itemVariables.companyPostalFirst)
.replace('%companyPostalSecond%', this.itemVariables.companyPostalSecond)
.replace('%address%', this.itemVariables.address)
.replace('%websiteLink%', concatenatedLink);
// .replace('%filename%',filename);

// Construct the Gmail URL with the recipient's email address
        // const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${contractInfo.bcMail}&su=${encodeURIComponent(subject)}`;

        const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${contractInfo.bcMail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        console.log("Borrower Mail: " + contractInfo.bcMail);

        // Open the Gmail compose window
        window.open(gmailURL, '_blank');
      }
    },
    (error) => {
      console.error('Error fetching owners:', error);
    }
  );

 
}

  onCancel() {

    this.router.navigate(['/pdf-collection']);
  
  }
  back(){
    window.history.back();
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.revokeAllObjectUrls();
  }
}


