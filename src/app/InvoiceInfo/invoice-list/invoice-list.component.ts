import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/Model/Invoice';
import { Property } from 'src/app/Model/Property';
import { InvoiceServiceService } from 'src/app/Service/InvoiceInfo/invoice-service.service';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent {
  selectionOption: string = "";
  invoice: any;
  invoices: any;
  invoiceList: any;
  companyId: number;
  companyName: string;
  propertyName: string;
  brokerageFeeUsagePeriod: Date;
  searchByBillingDate:string;
  searchPropertyName: string;
  searchLenderPersonName:string;
  filteredData: Invoice[] = [];
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['id', 'propertyName', 'roomNo',
    'personName', 'lenderCooperate', 'lenderPersonName',
    'status', 'createdDate', 'modifiedDate', ' '];

  // constructor(private router: Router,
  //   private invoiceInfoService: InvoiceInfoService
  // , private dialog: MatDialog,private snackBar:MatSnackBar) {


  // }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private invoiceService: InvoiceServiceService,
    private userAuthService: UserAuthService,
    private datepipe: DatePipe, private router: Router, private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<any>([]); // Initialize the dataSource with an empty array or your data
    this.dataSource.paginator = this.paginator;
  }

  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  // managerList = []; 
  // filteredManager = [...this.managerList]; // Initialize with all contracts


  ngOnInit(): void {
    this.getCurrentCompanyId();
    this.getInvoiceByCompanyId();
  }

  formatDateStrings() {
    this.invoice.forEach((invoice: Invoice) => {
      if (invoice.createdDate !== null) {
        // const originalDate = new Date(user.createdDate); 
        const createdDate1 = this.datepipe.transform(invoice.createdDate, 'yyyy-MM-dd');
        const modifiedDate1 = this.datepipe.transform(invoice.modifiedDate, 'yyyy-MM-dd');
        invoice.createdDate = createdDate1 ?? invoice.createdDate;
        invoice.modifiedDate = modifiedDate1 ?? invoice.modifiedDate;

      }
    });
  }

  getCurrentCompanyId() {
    this.userAuthService.getCompanyId().subscribe(companyId => {
      this.companyId = companyId;

    });
  }

  getInvoiceByCompanyId() {
    console.log(this.companyId + " Hello !");
    this.invoiceService.getInvoiceAndInvoiceListByCompanyId(this.companyId).subscribe(data => {
      this.invoice = data;
      // this.invoiceList = data.invoicelistObj;
      console.log("Invice list backend data output " + this.invoice.address);
      for (const invoiceInfo of data) {
        console.log("Invice list backend data output "+invoiceInfo.billingDate);

      }
      this.formatDateStrings();
      this.dataSource = new MatTableDataSource<any>(this.invoice);
      console.log("Data" + this.dataSource.data);
      // Set the paginator for the MatTableDataSource
      this.dataSource.paginator = this.paginator;
      console.log("List" + this.invoice);
      //  this.dtTrigger.next(null);
    },
      (error) => {
        console.error("Error in API call: ", error);
      }
    );

    this.dataSource = new MatTableDataSource<any>(this.invoice);
    console.log("Data" + this.dataSource);
    // Set the paginator for the MatTableDataSource
    this.dataSource.paginator = this.paginator;
  }

  search() {
    // Convert the filter values to lowercase for case-insensitive search
    const filterValuePropertyName = this.searchPropertyName ? this.searchPropertyName.trim().toLowerCase() : null;
    const filterValuesearchByBillingDate = this.searchByBillingDate ? this.datepipe.transform(this.searchByBillingDate, 'MM/dd/yyyy'): null;
  
    console.log("Billing date data in the list page "+filterValuesearchByBillingDate);
    // Use the MatTableDataSource filterPredicate to filter the data
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const invoice = data as Invoice;// Replace 'Property' with your actual data type
      console.log("Billing date data in the list page "+invoice.billingDate);
      // Check if the property name and property type match the search criteria
      return ((!filterValuePropertyName || invoice.propertyName.toLowerCase().includes(filterValuePropertyName))) &&
             ((!filterValuesearchByBillingDate || invoice.billingDate == filterValuesearchByBillingDate));
    };
  
    // Apply the filter
    this.dataSource.filter = 'customFilter';
  }
  

  reset() {
    this.searchPropertyName = '';
    this.searchByBillingDate = null;
    this.dataSource.filter = '';
  }

  handleOptionChange(options:string,id:string,name:string,room:string){
    
    switch(options){
     
      case 'delete': this.confirmDelete(id, name,room); break; 
      case 'details':this.detailsInvoices(id);break;
      case 'update': this.updateInvoices(id);break;
    }
 
  }

  confirmDelete(id: string, name:string,room:string): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        message: `選択された物件名：「${name}」の内容を削除します`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.invoiceService.deleteInvoice(id).subscribe(
          () => {
           this.invoices = this.invoices ?.filter((invoice:Invoice)=> invoice.id !== id);
            // this.showDeleteSuccessSnackbar(name);
            console.log('Property deleted successfully.');

            // setTimeout(() => {
            //   window.location.reload();
            //   }, 20);
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

    this.snackBar.open(`この物件：「${name}」を利用しているところがあるので、削除することはできません。`, '', {
      duration: 2000, // Adjust duration as needed
      horizontalPosition,
      verticalPosition,
      panelClass: ['blue-snackbar']
    });
  }

  navigateToCreatePage() {
    this.router.navigate(['/invoice-create']);
  }
  navigateToPDFCreatePage() {
    this.router.navigate(['/pdf-collection']);
  }
  updateInvoices(id: string) {
    console.log(id);
    this.router.navigate(['invoice-edit', id]);
  }

  detailsInvoices(id: string) {
    this.router.navigate(['invoice-detail', id]);
  }
}