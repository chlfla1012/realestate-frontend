import { Component,OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BankFormat } from 'src/app/Model/BankFormat';
import { DatePipe } from '@angular/common';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';
import { BankFormatService } from 'src/app/Service/BankFormat/bankFormat.service';

@Component({
  selector: 'app-bankformat-list',
  templateUrl: './bankformat-list.component.html',
  styleUrls: ['./bankformat-list.component.css']
})
export class BankFormatListComponent implements OnInit{
  searchByCreatedDate: Date;
  selectedOption:string;
  searchBankName: string;
  bankName:string;
  deleteStatus: boolean;
  bankformat:any;
  filteredData: BankFormat[] = [];
 
 // searchText:string;
  dataSource: MatTableDataSource<any>;
  
  displayedColumns: string[] = [ 'id','bankName','date','content','income','remark',`createdDate`,'modifiedDate',' '];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private service: BankFormatService,
    private datepipe: DatePipe,
    private router: Router, private dialog: MatDialog,
    private snackBar: MatSnackBar) { 
     this.dataSource = new MatTableDataSource<any>([]); // Initialize the dataSource with an empty array or your data
     this.dataSource.paginator=this.paginator;
  }
  
  ngOnInit(): void {   
    this.getAllBankFormat();    
    }

  getAllBankFormat(){
      this.service.getBankFormat().subscribe(data => {
        this.bankformat = data;
        this.formatDateStrings();
        this.dataSource = new MatTableDataSource<any>(this.bankformat);
      console.log("Data"+this.dataSource);
      // Set the paginator for the MatTableDataSource
      this.dataSource.paginator = this.paginator;
      console.log("Data ID"+this.bankformat.id);

      });
    }
   
    handleOptionChange(options:string,id:string,bankName:string){    
      switch(options){       
        case 'delete': this.confirmDelete(id, bankName); break;        
        case 'details':this.detailsBankFormat(id);break;
        case 'update': this.updateBankFormat(id);break;
      }  
    }
    
    confirmDelete(id: string, bankName: string): void {
    console.log(this.bankformat.id)
      const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
        data: {
          message: `選択された会社名：「${bankName}」の内容を削除します`,
        },
      });
      console.log(this.bankformat.id)

      dialogRef.afterClosed().subscribe((result) => {      
          this.service.deleteBankFormat(id).subscribe(
            () => {
    // Item deleted successfully, update your local data source or UI.
              console.log('BankFormat deleted successfully.');
            },           
          );
        });
      }

      formatDateStrings() {
        this.bankformat.forEach((bankformat:BankFormat) => {
          if (bankformat.createdDate !== null) {
           const originalDate = new Date(bankformat.createdDate); 
           const createdDate1 = this.datepipe.transform(bankformat.createdDate, 'yyyy-MM-dd');
           const modifiedDate1 = this.datepipe.transform(bankformat.modifiedDate, 'yyyy-MM-dd');
           bankformat.createdDate = createdDate1 ?? bankformat.createdDate;
           bankformat.modifiedDate = modifiedDate1 ?? bankformat.modifiedDate;    
          }
        });
      }
     
      updateBankFormat(id: string){
        console.log("ID:"+id);
        this.router.navigate(['/bankformat-edit', id]);
      }
      
      detailsBankFormat(id: string) {
        this.router.navigate(['/bankformat-detail', id]);
      }
  
      navigateToCreatePage() {
        this.router.navigate(['/bankformat-create']);
    
      }
  
  search() {
    // Convert the filter values to lowercase for case-insensitive search
    const filterValueBankName = this.bankName ? this.bankName.trim().toLowerCase() : null;
     
    // Convert the selected date to the desired format (e.g., "YYYY-MM-DD")
    const filterValueCreatedDate = this.searchByCreatedDate
      ? this.datepipe.transform(this.searchByCreatedDate, 'yyyy-MM-dd')
      : null;
  
      
    // Use the MatTableDataSource filterPredicate to filter the data
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const bankformat = data as BankFormat;
  
      // Check if the property name, property type, and created date match the search criteria
      return (!filterValueBankName || bankformat.bankName.toLowerCase().includes(filterValueBankName)) &&
        ((!filterValueCreatedDate || bankformat.createdDate === filterValueCreatedDate));
    };
    this.dataSource.filter = 'customFilter';
  }
  reset() {
    this.bankName = '';
    this.searchByCreatedDate = null;
     // Clear the filter by setting it to null
    this.dataSource.filter = null;
  }

  

}
