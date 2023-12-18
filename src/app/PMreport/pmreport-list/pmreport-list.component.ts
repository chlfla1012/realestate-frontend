import { Component,OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { DatePipe } from '@angular/common';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';
import { PMReport } from 'src/app/Model/PMReport';
import { PmReportService } from 'src/app/Service/PMRepot/pmReport.service';

@Component({
  selector: 'app-pmreport-list',
  templateUrl: './pmreport-list.component.html',
  styleUrls: ['./pmreport-list.component.css']
})
export class PmreportListComponent implements OnInit {

  selectedOption:string;
  report: any;
  companyId: number;
  propertyName:string;
  ownerName:string;
  searchByCreatedDate: Date;
  searchPersonFullName: string;
  deleteStatus: boolean;
  filteredData: PMReport[] = [];
 
 // searchText:string;
  dataSource: MatTableDataSource<any>;
  
  displayedColumns: string[] = [ 'id','propertyName','ownerName','targetMonth','totalIncome','totalExpense','createdDate','modifiedDate',' '];
 


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private pmReportService: PmReportService,
    private userAuthService:UserAuthService,
    private datepipe: DatePipe,
    private router: Router, private dialog: MatDialog,
    private snackBar: MatSnackBar) { 
    this.dataSource = new MatTableDataSource<any>([]); // Initialize the dataSource with an empty array or your data
    this.dataSource.paginator=this.paginator;
  }

  ngOnInit(): void {
    this.getCurrentCompanyId();
    this.getAllReportByCompanyId();    

    }

  getCurrentCompanyId() {
      this.userAuthService.getCompanyId().subscribe(companyId => {     
      this.companyId = companyId;

      });
    }

    getAllReportByCompanyId(){
      
      this.pmReportService.getReportByCompanyId(this.companyId).subscribe(data => {
      this.report = data;      
      this.formatDateStrings();
      this.dataSource = new MatTableDataSource<any>(this.report);      
      this.dataSource.paginator = this.paginator;      
      },
      (error) => {
        console.error("Error in API call: ", error);
      }
    );
    }    

    navigateToCreatePage() {
      this.router.navigate(['/report-create']);
  
    }

  search() {
    // Convert the filter values to lowercase for case-insensitive search
    const filterValuePropertyName = this.propertyName ? this.propertyName.trim().toLowerCase() : null;
    const filterValueOwnerName = this.ownerName ? this.ownerName.trim().toLowerCase() : null;
    
    // Convert the selected date to the desired format (e.g., "YYYY-MM-DD")
    const filterValueCreatedDate = this.searchByCreatedDate
      ? this.datepipe.transform(this.searchByCreatedDate, 'yyyy-MM-dd')
      : null;
  
      
    // Use the MatTableDataSource filterPredicate to filter the data
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const report = data as PMReport;
  
      // Check if the property name, property type, and created date match the search criteria
      return (!filterValuePropertyName || report.propertyName.toLowerCase().includes(filterValuePropertyName)) &&
        (!filterValueOwnerName || report.ownerName.toLowerCase().includes(filterValueOwnerName)) &&
        ((!filterValueCreatedDate || report.createdDate === filterValueCreatedDate));
    };
    this.dataSource.filter = 'customFilter';
  }

  handleOptionChange(options:string,id:string,propertyName: string){
    switch(options){    
      case 'details':this.detailsReport(id);break;
      case 'update': this.editReport(id);break;
      case 'delete': this.confirmDelete(id,propertyName); break;
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
        if(result){ 
          this.pmReportService.deleteReport(id).subscribe(
            () => {                                
              this.report = this.report?.filter((report:PMReport)=> this.report.id !== id);
              window.location.reload();              
            },
            (error) => {
              console.error('Something wrong from .ts:', error);
            }
           
          );
        }      
                  
      });
    }

    formatDateStrings() {
      this.report.forEach((report: PMReport) => {
        if (report.createdDate !== null) {         
         const createdDate1 = this.datepipe.transform(report.createdDate, 'yyyy-MM-dd');
         const modifiedDate1 = this.datepipe.transform(report.modifiedDate, 'yyyy-MM-dd');
         const targetMonth1 = this.datepipe.transform(report.targetMonth,'yyyy-MM-dd');
         report.createdDate = createdDate1 ?? report.createdDate;
         report.modifiedDate = modifiedDate1 ?? report.modifiedDate;
         report.targetMonth = targetMonth1 ?? report.targetMonth;    
        }
      });
    }
 
    editReport(id: string){
      console.log(id);
      this.router.navigate(['report-edit', id]);
    }
    
    detailsReport(id: string) {
      this.router.navigate(['/report-details', id]);
    }

    sendPDF(id: string) {
      this.router.navigate(['/report-create-pdf', id]);
    } 
  
  reset() {
    this.propertyName = '';
    this.ownerName = '';
    this.searchByCreatedDate = null;
    this.dataSource.filter = null;
    // Clear the filter by setting it to null
  }

}
