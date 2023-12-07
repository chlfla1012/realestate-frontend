import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyName } from 'src/app/Model/CompanyName';
import { UserInfo } from 'src/app/Model/userInfo';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  companyName: CompanyName;
  selectionOption:string="";
  userRole: string="";
  userInfo:any;
  searchFirstName: string;
  searchLastName: string;
  searchByCreatedDate: Date;
  deleteStatus: boolean;
  companyId: number;
  filteredData: UserInfo[] = [];
  // dataSource: MatTableDataSource<any>;
  dataSource: MatTableDataSource<any>;
  // displayedColumns: string[] = [ 'id','companyName', 'firstName',
  //   'lastName', 'gender',  'email', 'startDate',
  //   'endDate', 'createdDate', 'modifiedDate', ' '];
  displayedColumns: string[] = [ 'id', 'firstName',
    'lastName', 'gender',  'email', 'startDate',
    'endDate', 'createdDate', 'modifiedDate', ' '];

   @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private service: UserInfoService,
    private datepipe: DatePipe,
    private router: Router, private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userAuthService:UserAuthService) { 
      this.dataSource = new MatTableDataSource<any>([]); // Initialize the dataSource with an empty array or your data
     this.dataSource.paginator=this.paginator;
  }

  ngOnInit(): void {
  
    // this.getAllUsers();
    

    // this.getCurrentCompanyName();
    // this.getAllUsersByCompanyName();
     
    this.getCurrentCompanyId();
    this.getAllUsersByCompanyId();
   

   
  }
  getAllUsersByCompanyId() {
    console.log("Company id 2", this.companyId);

    this.service.getUsersByCompanyId(this.companyId).subscribe(data => {
      
      this.userInfo= data;
      this.formatDateStrings();
      this.dataSource = new MatTableDataSource<any>(this.userInfo);
    console.log("Data"+this.dataSource);
    // Set the paginator for the MatTableDataSource
    this.dataSource.paginator = this.paginator;
      console.log("List" +this.userInfo);
    });
    
  }
  getCurrentCompanyId() {
    this.userAuthService.getCompanyId().subscribe(companyId => {
      this.companyId = companyId;
      console.log("Company id", this.companyId);
      
    });
     }


  getAllUsers() {
 this.service.getPICUsers().subscribe(data => {
      this.userInfo= data;
      this.formatDateStrings();
      this.dataSource = new MatTableDataSource<any>(this.userInfo);
    console.log("Data"+this.dataSource);
    // Set the paginator for the MatTableDataSource
    this.dataSource.paginator = this.paginator;
      console.log("List" +this.userInfo);
 });
  }

  search() {
    // Convert the filter values to lowercase for case-insensitive search
    const filterValueFirstName = this.searchFirstName ? this.searchFirstName.trim().toLowerCase() : null;
    const filterValueLastName = this.searchLastName ? this.searchLastName.trim().toLowerCase() : null;
  
    // Convert the selected date to the desired format (e.g., "YYYY-MM-DD")
    const filterValueCreatedDate = this.searchByCreatedDate
      ? this.datepipe.transform(this.searchByCreatedDate, 'yyyy-MM-dd')
      : null;
  
    // Use the MatTableDataSource filterPredicate to filter the data
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const user = data as UserInfo; // Replace 'UserInfo' with your actual data type
  
      // Check if the property name, property type, and created date match the search criteria
      return (
        (!filterValueFirstName || user.firstName.toLowerCase().includes(filterValueFirstName)) &&
        (!filterValueLastName || user.lastName.toLowerCase().includes(filterValueLastName)) &&
        (!filterValueCreatedDate || user.createdDate === filterValueCreatedDate)
      );
    };
  
  
  
  
    // Apply the filter
    this.dataSource.filter = 'customFilter';
  }
  
  reset() {
    this.searchFirstName = '';
    this.searchLastName = '';
    this.searchByCreatedDate = null;
    this.dataSource.filter = null;
  }
  handleOptionChange(options:string,id:string,name1:string,name2:string){
    
    switch(options){
     
      case 'delete': this.confirmDelete(id, name1,name2); break;
      case 'details':this.detailsUserInfo(id);break;
      case 'update': this.updateUserInfo(id);break;
    }

  }  
  
 

  confirmDelete(id: string, name1: string, name2: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        message: `選択された担当者名：「${name1 + ' ' + name2}」の内容を削除します`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.deleteUserInfo(id).subscribe(
          () => {
           this.userInfo = this.userInfo?.filter((user:UserInfo)=> user.id !== id);
            
            setTimeout(() => {
              window.location.reload();
              }, 50);
            console.log('User deleted successfully.');
          },
          (error) => {
            console.error('An error occurred:', error);
              this.showForeignKeyErrorSnackbar(name1 + ' ' + name2);
            
          }
        );
      }
    });
  }

  private showForeignKeyErrorSnackbar(name: string): void {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';

    this.snackBar.open(`この担当者：「${name}」を利用しているところがあるので、削除することはできません。`, '', {
      duration: 2000, // Adjust duration as needed
      horizontalPosition,
      verticalPosition,
      panelClass: ['blue-snackbar']
    });
  }

  updateUserInfo(id: string){
    console.log(id);
    this.router.navigate(['/user-edit', id]);
  }
  
  detailsUserInfo(id: string) {
    this.router.navigate(['/user-detail',id]);
  }
  navigateToCreatePage() {
    this.router.navigate(['/user-create']);

  }

  formatDateStrings() {
    this.userInfo.forEach((user:UserInfo) => {
      if (user.createdDate !== null) {
       // const originalDate = new Date(user.createdDate); 
        const startDate1 = this.datepipe.transform(user.startDate, 'yyyy-MM-dd');
        const endDate1 = this.datepipe.transform(user.endDate, 'yyyy-MM-dd');
        const createdDate1 = this.datepipe.transform(user.createdDate, 'yyyy-MM-dd');
        const modifiedDate1 = this.datepipe.transform(user.modifiedDate, 'yyyy-MM-dd');
        user.startDate = startDate1 ?? user.startDate;
        user.endDate = endDate1 ?? user.endDate;
        user.createdDate = createdDate1 ?? user.createdDate;
        user.modifiedDate = modifiedDate1 ?? user.modifiedDate;

      }
    });
  }
}
