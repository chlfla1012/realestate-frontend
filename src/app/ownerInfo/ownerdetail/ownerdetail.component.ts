import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from 'src/app/Model/userInfo';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-ownerdetail',
  templateUrl: './ownerdetail.component.html',
  styleUrls: ['./ownerdetail.component.css']
})
export class OwnerdetailComponent {
  id:string;
  data:any;
  userInfo: UserInfo = {
    id:null,
    firstName: "",
    lastName: "",
    firstNamekana: "",
    lastNamekana: "",
    gender:"",
    dateOfBirth:"",
    department:"",
    phone1: 0,
    phone2:0,
    phone3:0,
    password: "",
    email: "",
    postalcode1:"",
    postalcode2:"",
    address:"",
    startDate: "",
    endDate: "",
    roleType: "",
    bankName:"",
    branch:"",
    accountType:"",
    accountNumber:"",
    accountName:"",
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
    private snackBar: MatSnackBar) { 
    
    }

 
  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];

    this.service.getUserById(this.id).subscribe(data=>{
      this.userInfo = data;
      
      console.log(this.userInfo.id)
    })
  
  
  }
  navigateToUpdatePage(id: string) {
    this.router.navigate(['/owner-edit',id]);

  }

  back(){
    window.history.back();
  }
  // deleteUserInfo(id: number){
  //   this.service.deleteUserInfo(id).subscribe(data => {
  //     //this.userInfo = this.userInfo?.filter(user => user.id !== id);
  //   })
    
  //     setTimeout(()=>{
  //       window.location.reload();
  //     }, 100);
  
  // }


  // confirmDelete(id: number, name1: string, name2: string) {
  //   console.log(id, name1,name2);
  //   const result = window.confirm('オーナー様：' + '「' + name1 +' '+ name2+ '」' +
  //     'を削除します。よろしいですか。？');
  //   if (result) {
      
  //     this.deleteUserInfo(id);
  //   }
  // }
  // deleteUserInfo(id: number){
  //   this.service.deleteUserInfo(id).subscribe(data => {
  //     // this.property = this.property?.filter( => this.property.id !== id);
  //     this.deleteStatus = true;
  
  //   })
  //     setTimeout(()=>{
  //       window.location.reload();
  //     }, 100);
    
    
   
  
  
  // }
  
  // confirmDelete(id: number, name1: string, name2: string) {
  //   // const checkStatus: boolean;
  //   const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
  //     data: {
  
  //       message: `  選択されたオーナー名：「${name}」の内容を削除します`,
  //     },
  //   });
  
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.deleteUserInfo(id);
        
  //     }
     
  //   });
  // }
  confirmDelete(id: string, name1: string, name2: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        message: `選択されたオーナー名：「${name1 + ' ' + name2}」の内容を削除します`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.deleteUserInfo(id).subscribe(
          () => {
            this.router.navigate(['/owner-list']);

         
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

    this.snackBar.open(`このオーナー「${name}」を利用しているところがあるので、削除することはできません。`, '', {
      duration: 2000, // Adjust duration as needed
      horizontalPosition,
      verticalPosition,
      panelClass: ['blue-snackbar']
    });
  }
  

  keyPressNumeric(event:KeyboardEvent){
    const inp=String.fromCharCode(event.keyCode);

    if(/[0-9]/.test(inp))
    {
      return true;
    }
    event.preventDefault();
    return false;
  }

}
