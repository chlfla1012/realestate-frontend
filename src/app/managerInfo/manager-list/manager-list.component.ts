import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { UserInfo } from 'src/app/Model/userInfo';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css']
})
export class ManagerListComponent implements OnInit {
  selectionOption: string = "";
  userRole: string = "";
  userInfo: UserInfo[] = [
    {
      id: null,
      firstName: "",
      lastName: "",
      firstNamekana: "",
      lastNamekana: "",
      gender: "",
      dateOfBirth: "",
      department: "",
      phone1: null,
      phone2: null,
      phone3: null,
      password: "",
      email: "",
      postalcode1: null,
      postalcode2: null,
      address: "",
      startDate: "",
      endDate: "",
      roleType: "",
      bankName: "",
      branch: "",
      accountType: "",
      accountNumber: "",
      accountName: "",
      createdDate: "",
      modifiedDate: "",
      companyId:{companyName:null},
      apportionment: "",
      logo: null
    },
    // Add more UserInfo objects here if needed
    
  ];

  data = [/* your data goes here */];
  filteredData = this.data.slice(); // Initialize with all data
  
  searchFirstName: string;
  searchLastName: string;
  searchByCreatedDate: Date;
  companyName: string;
  //filteredData: UserInfo[] = [];
  // dataSource: MatTableDataSource<any>;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'companyName', 'firstName',
    'lastName', 'gender', 'email', 'startDate',
    'endDate', 'createdDate', 'modifiedDate', ' '];
  deleteStatus: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private service: UserInfoService,
    private datepipe: DatePipe, private router: Router, private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<any>([]); // Initialize the dataSource with an empty array or your data
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  managerList = []; 
  filteredManager = [...this.managerList]; // Initialize with all contracts

  ngOnInit(): void {
    this.service.getManagerUsers().subscribe((data: UserInfo[]) => {
      this.userInfo = data;
      this.formatDateStrings();
      this.dataSource = new MatTableDataSource<any>(this.userInfo);
      console.log("Data" + this.dataSource);
      // Set the paginator for the MatTableDataSource
      this.dataSource.paginator = this.paginator;

      // Access companyId of each userInfo using a for loop
      for (const user of this.userInfo) {
        console.log("CompanyId: " + user.companyId.companyName);
      }
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
  
      // Check if the user firstname, user last, and created date match the search criteria
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
    console.log("filterValueFirstName" + this.searchFirstName);
    console.log("filterValueLastName" + this.searchLastName);
    console.log("filterValueCreatedDate" + this.searchByCreatedDate);
    // this.searchFirstName = '';
    // this.searchLastName = '';
    // this.searchByCreatedDate = new Date();
    // this.dataSource.filter = '';
    this.searchFirstName = '';
  this.searchLastName = '';
  this.searchByCreatedDate = null;
  
  // Clear the filter by setting it to null
  this.dataSource.filter = null;
  }
  handleOptionChange(options: string, id: string, name1: string, name2: string) {

    switch (options) {

      case 'delete': this.confirmDelete(id, name1, name2); break;
      case 'details': this.detailsUserInfo(id); break;
      case 'update': this.updateUserInfo(id); break;
    }

  }
  confirmDelete(id: string, name1: string, name2: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        message: `選択された管理者名：「${name1 + ' ' + name2}」の内容を削除します`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.deleteUserInfo(id).subscribe(
          () => {
            this.userInfo = this.userInfo?.filter((user: UserInfo) => user.id !== id);

            setTimeout(() => {
              window.location.reload();
            }, 100);
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
    // この管理者：「佐藤　英子」を利用しているところがあるので、削除することはできません。
    this.snackBar.open(`この管理者：「${name}」を利用しているところがあるので、削除することはできません。`, '', {
      duration: 2000, // Adjust duration as needed
      horizontalPosition,
      verticalPosition,
      panelClass: ['blue-snackbar']
    });
  }
  // deleteUserInfo(id: number){
  //   this.service.deleteUserInfo(id).subscribe(data => {

  //   })

  //     setTimeout(()=>{
  //       window.location.reload();
  //     }, 100);





  // }

  // confirmDelete(id: number, name1: string, name2: string) {
  //   // const checkStatus: boolean;
  //   const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
  //     data: {

  //       message: `  選択された管理者名：「${name1+" "+name2}」の内容を削除します `,
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.deleteUserInfo(id);

  //     }

  //   });
  // }
  updateUserInfo(id: string) {
    console.log(id);
    this.router.navigate(['/manager-edit', id]);
  }

  detailsUserInfo(id: string) {
    this.router.navigate(['/manager-detail', id]);
  }
  navigateToCreatePage() {
    this.router.navigate(['/manager-create']);

  }

  formatDateStrings() {
    this.userInfo.forEach((user: UserInfo) => {
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
