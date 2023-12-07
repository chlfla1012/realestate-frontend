import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandle } from 'src/app/Model/FileHandle';
import { Property } from 'src/app/Model/Property';
import { UserInfo } from 'src/app/Model/userInfo';
import { PropertyService } from 'src/app/Service/Property/PropertyService';
import { DeleteConfirmDialogComponent } from 'src/app/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-propertydetail',
  templateUrl: './propertydetail.component.html',
  styleUrls: ['./propertydetail.component.css']
})
export class PropertydetailComponent {
  ownerId: string;
  ownerName: string;
  ownerKana: string;
  picId: string;
  picName: string;
  mobileFirst: string;
  mobileSecond: string;
  mobileThird: string;
  ownerUsers: UserInfo[];
  picUsers: UserInfo[];
  // taxRate: number;
  ownerData: UserInfo;
  picData: UserInfo;
  id: string;
  url1: SafeUrl ;
  url2: SafeUrl;
  url3 : SafeUrl;
  url4 : SafeUrl;
  url5 : SafeUrl;
  url6 : SafeUrl;
  url7 : SafeUrl;
  url8: SafeUrl;
  property: Property = {
    id: null,
    companyId: { companyName: null },
    propertyType: null,
    status: null,
    propertyName: "",
    propertyKana: "",
    floor: "",
    room: "",

    ownerName: "",
    ownerKana:"",
    owner: null,
    
    picName: "",


    mobileFirst: "",
    mobileSecond: "",
    mobileThird: "",
    pic: null,
   
    postalFirst: "",
    postalLast: "",
    address: "",
    line1: "",
    station1: "",
    line2: "",
    station2: "",
    busStop1: "",
    busStop2: "",
    ride1: "",
    stroll1: "",
    ride2: "",
    stroll2: "",
   
   taxRate:null,
    rentTsubo: null,
    totalRent: null,
    rentTax: null,
    serviceFeesTsubo: null,
    serviceFeesTotal: null,
    serviceFeesTax: null,
    parkingFees: null,
    parkingFeesTax: null,
    repairExpenses: null,
    repairTax: null,
    deposit: null,
    depositTax: null,
    keyMoney: null,
    keyMoneyTax: null,
    toalDeposit: null,
    toalDepositTax: null,
    restorationFees: null,
    restorationFeesTax: null,
    restorationStatus: false,
    fireInsuranceFees: null,
    fireInsuranceFeesTax:null,
    insuranceYears: null,
    renewalFees: null,
    renewalFeesTax: null,
    signboardFees: null,
    signboardFeesTax: null,
    consumptionTax: null,


    ground: "",
    underground: "",
    elevator: false,
    structure: null,
    buildingDate: "",
    newBuild: false,
    buildNo: "",

    exclusiveArea: "",
    exclusiveStatus: null,
    layout: "",
    layoutStatus: null,
    totalUnits: "",
    layoutRemarks: "",

    classification: null,
    areaMeter: null,
    areaTsubo: null,
    
    waterSupply:null,
    gas: null,
    electricity: null,
    drainage: null,
    pets: null,
    diy: null,

    bathToilet: false,
    lightning: false,
    doorPhone: false,
    shower: false,
    furniture: false,
    twoFamily: false,
    publicBath: false,
    indoorBath: false,
    loft: false,
    internet: false,
    catv: false,
    flooring: false,
    allElectric: false,
    csAntenna: false,
    aircon: false,
    counterKitchen: false,
    bsAntenna: false,
    parking: false,
    systemKitchen: false,
    autoLock: false,
    deliveryBox: false,
    homeTel: false,
    balcony: false,
    rosette: false,

    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    image6: null,
    image7: null,
    image8: null,

    managerName: "",
    manageCompany: "",
    managementForm: null,

    constructCompany: "",
  }
  deleteStatus: boolean;


  constructor(private propertyService: PropertyService, private sanitizer: DomSanitizer,
    private route: ActivatedRoute, private router: Router,
    private dialog: MatDialog,private snackBar:MatSnackBar) { 
    
    }

 
  ngOnInit(): void 
  {
    this.getPropertyById();
  }

