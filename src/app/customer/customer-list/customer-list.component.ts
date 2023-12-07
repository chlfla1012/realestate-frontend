import { Component,OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
// import { DataTableDirective } from 'angular-datatables';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { Customer } from 'src/app/Model/Customer';
import { DatePipe } from '@angular/common';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';
import { CustomerService } from 'src/app/Service/Customer/CustomerService';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit{
  selectedOption:string;
  customer:any;
  companyId: number;
  companyName:string;
  personFirstName:string;
  personLastName:string;
  personFullName:string;
  personFullNameKana:string
  // personFirstName=this.customer.;
  // const personName= this.customer.personFirstName + " " + selectedPICData.lastNamekana;
  // personName: string = this.customer.personFirstName + ' ' + this.lastName;
  searchByCreatedDate: Date;
  searchPersonFullName: string;
  deleteStatus: boolean;
  filteredData: Customer[] = [];
 
 // searchText:string;
  dataSource: MatTableDataSource<any>;
  
  displayedColumns: string[] = [ 'id','type','companyName','department','personFullName','mailAdd',`createdDate`,'modifiedDate',' '];
 

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // constructor(private service: CustomerService, private router: Router) { 
   
  // }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private service: CustomerService,
    private userAuthService:UserAuthService,
    private datepipe: DatePipe,
    private router: Router, private dialog: MatDialog,
    private snackBar: MatSnackBar) { 
      this.dataSource = new MatTableDataSource<any>([]); // Initialize the dataSource with an empty array or your data
     this.dataSource.paginator=this.paginator;
  }
  
  //dtOptions:DataTables.Settings={};
  //dtTrigger:Subject<any>=new Subject<any>();

  ngOnInit(): void {
   
    this.getCurrentCompanyId();
    this.getAllCustomersByCompanyId();
     // Initialize the MatTableDataSource with your initial data
    
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   searching: true,
    //   lengthChange: false,
    //   language: {
    //     searchPlaceholder: 'Text Customer'
    //   }
    // // };
    // this.service.getCustomer().subscribe(data => {
    //   this.customer= data;
    //   this.dataSource = new MatTableDataSource<any>(this.customer);
    // console.log("Data"+this.dataSource);
    // // Set the paginator for the MatTableDataSource
    // this.dataSource.paginator = this.paginator;
    //   console.log("List" +this.customer);
    // this.dtTrigger.next(null);
    }

    getCurrentCompanyId() {
      this.userAuthService.getCompanyId().subscribe(companyId => {
        this.companyId = companyId;
        
      });
    }
    
    getAllCustomersByCompanyId(){
      
      console.log("Company id 2", this.companyId);
      this.service.getCustomersByCompanyId(this.companyId).subscribe(data => {
        this.customer = data;
        console.log("Company id", this.companyId);
  
        this.formatDateStrings();
        this.dataSource = new MatTableDataSource<any>(this.customer);
      console.log("Data"+this.dataSource);
      // Set the paginator for the MatTableDataSource
      this.dataSource.paginator = this.paginator;
      console.log(this.customer.id)

      });
    }
   
    getAllCustomers() {
      console.log(this.customer.id)

      this.service.getCustomer().subscribe(data => {
        this.customer= data;
      this.formatDateStrings();
        this.dataSource = new MatTableDataSource<any>(this.customer);
      console.log("Data"+this.dataSource);
      // Set the paginator for the MatTableDataSource
      this.dataSource.paginator = this.paginator;
      });
    }
    

    handleOptionChange(options:string,id:string,companyName:string){
    
      switch(options){
       
        case 'delete': this.confirmDelete(id, companyName); break;
        
        case 'details':this.detailsCustomer(id);break;
        case 'update': this.updateCustomer(id);break;
      }
  
    }
    
    confirmDelete(id: string, companyName: string): void {
    console.log(this.customer.id)
      const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
        data: {
          message: `選択された会社名：「${companyName}」の内容を削除します`,
        },
      });
      console.log(this.customer.id)

      dialogRef.afterClosed().subscribe((result) => {
      
          this.service.deleteCustomer(id).subscribe(
            () => {
    // Item deleted successfully, update your local data source or UI.
              console.log('Customer deleted successfully.');
            },
           
          );
        
      });
    }
  

      formatDateStrings() {
        this.customer.forEach((customer:Customer) => {
          if (customer.createdDate !== null) {
           const originalDate = new Date(customer.createdDate); 
           const createdDate1 = this.datepipe.transform(customer.createdDate, 'yyyy-MM-dd');
           const modifiedDate1 = this.datepipe.transform(customer.modifiedDate, 'yyyy-MM-dd');
           customer.createdDate = createdDate1 ?? customer.createdDate;
           customer.modifiedDate = modifiedDate1 ?? customer.modifiedDate;    
          }
        });
      }
  
   
      updateCustomer(id: string){
        console.log(id);
        this.router.navigate(['/customer-update', id]);
      }
      
      detailsCustomer(id: string) {
        this.router.navigate(['/customer-details', id]);
      }

      
      
  
    
      navigateToCreatePage() {
        this.router.navigate(['/customer-create']);
    
      }
    // this.dataSource = new MatTableDataSource<any>(this.customers);
    // console.log("Data"+this.dataSource);
    // // Set the paginator for the MatTableDataSource
    // this.dataSource.paginator = this.paginator;
   
  

  search() {
    // Convert the filter values to lowercase for case-insensitive search
    const filterValueCompanyName = this.companyName ? this.companyName.trim().toLowerCase() : null;
    const filterValuePersonFullName = this.personFullName ? this.personFullName.trim().toLowerCase() : null;
    const filterValuePersonFullNameKana = this.personFullNameKana? this.personFullNameKana.trim().toLowerCase() : null;
    
    // Convert the selected date to the desired format (e.g., "YYYY-MM-DD")
    const filterValueCreatedDate = this.searchByCreatedDate
      ? this.datepipe.transform(this.searchByCreatedDate, 'yyyy-MM-dd')
      : null;
  
      
    // Use the MatTableDataSource filterPredicate to filter the data
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const customer = data as Customer;
  
      // Check if the property name, property type, and created date match the search criteria
      return (!filterValueCompanyName || customer.companyName.toLowerCase().includes(filterValueCompanyName)) &&
        (!filterValuePersonFullName || customer.personFullName.toLowerCase().includes(filterValuePersonFullName)) &&
        ((!filterValueCreatedDate || customer.createdDate === filterValueCreatedDate));
    };
    this.dataSource.filter = 'customFilter';
  }
  reset() {
    this.companyName = '';
    this.personFullName = '';
    this.searchByCreatedDate = null;
     // Clear the filter by setting it to null
    this.dataSource.filter = null;
  }

  // formatDateStrings() {
  //   this.customer.forEach((customer:Customer) => {
  //     if (customer.createdDate !== null) {
  //      // const originalDate = new Date(user.createdDate); 
  //       // const startDate1 = this.datepipe.transform(user.startDate, 'yyyy-MM-dd');
  //       // const endDate1 = this.datepipe.transform(user.endDate, 'yyyy-MM-dd');
  //       const createdDate1 = this.datepipe.transform(customer.createdDate, 'yyyy-MM-dd');
  //       const modifiedDate1 = this.datepipe.transform(customer.modifiedDate, 'yyyy-MM-dd');
  //       // user.startDate = startDate1 ?? user.startDate;
  //       // user.endDate = endDate1 ?? user.endDate;
  //       customer.createdDate = createdDate1 ?? customer.createdDate;
  //       customer.modifiedDate = modifiedDate1 ?? customer.modifiedDate;

  //     }
  //   });
  // }

}


















//   handleOptionChange(options:string,id:number,companyname:string,personName:string){
    
//     switch(options){
     
//       case 'delete': this.confirmDelete(id,personName); break;
      
//       case 'details':this.detailsCustomer(id);break;
//       case 'update': this.updateCustomer(id);break;
//     }

//   }
  
//   deleteCustomer(id: number){
//     this.service.deleteCustomer(id).subscribe(data => {
//       this.customers = this.customers?.filter(user => user.id !== id);
//     })
    
//       setTimeout(()=>{
//         window.location.reload();
//       }, 100);
  
//   }


//   confirmDelete(id: number, name: string) {
//     console.log(id, name);
//     const result = window.confirm('取引先の担当者名：' + '「' + name + '」' +
//       'を削除します。よろしいですか。？');
//     if (result) {
      
//       this.deleteCustomer(id);
//     }
//   }

//   updateCustomer(id: number){
//     console.log(id);
//     this.router.navigate(['customer-update', id]);
//   }
//   detailsCustomer(id: number) {
//     this.router.navigate(['/customer-details',id]);
//   }

