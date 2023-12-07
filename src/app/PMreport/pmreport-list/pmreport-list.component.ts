import { Component,OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
// import { DataTableDirective } from 'angular-datatables';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { DatePipe } from '@angular/common';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';
import { PMReport } from 'src/app/Model/PMReport';
import { PMReportService } from 'src/app/Service/PMRepot/pmReport.service';

@Component({
  selector: 'app-pmreport-list',
  templateUrl: './pmreport-list.component.html',
  styleUrls: ['./pmreport-list.component.css']
})
export class PmreportListComponent implements OnInit {

  selectedOption:string;
  report:any;
  companyId: number;
  propertyName:string;
  ownerName:string;
  ownerLastName:string;
  ownerFullName:string;
  ownerFullNameKana:string
  // personFirstName=this.customer.;
  // const personName= this.customer.personFirstName + " " + selectedPICData.lastNamekana;
  // personName: string = this.customer.personFirstName + ' ' + this.lastName;
  searchByCreatedDate: Date;
  searchPersonFullName: string;
  deleteStatus: boolean;
  filteredData: PMReport[] = [];
 
 // searchText:string;
  dataSource: MatTableDataSource<any>;
  
  displayedColumns: string[] = [ 'id','propertyName','ownerFullName','targetMonth','income','expense','createdDate','modifiedDate',' '];
 


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private service: PMReportService,
    private userAuthService:UserAuthService,
    private datepipe: DatePipe,
    private router: Router, private dialog: MatDialog,
    private snackBar: MatSnackBar) { 
      this.dataSource = new MatTableDataSource<any>([]); // Initialize the dataSource with an empty array or your data
     this.dataSource.paginator=this.paginator;
  }

  ngOnInit(): void {
    this.getCurrentCompanyId();

    }

  getCurrentCompanyId() {
      this.userAuthService.getCompanyId().subscribe(companyId => {
        this.companyId = companyId;

      });
    }

  navigateToCreatePage() {
    this.router.navigate(['/report-create']);

  }

  search() {
    // Convert the filter values to lowercase for case-insensitive search
    const filterValuePropertyName = this.propertyName ? this.propertyName.trim().toLowerCase() : null;
    const filterValueOwnerFullName = this.ownerFullName ? this.ownerFullName.trim().toLowerCase() : null;
    const filterValueOwnerFullNameKana = this.ownerFullNameKana? this.ownerFullNameKana.trim().toLowerCase() : null;
    
    // Convert the selected date to the desired format (e.g., "YYYY-MM-DD")
    const filterValueCreatedDate = this.searchByCreatedDate
      ? this.datepipe.transform(this.searchByCreatedDate, 'yyyy-MM-dd')
      : null;
  
      
    // Use the MatTableDataSource filterPredicate to filter the data
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      //const customer = data as Customer;
      const report = data as PMReport;
  
      // Check if the property name, property type, and created date match the search criteria
      return (!filterValuePropertyName || report.propertyName.toLowerCase().includes(filterValuePropertyName)) &&
        (!filterValueOwnerFullName || report.ownerName.toLowerCase().includes(filterValueOwnerFullName)) &&
        ((!filterValueCreatedDate || report.createdDate === filterValueCreatedDate));
    };
    this.dataSource.filter = 'customFilter';
  }

  handleOptionChange(options:string,id:string,propertyName:string){
    
    switch(options){
     
      case 'delete': this.confirmDelete(id, propertyName); break;
      
      case 'details':this.detailsReport(id);break;
      case 'update': this.updateReport(id);break;
      case 'sendPDF': this.sendPDF(id);break;
    }

  }

  confirmDelete(id: string, propertyName: string): void {
    console.log(this.report.id)
      const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
        data: {
          message: `選択された物件名：「${propertyName}」の内容を削除します`,
        },
      });
      console.log(this.report.id)

      dialogRef.afterClosed().subscribe((result) => {
      
          this.service.deleteReport(id).subscribe(
            () => {
    // Item deleted successfully, update your local data source or UI.
              console.log('Customer deleted successfully.');
            },
           
          );
        
      });
    }

    formatDateStrings() {
      this.report.forEach((report: PMReport) => {
        if (report.createdDate !== null) {
         const originalDate = new Date(report.createdDate); 
         const createdDate1 = this.datepipe.transform(report.createdDate, 'yyyy-MM-dd');
         const modifiedDate1 = this.datepipe.transform(report.modifiedDate, 'yyyy-MM-dd');
         report.createdDate = createdDate1 ?? report.createdDate;
         report.modifiedDate = modifiedDate1 ?? report.modifiedDate;    
        }
      });
    }

 
    updateReport(id: string){
      console.log(id);
      this.router.navigate(['/report-update', id]);
    }
    
    detailsReport(id: string) {
      this.router.navigate(['/report-details', id]);
    }

    sendPDF(id: string) {
      this.router.navigate(['/report-details', id]);
    } 
  
  reset() {
    this.propertyName = '';
    this.ownerFullName = '';
    this.searchByCreatedDate = null;
     // Clear the filter by setting it to null
    this.dataSource.filter = null;
  }

}
