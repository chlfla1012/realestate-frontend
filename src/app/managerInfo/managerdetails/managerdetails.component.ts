import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandle } from 'src/app/Model/FileHandle';
import { UserInfo } from 'src/app/Model/userInfo';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-managerdetails',
  templateUrl: './managerdetails.component.html',
  styleUrls: ['./managerdetails.component.css']
})
export class ManagerdetailsComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  private objectUrls = new Map<SafeUrl, string>();
  id: string;
  data: any;
  url1: SafeUrl;
  url2: SafeUrl;
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

    logo:null,
    signature: null


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

    this.service.getUserById(this.id).pipe(takeUntil(this.destroy$)).subscribe(
      (data: any) => {
      this.userInfo = data;
        this.userInfo.logo = this.createImage(data.logo.image, data.logo.name);
        this.userInfo.signature = this.createImage(data.signature.image, data.signature.name);
        // console.log(data.logo.logo);
        // console.log(data.logo.name);
        this.url1 = this.userInfo.logo.url;
        this.url2 = this.userInfo.signature.url;
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
      url: this.createSafeObjectUrl(image1File)
    }
    console.log(image1FileHandle);
     return image1FileHandle;
  
     

  }

  private createSafeObjectUrl(file: File): SafeUrl {
    const objectUrl = window.URL.createObjectURL(file);
    const safeUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
    this.objectUrls.set(safeUrl, objectUrl);
    return safeUrl;
  }

  private revokeAllObjectUrls(): void {
    this.objectUrls.forEach((objectUrl) => window.URL.revokeObjectURL(objectUrl));
    this.objectUrls.clear();
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

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
      if (result) {
        this.service.deleteUserInfo(id).pipe(takeUntil(this.destroy$)).subscribe(
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.revokeAllObjectUrls();
  }
}