  getPropertyById() 
  {
    this.id = this.route.snapshot.params['id'];
    this.propertyService.getPropertyById(this.id).subscribe(
      (data: any) => {
        this.property.id = data.id;
        this.property.propertyType = data.propertyType;
        this.property.status = data.status;
        this.property.propertyName = data.propertyName;
        this.property.propertyKana = data.propertyKana;
        this.property.floor = data.floor;
        this.property.room = data.room;
        
        this.property.owner = data.owner;

        this.property.ownerName = data.ownerName;
        this.property.ownerKana = data.ownerKana;

        this.property.pic = data.pic;
        this.property.picName = data.picName;
        this.property.mobileFirst = data.mobileFirst;
        console.log(this.property.mobileFirst);
        
        this.property.mobileSecond = data.mobileSecond;
        this.property.mobileThird = data.mobileThird;

        this.ownerId = this.property.owner?.id;
        this.ownerName = this.property.ownerName;
        this.picId = this.property.pic?.id;
        this.picName = this.property.picName;
        // this.ownerName = this.property.owner?.managerfirstName + " " + this.property.owner?.managerlastName;
//address
        this.property.postalFirst = data.postalFirst;
        this.property.postalLast = data.postalLast;
        this.property.address = data.address;
        this.property.line1 = data.line1;
        this.property.station1 = data.station1;
        this.property.line2 = data.line2;
        this.property.station2 = data.station2;
        this.property.busStop1 = data.busStop1;
        this.property.busStop2 = data.busStop2;
        this.property.ride1 = data.ride1;
        this.property.stroll1 = data.stroll1;
        this.property.ride2 = data.ride2;
        this.property.stroll2 = data.stroll2;
//monatary
        this.property.taxRate = data.taxRate;
        this.property.rentTsubo = data.rentTsubo;
        this.property.totalRent = data.totalRent;
        this.property.rentTax = data.rentTax;
        this.property.serviceFeesTsubo = data.serviceFeesTsubo;
        this.property.serviceFeesTotal = data.serviceFeesTotal;
        this.property.serviceFeesTax = data.serviceFeesTax;
        this.property.parkingFees = data.parkingFees;
        this.property.parkingFeesTax = data.parkingFeesTax;
        this.property.repairExpenses = data.repairExpenses;
        this.property.repairTax = data.repairTax;
        this.property.deposit = data.deposit;
        this.property.depositTax = data.depositTax;
        this.property.keyMoney = data.keyMoney;
        this.property.keyMoneyTax = data.keyMoneyTax;
        this.property.toalDeposit = data.toalDeposit;
        this.property.toalDepositTax = data.toalDepositTax;
        this.property.restorationFees = data.restorationFees;
        this.property.restorationFeesTax = data.restorationFeesTax;
        this.property.restorationStatus = data.restorationStatus;
        this.property.fireInsuranceFees = data.fireInsuranceFees;
        this.property.fireInsuranceFeesTax = data.fireInsuranceFeesTax;
        this.property.insuranceYears = data.insuranceYears;
        this.property.renewalFees = data.renewalFees;
        this.property.renewalFeesTax = data.renewalFeesTax;
        this.property.signboardFees = data.signboardFees;
        this.property.signboardFeesTax = data.signboardFeesTax;
        this.property.consumptionTax = data.consumptionTax;

//detail
        this.property.ground = data.ground;
        this.property.underground = data.underground;
        this.property.elevator = data.elevator;
        this.property.structure = data.structure;
        this.property.buildingDate = data.buildingDate;
        this.property.newBuild = data.newBuild;
        this.property.buildNo = data.buildNo;
        this.property.exclusiveArea = data.exclusiveArea;
        this.property.exclusiveStatus = data.exclusiveStatus;
        this.property.layout = data.layout;
        this.property.layoutStatus = data.layoutStatus;
        this.property.totalUnits = data.totalUnits;
        this.property.layoutRemarks = data.layoutRemarks;
        this.property.classification = data.classification;
        this.property.areaMeter = data.areaMeter;
        this.property.areaTsubo = data.areaTsubo;
//supply
        this.property.waterSupply = data.waterSupply;
        this.property.gas = data.gas;
        this.property.electricity = data.electricity;
        this.property.drainage = data.drainage;
        this.property.pets = data.pets;
        this.property.diy = data.diy;
        //
        this.property.bathToilet = data.bathToilet;
        this.property.lightning = data.lightning;
        this.property.doorPhone = data.doorPhone;
        this.property.shower = data.shower;
        this.property.furniture = data.furniture;
        this.property.twoFamily = data.twoFamily;
        this.property.publicBath = data.publicBath;
        this.property.indoorBath = data.indoorBath;
        this.property.loft = data.loft;
        this.property.internet = data.internet;
        this.property.catv = data.catv;
        this.property.flooring = data.flooring;
        this.property.allElectric = data.allElectric;
        this.property.csAntenna = data.csAntenna;
        this.property.aircon = data.aircon;
        this.property.counterKitchen = data.counterKitchen;
        this.property.bsAntenna = data.bsAntenna;
        this.property.parking = data.parking;
        this.property.systemKitchen = data.systemKitchen;
        this.property.autoLock = data.autoLock;
        this.property.deliveryBox = data.deliveryBox;
        this.property.homeTel = data.homeTel;
        this.property.balcony = data.balcony;
        this.property.rosette = data.rosette;

//image
this.property.image1 = this.createImages(data.propertyImage.image1, data.propertyImage.name1);
this.property.image2 = this.createImages(data.propertyImage.image2, data.propertyImage.name2);
this.property.image3 = this.createImages(data.propertyImage.image3, data.propertyImage.name3);

this.property.image4 = this.createImages(data.propertyImage.image4, data.propertyImage.name4);

this.property.image5 = this.createImages(data.propertyImage.image5, data.propertyImage.name5);
this.property.image6 = this.createImages(data.propertyImage.image6, data.propertyImage.name6);
this.property.image7 = this.createImages(data.propertyImage.image7, data.propertyImage.name7);
this.property.image8 = this.createImages(data.propertyImage.image8, data.propertyImage.name8);

        this.url1 = this.property.image1.url;
        this.url2 = this.property.image2.url;
        this.url3= this.property.image3.url;

        this.url4 = this.property.image4.url;

        this.url5 = this.property.image5.url;

        this.url6 = this.property.image6.url;

        this.url7 = this.property.image7.url;

        this.url8 = this.property.image8.url;

//management
        this.property.managerName = data.managerName;
        this.property.manageCompany = data.manageCompany;
        this.property.managementForm = data.managementForm;
        this.property.constructCompany = data.constructCompany;

        
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }  
   public createImages(image,name):FileHandle  {
    console.log('Inside createImages()');
  
      console.log('Processing image:', image);
  
      const image1Blob = this.dataURItoBlob(image);
      console.log('Image1 blob:', image1Blob);
  
      const image1File = new File([image1Blob], name);

    
    const image1FileHandle: FileHandle = {
      file: image1File,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(image1File))
    }
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
    this.router.navigate(['/property-update',id]);
  }
  navigateToPreivousPage() {
    window.history.back();
  }
  confirmDelete(id: string, name: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        message: `  選択された物件名：「${name}」の内容を削除します`,
},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.propertyService.deleteProperty(id).subscribe(
          () => {
            this.router.navigate(['/property-list']);

         
            console.log('property deleted successfully.');
          },
          (error) => {
            console.error('An error occurred:', error);
              this.showForeignKeyErrorSnackbar(name);
            
          }
        );
      }
    });
  }


 
  // deleteProperty(id: number,name:string){
  //   this.propertyService.deleteProperty(id).subscribe(data => {

      
  //   },
  //     (error) => {
  //       this.showForeignKeyErrorSnackbar(name),
      
  //     this.router.navigate(['/property-list']);

  //     console.error('Error deleting property', error)
  //     console.log(error)
  //    })
  //    this.router.navigate(['/property-list']);

   

  
  // }
 
  // confirmDelete(id: number, name: string) {
  //   // const checkStatus: boolean;
  //   const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
  //     data: {

  //       message: `  選択された物件名：「${name}」の内容を削除します`,
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.deleteProperty(id,name);
  //       // if (!checkStatus) {
  //       //   const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  //       //   const verticalPosition: MatSnackBarVerticalPosition = 'top';

  //       //   this.snackBar.open(`この「${name}」を使っているところがあるので、削除することは出来ません。`, '', {
  //       //     duration: 1000,
  //       //     horizontalPosition,
  //       //     verticalPosition,
  //       //     panelClass: ['blue-snackbar']
  //       //   });
  //       // }
  //     }
     
  //   });
  // }
 
  private showForeignKeyErrorSnackbar(name: string): void {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';

    this.snackBar.open(`この物件:「${name}」を利用しているところがあるので、削除することはできません。`, '', {
      duration: 2000, // Adjust duration as needed
      horizontalPosition,
      verticalPosition,
      panelClass: ['blue-snackbar']
    });
  }



}





