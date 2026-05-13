
import { Component,OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, catchError, map, of , Subject } from 'rxjs';
import { Invoice } from 'src/app/Model/Invoice';
import { DatePipe } from '@angular/common';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';
import { InvoiceServiceService } from 'src/app/Service/InvoiceInfo/invoice-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { InvoiceList } from 'src/app/Model/InvoiceList';
import { FileHandle } from 'src/app/Model/FileHandle';
import { CompanyName } from 'src/app/Model/CompanyName';
import { data } from 'jquery';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pdf-collection',
  templateUrl: './pdf-collection.component.html',
  styleUrls: ['./pdf-collection.component.css']
})
export class PdfCollectionComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();
  id: string;
  logoId: number;
  companyId: number;
  status:string;

 
  invoiceList :InvoiceList;

  selectionOption:string="";
  errorMessage: string;
  invoice: any;
  // companyId: number;
  companyName:string;
  propertyName:string;
  borrowerCooperate:string
  brokerageFeeUsagePeriod: Date;
  searchPropertyName: string;
  searchBorrowerCooperate:string;
  searchByBillingDate:String;
  formattedsearchByBillingDate:String;
  billingDate:String;
  filteredData: Invoice[] = [];
  dataSource: MatTableDataSource<any>;
  // isTableHeaderVisible = true; // Control the visibility of the table header
  // isTableVisible = false; 
  // displayedColumns: string[] = [ 'id','propertyName','lenderPersonName',
  // 'floor','roomNo','createdDate','modifiedDate'];
  showTable: boolean = false;

  displayedColumns: string[] = ['id', 'propertyName', 'roomNo',
    'personName', 'borrowerCooperate', 'borrowerPersonName','createdDate', 'modifiedDate'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private invoiceService: InvoiceServiceService,
    private userAuthService:UserAuthService,
    private datepipe:DatePipe,
    private router:Router,
    private dialog:MatDialog,
    private snackBar:MatSnackBar){
      this.dataSource = new MatTableDataSource<any>([]); // Initialize the dataSource with an empty array 
      this.dataSource.paginator=this.paginator;
  }

 ngOnInit(): void {
  this.getCurrentCompanyId();
  this.getAllPDFByCompanyId();
  // this. getAllInvoiceByCompanyId();
 }
 getAllPDFByCompanyId(){
  console.log("getAll Invoice by Company Id ", this.companyId);
  this.invoiceService.getPDFByCompanyId(this.companyId).pipe(takeUntil(this.destroy$)).subscribe(data =>{
    this.invoice=data;
    console.log("Company id",this.companyId);
    console.log("invoice ",this.invoice)
    console.log("invoice ",this.invoice.billingDate);
    console.log("invoiceMoneyList ",this.invoice.invoicelistId);
    console.log("invoiceMoneyList ",this.invoice.invoiceMoneyList);
    console.log("invoice ",this.invoice.contract);



    this.formatDateStrings();
    this.dataSource=new MatTableDataSource<any>(this.invoice);
    console.log("Data"+this.dataSource);
    this.dataSource.paginator=this.paginator;
    console.log();
    
  });
 }

    getCurrentCompanyId() {
      this.userAuthService.getCompanyId().pipe(takeUntil(this.destroy$)).subscribe(companyId => {
        this.companyId = companyId;
        
      });
    }

    formatDateStrings() {
      this.invoice.forEach((invoice:Invoice) => {
        if (invoice.createdDate !== null) {
         const originalDate = new Date(invoice.createdDate);
         const createdDate1 = this.datepipe.transform(invoice.createdDate, 'yyyy-MM-dd');
         const modifiedDate1 = this.datepipe.transform(invoice.modifiedDate, 'yyyy-MM-dd');
         invoice.createdDate = createdDate1 ?? invoice.createdDate;
         invoice.modifiedDate = modifiedDate1 ?? invoice.modifiedDate;
        }
      });
    }

 onCancel() {
  this.router.navigate(['/invoice-list']);

  // Navigate to the previous page
}
back(){
  window.history.back();

}



