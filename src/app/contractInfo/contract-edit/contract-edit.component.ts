import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { data, error } from 'jquery';
import { Subject } from 'rxjs';
import { Borrower } from 'src/app/Model/Borrower';
import { CompanyName } from 'src/app/Model/CompanyName';
import { Contract } from 'src/app/Model/Contract';
import { Lender } from 'src/app/Model/Lender';
import { Property } from 'src/app/Model/Property';
import { Tenant } from 'src/app/Model/Tenant';
import { UserInfo } from 'src/app/Model/userInfo';
import { ContractService } from 'src/app/Service/Contract/ContractService';
import { PropertyService } from 'src/app/Service/Property/PropertyService';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.component.html',
  styleUrls: ['./contract-edit.component.css']
})
export class ContractEditComponent {
  companyId: number;
  backendCompany: CompanyName = {

    companyName: null
  };
  @ViewChild('f') myForm!: NgForm;
  maxDate: string;  // Property to hold the max contract start date
  selectedaccounttype:string='regular';
  lendertype: string;
  borrowertype: string;
  data: any;

  // contracts:any;
  id: string;
  propertyid: number;
  // contracts: any;
  deleteStatus: boolean;
  picId: string;
  selectedProperty: any;

  propertyName: string ;
  selectedPropertyName: string;
  results: any[] = [];
  private searchTextChanged = new Subject<string>();

 containers: boolean[] = [true, false, false, false, false, false, false];
 errorMessage: string = '';
  // picId:string;
  propertyId:string;

  picName:string;
  picNamekana:string;
  picdepartment:string;
  propertyname:string;
  roomno:string;
  ownername:string;
  ownernamekana:string;
  mobileFirst:string;
  mobileSecond:string;
  mobileThird:string;
  contractEndDate:Date;
  contractStartDate:Date;
  contractLength:string;
  propertyIDs:Property[];
  picUsers:UserInfo[];
  propertyData:Property;
  picData:UserInfo;
  lender:Lender;
  borrower:Borrower;
  tenant:Tenant;
// lendertype: string;
// borrowertype: string;
contract:Contract={
  companyId: {
    companyName: null
  },
  id: null,
  propertyName: null,
  roomno: null,
  ownerName: null,
  ownerKana: null,

  lenderId: {
    lenderType: null,
    lenderFirstName: null,
    lenderLastName: null,
    lenderFirstKana: null,
    lenderLastKana: null,
    lenderTelFirst: null,
    lenderTelSecond: null,
    lenderTelThird: null,
    lenderPostalFirst: null,
    lenderPostalSecond: null,
    lenderAddress: null,
    lenderMemo: null,
    lenderCooperate: null,
    lcKana: null,
    lcpicFirstName: null,
    lcpicLastName: null,
    lcpicFirstKana: null,
    lcpicLastKana: null,
    lcMail: null,
    lcTelFirst: null,
    lcTelSecond: null,
    lcTelThird: null,
    lcPostalFirst: null,
    lcPostalSecond: null,
    lcAddress: null,
    lcMemo: null,
    id:null
  },
  borrowerId: {
    borrowerType: null,
    borrowerFirstName: null,
    borrowerLastName: null,
    borrowerFirstKana: null,
    borrowerLastKana: null,
    borrowerTelFirst: null,
    borrowerTelSecond: null,
    borrowerTelThird: null,
    borrowerPostalFirst: null,
    borrowerPostalSecond: null,
    borrowerAddress: null,
    borrowerMemo: null,
    borrowerCooperate: null,
    bcKana: null,
    bcpicFirstName: null,
    bcpicLastName: null,
    bcpicFirstKana: null,
    bcpicLastKana: null,
    bcMail: null,
    bcTelFirst: null,
    bcTelSecond: null,
    bcTelThird: null,
    bcPostalFirst: null,
    bcPostalSecond: null,
    bcAddress: null,
    bcMemo: null,
    id:null
  },
  tenantId: {
    tenantFirstName: null,
    tenantLastName: null,
    tenantFirstKana: null,
    tenantLastKana: null,
    tenantTelFirst: null,
    tenantTelSecond: null,
    tenantTelThird: null,
    tenantFurikomisaki: null,
    id: null
  },
  contractStartDate:" ",
  contractEndDate:" ",
  contractLength:" ",
  contractMemo: null,

  classification: null,
  taxRate: null,
  rent: null,
  rentTax: null,
  managementFee: null,
  managementFeeTax: null,
  parkingFee: null,
  parkingFeeTax: null,
  bicycleParkingFee: null,
  bicycleParkingFeeTax: null,
  keymoney: null,
  keymoneyTax: null,
  shikiken: null,
  shikikenTax: null,
  deposit: null,
  depositTax: null,
  renewalFee: null,
  renewalFeeTax: null,
  repairCost: null,
  repairCostTax: null,
  departureTime: false,
  penaltyFee: null,
  penaltyFeeTax: null,
  signboardFee: null,
  signboardFeeTax: null,
  brokerageFee: null,
  brokerageFeeTax: null,
  totalCost: null,
  bankName: null,
  branchName: null,
  accountType: null,
  accountNo: null,
  accountName: null,
  apportionment: null,
  picName: "",
  picNameKana: " ",
  mobileFirst: " ",
  mobileSecond: " ",
  mobileThird: " ",
  department: " ",
  pic: undefined,
  property: undefined,
  createdDate: null,
  modifiedDate: null,
  createdName: null,
  modifiedName: null,
  tenantFullName: null,
  tenantFullNameKana: null,
}
  locale: string;
  ownerUsers: any;

toggleContainer(index: number) {
  this.containers[index] = !this.containers[index];
}
updateContractEndDate() {
  if (this.contract.contractStartDate && this.contract.contractLength) {
    const startDate = new Date(this.contract.contractStartDate);
    const contractLength = parseInt(this.contract.contractLength, 10);
    startDate.setFullYear(startDate.getFullYear() + contractLength);
    startDate.setDate(startDate.getDate() - 1);

    // Format the date with the Japanese locale
    const datePipe = new DatePipe(this.locale);
    // this.contractEndDate=this.contract.contractEndDate;
    this.contract.contractEndDate = datePipe.transform(startDate, 'yyyy-MM-dd');
  } else {
    this.contract.contractEndDate = null;
  }
}
@ViewChild('searchModal') searchModal: any; // Add this line
filteredProperties: Property[];
searchText: string;


ownerKana: string;
ownerData: UserInfo;
ownerkana: string;

constructor(private contractService:ContractService,
  private userService:UserInfoService,
  private sanitizer:DomSanitizer,
  private propertyService:PropertyService,
 private route:ActivatedRoute,
  private router: Router,
  private dialog: MatDialog,
    private snackBar: MatSnackBar) {

 }
 ngOnInit(): void {
   this. getcontractById();
   this.getUsersbyPIC();
  //  this.getPropertyById();
 }
  getUsersbyPIC() {

    this.userService.getPICUsers().subscribe(data=>{
      this.picUsers=data;
    },
    (error)=>{
      console.error('error is occured',error);
    });
  }
  // getPropertyById(){
  //   this.propertyService.getPropertyById().subscribe(data=>{
  //     this.propertyData=data;
  //   },
  //   (error)=>{
  //     console.error('Error fetching properties:',error);
  //   })
  // }
  getUsersByOwner() {
    // console.log("start owner ", this.ownerUsers);

    this.userService.getOwners().subscribe(data => {
      this.ownerUsers = data;
      // console.log("owners", this.ownerUsers);
    },
      (error) => {
        console.error('Error fetching owners:', error);
      });  }

