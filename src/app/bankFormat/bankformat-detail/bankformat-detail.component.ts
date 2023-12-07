import { Component } from '@angular/core';
import { BankFormat } from 'src/app/Model/BankFormat';
import { BankFormatService } from 'src/app/Service/BankFormat/bankFormat.service'
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, catchError, map, of, throwError } from "rxjs";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';
import { SafeUrl } from '@angular/platform-browser';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';


@Component({
  selector: 'app-bankformat-detail',
  templateUrl: './bankformat-detail.component.html',
  styleUrls: ['./bankformat-detail.component.css']
})
export class BankFormatDetailComponent {
  @ViewChild('f') myForm!: NgForm;
  deleteStatus: boolean;
  id: string;
  data: any;
  bankformat: BankFormat = {
    id: null,
    bankName: "",
    date: "",
    content: "",
    income: "",
    remark: "",
    createdDate: "",
    modifiedDate: ""
  }
  constructor(private service: BankFormatService,
    private route: ActivatedRoute, private router: Router, private dialog: MatDialog,
    private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    console.log("Testing from detail"+this.id)
    this.id = this.route.snapshot.params['id'];
    this.service.getBankFormatById(this.id).subscribe(data => {
      this.bankformat = data;
      console.log("Testing from detailid"+this.bankformat.id)
    })
  }

  navigateToUpdatePage(id: string) {
    this.router.navigate(['bankformat-edit/', id]);

  }

  confirmDelete(id: string, bankName: string): void {
    console.log(this.bankformat.id)
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        message: `選択された銀行名：「${bankName}」の内容を削除します`,
      },
    });
    console.log(this.bankformat.id)

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.deleteBankFormat(this.id).subscribe(
          () => {
            // Item deleted successfully, update your local data source or UI.
            console.log('Bank format deleted successfully.');
          },

        );
        setTimeout(() => {
          window.history.back();
        }, 100);

      }
    });
  }

  back() {
    this.router.navigate(['/bankformat-list']);
  }

  onReset() {
    window.history.back();

  }

}