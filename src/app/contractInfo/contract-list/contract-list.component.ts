import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { CompanyName } from 'src/app/Model/CompanyName';
import { Contract } from 'src/app/Model/Contract';
import { UserInfo } from 'src/app/Model/userInfo';
import { ContractService } from 'src/app/Service/Contract/ContractService';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent {
  currentRoute:string;
  selectedOption:string;
  companyId:number;
  contract:any;
  searchPropertyName:string;
  searchByCreatedDate:Date;
  deleteStatus:boolean;
  filteredData:Contract[]=[];

  //searchText:String;

dataSource:MatTableDataSource<any>;
displayedColumns: string[] = ['id','propertyName','roomno', 'tenantFullName',
     'picName', 'contractStartDate', 'contractEndDate', 'createdDate', 'modifiedDate', ' '];
 @ViewChild(MatPaginator)paginator!:MatPaginator;

 constructor(private service:ContractService,
  private UserAuthService:UserAuthService,
  private datepipe:DatePipe,
  private router:Router,
  private dialog:MatDialog,
  private snackBar:MatSnackBar){
    this.dataSource=new MatTableDataSource<any>([]);
    this.dataSource.paginator=this.paginator;
  }
 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getCurrentCompanyId();
  this.getAllContractsByCompanyId();


 }
 getCurrentCompanyId(){
  this.UserAuthService.getCompanyId().subscribe(companyId=>{
    this.companyId=companyId;
  });
 }

 getAllContractsByCompanyId(){
  console.log("Company id 2", this.companyId);
  this.service.getContractsByCompanyId(this.companyId).subscribe(data=>{
    this.contract=data;
    console.log("Company id",this.companyId);
    console.log("contract",this.contract)

    this.formatDateStrings();
    this.dataSource=new MatTableDataSource<any>(this.contract);
    console.log("Data"+this.dataSource);
    this.dataSource.paginator=this.paginator;
    console.log(this.contract.id);

  });
 }

 getAllContracts()
 {
  console.log(this.contract.id)
  this.service.getContract().subscribe(data=>{
    this.contract=data;
    this.formatDateStrings();
    this.dataSource=new MatTableDataSource<any>(this.contract);
    this.dataSource.paginator=this.paginator;
  });
 }

 handleOptionChange(options: string, id: string, name: string,room:string) {
  switch (options) {
    case 'delete': this.confirmDelete(id, name,room); break;
    case 'details': this.detailscontract(id); break;
    case 'update': this.updatecontract(id); break;
  }
}
confirmDelete(id: string, name: string, room: string): void {
  const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
    data: {
      message: `  選択された物件:「${name+room}号」の契約情報内容を削除します`,
    },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.service.deleteContract(id).subscribe(
        () => {
          this.contract = this.contract?.filter(contract => contract.id !== id);

          setTimeout(() => {
            window.location.reload();
            }, 100);
          console.log('contract deleted successfully.');
        },
        (error) => {
          console.error('An error occurred:', error);
            this.showForeignKeyErrorSnackbar(name,room);

        }
      );
    }
  });
}

private showForeignKeyErrorSnackbar(name: string,room:string): void {
  const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  const verticalPosition: MatSnackBarVerticalPosition = 'top';

  this.snackBar.open(`選択された物件:「${name+room}号」の契約情報内容を利用しているところがあるので、削除することは出来ません。`, '', {
    duration: 2000, // Adjust duration as needed
    horizontalPosition,
    verticalPosition,
    panelClass: ['blue-snackbar']
  });
}
formatDateStrings() {
  this.contract.forEach((contract:Contract) => {
    if (contract.createdDate !== null) {
     const originalDate = new Date(contract.createdDate);
     const createdDate1 = this.datepipe.transform(contract.createdDate, 'yyyy-MM-dd');
     const modifiedDate1 = this.datepipe.transform(contract.modifiedDate, 'yyyy-MM-dd');
     contract.createdDate = createdDate1 ?? contract.createdDate;
     contract.modifiedDate = modifiedDate1 ?? contract.modifiedDate;
    }
  });
}

updatecontract(id: string) {
  this.router.navigate(['/contract-update', id]);
}

detailscontract(id: string) {
  this.router.navigate(['/contract-details', id]);
}

navigateToCreatePage() {
  this.router.navigate(['/contract-create']);
}

search() {
  // Convert the filter values to lowercase for case-insensitive search
  const filterValuePropertyName=this.searchPropertyName?this.searchPropertyName.trim().toLowerCase():null;

  // Convert the selected date to the desired format (e.g., "YYYY-MM-DD")
  const filterValueCreatedDate = this.searchByCreatedDate
    ? this.datepipe.transform(this.searchByCreatedDate, 'yyyy-MM-dd')
    : null;


  // Use the MatTableDataSource filterPredicate to filter the data
  this.dataSource.filterPredicate = (data: any, filter: string) => {
    // const customer = data as Customer;
    const contract=data as Contract;

    // Check if the property name, property type, and created date match the search criteria
    return(!filterValuePropertyName||contract.propertyName.toLowerCase().includes(filterValuePropertyName))&&
    ((!filterValueCreatedDate || contract.createdDate==filterValueCreatedDate));

  };
  this.dataSource.filter = 'customFilter';
}
reset() {
  this.searchPropertyName = '';
  this.searchByCreatedDate = null;
   // Clear the filter by setting it to null
  this.dataSource.filter = null;
}


}