 getcontractById() {
 this.id= this.route.snapshot.params['id'];
 this.contractService.getcontractById(this.id).subscribe(
   (data:any) => {
     this.contract = data;
     this.contract.id = data.id;
    this.lender=data.lender;
    this.borrower=data.borrower;
    this.tenant=data.tenant;
    this.contract.pic = data.pic;
    this.picId = this.contract.pic?.id;
    this.picName = this.contract.picName;
    this.picNamekana=this.contract.picNameKana;
    this.mobileFirst=this.contract.mobileFirst;
    this.mobileSecond=this.contract.mobileSecond;
    this.mobileThird=this.contract.mobileThird;
    this.picdepartment=this.contract.department;
    //  console.log("The Contract ID is "+data.id);
    //  console.log("The contract length is "+data.contractLength);
    //  console.log("The lender ID is "+data.lender.id);
    //  console.log("the lender name is"+data.lender.lenderFirstName);


   },

   (error) => {
     console.error('Error:', error);
   }
 );
}
onPICSelectionChange() {
  this.userService.getUserById(this.picId).
    subscribe((data: UserInfo) => {
      this.mobileFirst = data.phone1.toString();
      this.mobileSecond = data.phone2.toString();
      this.mobileThird = data.phone3.toString();
      this.picName=data.firstName+" "+data.lastName;
          this.picNamekana = data.firstNamekana + " " + data.lastNamekana;
          this.picdepartment = data.department;
      console.log(this.mobileFirst, this.mobileSecond, this.mobileThird,this.picNamekana,this.picdepartment);

    });


}

// onPropertySelectionChange(){
//   this.propertyService.getPropertyById(this.propertyId).
//   subscribe((data: Property) => {
//     this.propertyname = data.propertyName;
//     this.roomno = data.room;
//     console.log(" the room no is "+this.roomno);
//     this.ownername = data.ownerName;
//     this.ownerKana = data.ownerKana;
//   },
//   (error) => {
//     console.error('Error fetching Property data:', error);
//   }
// );
// }
onInputChanged(): void {
  this.searchTextChanged.next(this.propertyName);
}

searchByPropertyName(): void {
  console.log("Property Name  "+this.propertyName);
  this.contractService.findByPropertyNameContaining(this.propertyName).subscribe((data) => {
    console.log("Property Name  "+this.propertyName);
    this.results = data;
  });
}

selectPropertyName(selectedPropertyName: string): void {
  console.log('Selected Property Name 02:', this.propertyName);
  this.propertyName = selectedPropertyName;
  console.log('Selected Property Name 04:', this.propertyName);

  // Call the service method and handle the subscription
  this.propertyService.getPropertiesByCompanyId(this.companyId) // Replace with your actual service method to get all properties
    .subscribe(
      (allProperties: Property[]) => {
        console.log('All Properties:', allProperties);

        // Find the selected property in the array
        const selectedProperty = allProperties.find(property => property.propertyName === this.propertyName);

        if (selectedProperty) {
          console.log('Selected Property:', selectedProperty);

          // Update component properties based on the selected property
          this.roomno = selectedProperty.room;
          console.log('Room no:', this.roomno);
          this.ownername = selectedProperty.ownerName;
          this.ownerKana = selectedProperty.ownerKana;

          // Optionally, do additional actions if needed

          // Trigger the change detection manually (if needed)
          // this.changeDetectorRef.detectChanges();
        } else {
          console.error('Selected property not found');
        }
      },
      (error) => {
        console.error('Error fetching Property data:', error);
      }
    );
}