search() {
  this.showTable = true;
  console.log("Search date: " + this.searchByBillingDate);

  const formattedsearchByBillingDate = this.searchByBillingDate?.replace('-', '/');
  console.log("Formatted Search Date: " + formattedsearchByBillingDate);

  console.log('Searching...', this.companyId, this.searchPropertyName, this.searchBorrowerCooperate);
 
  if (this.searchPropertyName || this.searchBorrowerCooperate || this.searchByBillingDate) {
    
    this.invoiceService.getPDFByCompanyId(this.companyId).pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.invoice = data;

      console.log("Entire array:", data);
      console.log("Entire array:", );
   ///   for(const invoiceInfo of data){
  //  const dateComponents = this.invoice.billingDate.split('/');
  //       const year = dateComponents[2];
  //       const month = dateComponents[0];
  //       const day = dateComponents[1];

  //       console.log("Year:", year);
  //       console.log("Month:", month);
  //       console.log("Day:", day);

  //       const formattedDate = `${year}/${month}`;
  //       console.log("Formatted Date"+formattedDate)

      //}
    
      // Perform filtering outside the subscription
      // const filteredData = data.filter(invoiceInfo => {
      //   const dateComponents = invoiceInfo.billingDate.split('/');
      //   const year = dateComponents[2];
      //   const month = dateComponents[0];
      //   const day = dateComponents[1];

      //   console.log("Year:", year);
      //   console.log("Month:", month);
      //   console.log("Day:", day);

      //   const formattedDate = `${year}/${month}`;

      //   console.log("Formatted Date:", formattedDate);
      //   console.log("Formatted"+formattedsearchByBillingDate)

      //   return formattedsearchByBillingDate === formattedDate;
      //   // console.log("Formatted1"+formattedsearchByBillingDate)

      // });

    

      const filtersearchValuePropertyName = this.searchPropertyName ? this.searchPropertyName.trim().toLowerCase() : null;
      const filterValuesearchBorrowerCooperate = this.searchBorrowerCooperate ? this.searchBorrowerCooperate.trim().toLowerCase() : null;
      const filterValuesearchByBillingDate = this.searchByBillingDate ? this.searchByBillingDate.toString().replace('-', '/') : null;
      // const filterValueformattedsearchByBillingDate = this.formattedsearchByBillingDate ?this.formattedsearchByBillingDate: null;


      // Store the original filter predicate
      const originalFilterPredicate = this.dataSource.filterPredicate;

      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const invoice = data as Invoice;
        const dateComponents = invoice.billingDate ? invoice.billingDate.split('/') : [];
        // DB stores yyyy/MM/dd → index 0=year, 1=month
        const year = dateComponents[0] ?? '';
        const month = dateComponents[1] ?? '';
        const formattedDate = year && month ? `${year}/${month}` : '';

        return (
          (!filtersearchValuePropertyName || (invoice.propertyName ?? '').toLowerCase().includes(filtersearchValuePropertyName)) &&
          (!filterValuesearchBorrowerCooperate || (invoice.borrowerCooperate ?? '').toLowerCase().includes(filterValuesearchBorrowerCooperate)) &&
          (!filterValuesearchByBillingDate || formattedDate === filterValuesearchByBillingDate)
        );
      };

      
console.log("Data for Original ")
      // Apply the filter
      this.dataSource.filter = 'customFilter';
    
      // Store the filtered data in a variable
      // const filteredDataArray = this.dataSource.filteredData;
        // console.log("Search Data:", this.userAuthService.filteredDataArray);
        // console.log("Search Data:fdf", filteredDataArray);
  
      // const filteredDataSource= this.dataSource.filter ;
      this.errorMessage = null;
   
    });

    console.log("Searching Date successful: " + this.dataSource);

  }
  //  else {
  //   this.errorMessage = 'Please fill in all three search boxes.';
  //   return;
  // }
  
}
 
pdfPreview() {
  const dataToPass: any[] = this.dataSource.filter
    ? this.dataSource.filteredData
    : this.dataSource.data;

  if (dataToPass && dataToPass.length > 0) {
    this.router.navigate(['/pdf-download'], {
      queryParams: { filteredData: JSON.stringify(dataToPass) },
    });
  } else {
    console.log('No data to preview.');
  }
}
  
reset() {
  this.searchPropertyName = '';
  this.searchBorrowerCooperate = '';
  this.searchByBillingDate = null;
  this.dataSource.filter = null;
}



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}




