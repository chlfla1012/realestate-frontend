import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import { error } from 'jquery';
import { filter } from 'rxjs';
import { CompanyName } from 'src/app/Model/CompanyName';
import { Property } from 'src/app/Model/Property';
import { PropertyService } from 'src/app/Service/Property/PropertyService';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent {
  currentRoute: string;
  selectedOption:string;
  properties: any;
  searchPropertyName: string;
  searchPropertyType: string;
   deleteStatus: boolean=true;
  companyName: CompanyName;
  companyId: number;
  backendCompany: CompanyName = {
    
    companyName: null
  };
  filteredData: Property[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

 // searchText:string;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['物件ID','物件種別', '物件名', '物件のステータス', 'フロア',
    '号室', 'オーナー名前', '担当者名前', '登録日', '更新日', ' '];
    // displayedColumns: string[] = ['物件ID', '物件種別', '物件名', '物件のステータス', 'フロア',
    // '登録日','更新日', 'status'];

  constructor(private router: Router,
    private userAuthService:UserAuthService,
    private propertyService: PropertyService
  , private dialog: MatDialog,private snackBar:MatSnackBar) {

    
  }
  ngOnInit(): void {
   
    // this.getAllProperties();
    // this.getCurrentCompanyName();
    // this.getPropertiesByCompanyName();
    this.getCurrentUserInfo();
    this.getPropertiesByCompanyId();
    
  
   
  }
  getPropertiesByCompanyId() {
    this.propertyService.getPropertiesByCompanyId(this.companyId).subscribe(data => {
      this.properties = data;
     
      this.dataSource = new MatTableDataSource<any>(this.properties);
    console.log("Data"+this.dataSource);
    // Set the paginator for the MatTableDataSource
    this.dataSource.paginator = this.paginator;
      console.log("List" +this.properties);
    //  this.dtTrigger.next(null);
    });
   
    this.dataSource = new MatTableDataSource<any>(this.properties);
    console.log("Data"+this.dataSource);
    // Set the paginator for the MatTableDataSource
    this.dataSource.paginator = this.paginator;
  }
  getCurrentUserInfo() {
    this.userAuthService.getCompanyId().subscribe(companyId => {
      this.companyId = companyId;
    });

    this.userAuthService.getCompanyName().subscribe(backendCompany => {
      this.backendCompany = backendCompany;
    });

   
    console.log("Get Login data", this.companyId);
  }

  
  getAllProperties() {
    this.propertyService.getProperty().subscribe(data => {
      this.properties = data;
     
      this.dataSource = new MatTableDataSource<any>(this.properties);
    console.log("Data"+this.dataSource);
    // Set the paginator for the MatTableDataSource
    this.dataSource.paginator = this.paginator;
      console.log("List" +this.properties);
    //  this.dtTrigger.next(null);
    });
   
    this.dataSource = new MatTableDataSource<any>(this.properties);
    console.log("Data"+this.dataSource);
    // Set the paginator for the MatTableDataSource
    this.dataSource.paginator = this.paginator;
  }

  handleOptionChange(options:string,id:string,name:string,room:string){
    
    switch(options){
     
      case 'delete': this.confirmDelete(id, name,room); break;
      
      case 'details':this.detailsProperty(id);break;
      case 'update': this.updateProperty(id);break;
    }
 
  }
  search() {
    // Convert the filter values to lowercase for case-insensitive search
    const filterValuePropertyName = this.searchPropertyName ? this.searchPropertyName.trim().toLowerCase() : null;
    const filterValuePropertyType = this.searchPropertyType ? this.searchPropertyType.trim().toLowerCase() : null;
  
    // Use the MatTableDataSource filterPredicate to filter the data
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const property = data as Property; // Replace 'Property' with your actual data type
  
      // Check if the property name and property type match the search criteria
      return (!filterValuePropertyName || property.propertyName.toLowerCase().includes(filterValuePropertyName)) &&
             (!filterValuePropertyType || property.propertyType.toLowerCase().includes(filterValuePropertyType));
    };
  
    // Apply the filter
    this.dataSource.filter = 'customFilter';
  }
  
  reset() {
    this.searchPropertyName = '';
    this.searchPropertyType = '';
    this.dataSource.filter = '';
  }
  
 
  confirmDelete(id: string, name:string,room:string): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        message: `選択された物件名：「${name}」の内容を削除します`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.propertyService.deleteProperty(id).subscribe(
          () => {
           this.properties = this.properties?.filter((property:Property)=> property.id !== id);
            // this.showDeleteSuccessSnackbar(name);
            console.log('Property deleted successfully.');

            setTimeout(() => {
              window.location.reload();
              }, 20);
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
  
  showDeleteSuccessSnackbar(name: string) {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';
  
    this.snackBar.open(`「${name}」を削除しました。`, '', {
      duration: 2000, // Adjust duration as needed
      horizontalPosition,
      verticalPosition,
      panelClass: ['green-snackbar']
    });
  }

  updateProperty(id: string){
    console.log(id);
    this.router.navigate(['property-update', id]);
  }
  detailsProperty(id: string) {
    this.router.navigate(['/property-details', id]);
    console.log(id);
  }
  navigateToCreatePage() {
    this.router.navigate(['/property-create']);
 
  }
}
