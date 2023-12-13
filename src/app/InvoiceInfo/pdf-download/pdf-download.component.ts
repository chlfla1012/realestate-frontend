import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceServiceService } from 'src/app/Service/InvoiceInfo/invoice-service.service';
import { Invoice } from 'src/app/Model/Invoice';
import { InvoiceList } from 'src/app/Model/InvoiceList';

import { ActivatedRoute } from '@angular/router';
import { Borrower } from 'src/app/Model/Borrower';
import * as html2pdf from 'html2pdf.js';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-pdf-download',
  templateUrl: './pdf-download.component.html',
  styleUrls: ['./pdf-download.component.css'],

})
export class PdfDownloadComponent implements OnInit{
  @ViewChild('contentToConvert') contentToConvert!: ElementRef;

  borrower:Borrower[];
  borrowerData:Borrower;
  invoiceList:InvoiceList[];
  invoiceMoneyList: InvoiceList;
  // isTextareaReadOnly: boolean = true; // Set to true to make it read-only

  borrowerCooperate:string;
  companyId: number;
  // status: string = 'OK';
  filteredData: any[];
// bcMail: string;
itemVariables: any; 
// dataSource: MatTableDataSource<any>;
sumOfAmount: number = 0;
  invoice: Invoice[];
  propertyName:string;
  borrowerPersonName:string;
  id: string;
  invoiceInfo: any;
  bc:string;
  bcooperate:string;

dataSource: MatTableDataSource<any>;
displayedColumns: string[] = ['period','itemNo', 'amount', 'tax', 'total'];
  contractIDs: any;
  getContractId: any;
  getBorrowerCoporate: any;

constructor( private invoiceService: InvoiceServiceService,
              private route: ActivatedRoute,
              private router: Router ) { }


ngOnInit() {

//pass filtered data from pdf collection
  const filteredDataParam = this.route.snapshot.queryParams['filteredData'];


if (filteredDataParam) {
  this.filteredData = JSON.parse(filteredDataParam);
;

  // Extract properties from filteredData and assign to itemVariables 
  for (const item of this.filteredData) {
    this.itemVariables={
      id:item.id,
     companyPostalFirst:item.companyPostalFirst,
     companyPostalSecond:item.companyPostalSecond,
     companyName:item.companyId.companyName,
     companyAddress:item.companyAddress,
     personName:item.personName,
     mobileFirst:item.mobileFirst,
     mobileSecond:item.mobileSecond,
     mobileThird:item.mobileThird,
     propertyName:item.propertyName,
     roomNo:item.roomNo,
     floor:item.floor,
     buildingPostalFirst:item.buildingPostalFirst,
     buildingPostalLast:item.buildingPostalLast,
     address:item.address,
     borrowerCooperate:item.borrowerCooperate,
     borrowerPersonName:item.borrowerPersonName,
     paymentDueDate:item.paymentDueDate,
     
     billingDate:item.billingDate,
     bankName:item.bankName,
     branchName:item.branchName,
     accountType:item.accountType,
     accountNo:item.accountNo,
     accountName:item.accountName,
     information:item.information

    }
 
  }
      // Add more properties as needed
    const bc=this.itemVariables.borrowerCooperate;
    console.log('Item Variables:',this.itemVariables);
    console.log("the borrower cooperate is ",this.invoiceInfo.invoiceMoneyList.rent);
    // console.log("the bc name is "+this.borrowerCooperate);
}
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

  generatePDF() {
    const today = new Date();
    const formattedDate = this.formatDate(today);
    const pdfOptions = {
      filename: `Invoice_${this.itemVariables.borrowerPersonName}(${formattedDate}).pdf`,
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
  
    // Generate PDF with keepTogether option
    html2pdf()
      .from(mainContainer)
      .set({ ...pdfOptions, keepTogether: '.table-to-convert' }) // Keep tables together
      .save();
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

openGmail() {


  this.bcooperate = this.itemVariables.borrowerCooperate;
  console.log("the borrowercooperate open gmail" + this.bcooperate);

  this.invoiceService.getBcMail(this.bcooperate).subscribe(
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

      `;
        const body = bodyTemplate
.replace('%recipientName%', this.itemVariables.borrowerPersonName);
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

}


