import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandle } from 'src/app/Model/FileHandle';
import { UserInfo } from 'src/app/Model/userInfo';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-managerdetails',
  templateUrl: './managerdetails.component.html',
  styleUrls: ['./managerdetails.component.css']
})
export class ManagerdetailsComponent {
  id: string;
  data: any;
  url: SafeUrl;
  userInfo: UserInfo = {
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
    apportionment:"",

    logo:null


    // customer: null
  }
  deleteStatus: boolean;
  constructor(private service: UserInfoService,
    private route: ActivatedRoute, private router: Router,private dialog: MatDialog,
    private snackBar: MatSnackBar, private sanitizer: DomSanitizer) {
    
  }

 
  ngOnInit(): void {
    this.getManagerById();

   
  }

  getManagerById() {
    this.id = this.route.snapshot.params['id'];

    this.service.getUserById(this.id).subscribe(
      (data: any) => {
      this.userInfo = data;
        this.userInfo.logo = this.createImage(data.logo.image, data.logo.name);
        // console.log(data.logo.logo);
        // console.log(data.logo.name);
        this.url = this.userInfo.logo.url;
        console.log(this.userInfo.companyId);

        console.log(this.userInfo.companyId.companyName);
      
      console.log(this.userInfo.id)
    })
  }
  public createImage(image,name):FileHandle  {
    console.log('Inside createImages()');
  
      console.log('Processing image:', image);
  
      const image1Blob = this.dataURItoBlob(image);
      console.log('Image1 blob:', image1Blob);
  
      const image1File = new File([image1Blob], name);

    
    const image1FileHandle: FileHandle = {
      file: image1File,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(image1File))
    }
    console.log(image1FileHandle);
     return image1FileHandle;
  
     

  }
  public dataURItoBlob(image) {
    const byteString = window.atob(image);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

  const blob = new Blob([int8Array]);
    return blob;
  }
  navigateToUpdatePage(id: string) {
    this.router.navigate(['/manager-edit', id]);

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
            this.router.navigate(['/manager-list']);

         
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

    this.snackBar.open(`この管理者：「${name}」を利用しているところがあるので、削除することはできません。`, '', {
      duration: 2000, // Adjust duration as needed
      horizontalPosition,
      verticalPosition,
      panelClass: ['blue-snackbar']
    });
  }
  
  back(){
    window.history.back();
  }
}