    onSubmit(formData:NgForm){
      this.userService.getUserById(this.picId).subscribe
      ((selectedPICData: UserInfo) => {
        this.picName = selectedPICData.firstName +" "+
          selectedPICData.lastName;

        const mobileFirst = selectedPICData.phone1;
        const mobileSecond = selectedPICData.phone2;
        const mobileThird = selectedPICData.phone3;

        this.picData = selectedPICData;

        // this.contract.owner = this.ownerData;
        // this.property.ownerName = this.ownerName;
        // this.property.ownerKana = this.ownerKana;
        this.contract.pic = this.picData;
        this.contract.picName = this.picName;
        this.contract.mobileFirst = this.mobileFirst;
        this.contract.mobileSecond = this.mobileSecond;
        this.contract.mobileThird = this.mobileThird;

        console.log(this.contract.mobileFirst);
        // console.log(this.contract.owner);
      if (formData.invalid) {
        Object.keys(formData.controls).forEach((key) => {
          formData.controls[key].markAsTouched();
        });
        console.log("Form Errors");
        return;
      }
      console.log("submit" + this.contract.id);
      this.contractService.updateContract(this.id,this.contract).subscribe(
        (response:Contract)=>{
          console.log(response);
        },
        (error:HttpErrorResponse)=>{
          console.log(error);
        }
      )

      window.history.back();
      setTimeout(()=>{
          window.location.reload();
        }, 100);

    },
                  (selectedPICData: HttpErrorResponse) => {
                    console.log(selectedPICData);
                  }
                );
  }

   keyPressAlpha(event:KeyboardEvent){
    const inp=String.fromCharCode(event.keyCode);
    if(/[a-zA]/.test(inp)){
      return true;
    }
    else{
      event.preventDefault();
      return false;
    }
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
  keyPressKana(event:KeyboardEvent)
  {
    const inp=String.fromCharCode(event.keyCode);

    if(/^[ァ-ヶー　]+$/.test(inp))
    {
      return true;
    }
    else{
      event.preventDefault();
      return false;
    }
  }
  keyPressKanjihira(event:KeyboardEvent)
  {
    const inp=String.fromCharCode(event.keyCode);

    if(/^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+$/.test(inp))
    {
      return true;
    }
    else{
      event.preventDefault();
      return false;
    }
  }

  // ]
  validateKatakana(inputElement: HTMLInputElement): void {
    const inputValue = inputElement.value;
    const value = inputElement.value;
    const regex = /^[ァ-ヶー　]+$/; // Regular expression for katakana characters

    if (!regex.test(inputValue)) {
      this.errorMessage = 'Please enter katakana characters only.';
    } else {
      this.errorMessage = ''; // Clear the error message if input is valid
    }
  }
  keyPressDecimal(event: KeyboardEvent) {
    const allowedKeys = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']);

    const inputValue = (event.target as HTMLInputElement).value;
    const key = event.key;

    if (!allowedKeys.has(key) || (key === '.' && inputValue.includes('.'))) {
      event.preventDefault();
    }
  }
navigateToUpdatePage(id: string) {
 this.router.navigate(['/contract-update',id]);
 // window.history.back();

}
navigateToPreivousPage() {
  window.history.back();
}
confirmDelete(id: string, name: string, room: string) : void {
  const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
    data: {
      message: `  選択された物件:「${name+room}号」の契約情報内容を削除します`,
    },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.contractService.deleteContract(id).subscribe(
        () => {
          this.router.navigate(['/contract-list']);


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


onReset() {
  window.history.back();

}

}
