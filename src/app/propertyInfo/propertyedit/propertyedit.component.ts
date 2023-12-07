import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandle } from 'src/app/Model/FileHandle';
import { Property } from 'src/app/Model/Property';
import { UserInfo } from 'src/app/Model/userInfo';
import { PropertyService } from 'src/app/Service/Property/PropertyService';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';

@Component({
  selector: 'app-propertyedit',
  templateUrl: './propertyedit.component.html',
  styleUrls: ['./propertyedit.component.css']
})
export class PropertyeditComponent {
  @ViewChild('f') myForm!: NgForm;
  image1Error: string;
  image2Error: string;
  image3Error: string;
  image4Error: string;
  image5Error: string;
  image6Error: string;
  image7Error: string;

  image8Error: string;
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

  ownerData: UserInfo;
  picData: UserInfo;
  id: string;
  url1: SafeUrl;
  url2: SafeUrl;
  url3: SafeUrl;
  url4: SafeUrl;
  url5: SafeUrl;
  url6: SafeUrl;
  url7: SafeUrl;
  url8: SafeUrl;

  property: Property = {
    id: null,
    companyId: {  companyName: null },
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
  data: any;

  ownerIdFormControl: FormControl = new FormControl('', Validators.required);

  constructor(private router: Router, private route: ActivatedRoute,
    private propertyService: PropertyService,
    private userService:UserInfoService,
    private sanitizer: DomSanitizer,
    ) {

  }
  ngOnInit(): void {
     this.getPropertyById();
     this.getUsersByOwner();
     this.getUsersbyPIC();   
  }

  getUsersbyPIC() {
    this.userService.getPICUsers().subscribe(data => {
      this.picUsers = data;
      // console.log("picusers", this.ownerUsers);
    },
      (error) => {
        console.error('Error fetching owners:', error);
      });  
    }

  getUsersByOwner() {
      // console.log("start owner ", this.ownerUsers);

      this.userService.getOwners().subscribe(data => {
        this.ownerUsers = data;
        // console.log("owners", this.ownerUsers);
      },
        (error) => {
          console.error('Error fetching owners:', error);
        });  }

  //get data by id
  getPropertyById() {
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
        this.property.ownerKana = data.ownerKana;
        this.property.ownerName = data.ownerName;

        this.property.pic = data.pic;

        this.property.picName = data.picName;
        this.property.mobileFirst = data.mobileFirst;
        this.property.mobileSecond = data.mobileSecond;
        this.property.mobileThird = data.mobileThird;
        this.mobileFirst = this.property.mobileFirst;
        this.mobileSecond = this.property.mobileSecond;
        this.mobileThird = this.property.mobileThird;

        this.ownerId = this.property.owner?.id;
        this.ownerName = this.property.ownerName;
        this.picId = this.property.pic?.id;
        this.picName = this.property.picName;
        console.log(data.owner);
        console.log("Id",data.owner.id);
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
        this.property.renewalFeesTax = data.restorationFeesTax;
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
        this.url3 = this.property.image3.url;

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

  //convert to filehandle
  public createImages(image, name): FileHandle {
    // console.log('Inside createImages()');

    // console.log('Processing image:', image);

    const image1Blob = this.dataURItoBlob(image);
    // console.log('Image1 blob:', image1Blob);

    const image1File = new File([image1Blob], name);


    const image1FileHandle: FileHandle = {
      file: image1File,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(image1File))
    }
    return image1FileHandle;



  }

  //convert image to blob
  public dataURItoBlob(image) {
    const byteString = window.atob(image);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array]);
    return blob;
  }

  onPICSelectionChange() {
    this.userService.getUserById(this.picId).
      subscribe((data: UserInfo) => {
        this.mobileFirst = data.phone1.toString();
        this.mobileSecond = data.phone2.toString();
        this.mobileThird = data.phone3.toString();
        console.log(this.mobileFirst, this.mobileSecond, this.mobileThird);

      });


  }
  //image upload
  onSelectFile(event: any, imageNumber: number) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileHandle: FileHandle = {
        file,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file)),
      };
      console.log(file.size);
      if (file.size > 1 * 1024 * 1024) {
        if (imageNumber === 1) {
          this.image1Error='1MB以下のイメージを選択してください。';
          this.property.image1 = null;
          
          this.url1 = null;
        } else if (imageNumber === 2) {
          this.image2Error='1MB以下のイメージを選択してください。';

          this.property.image2 = null;
          this.url2 = null;
        }
        else if (imageNumber === 3) {
          this.image3Error='1MB以下のイメージを選択してください。';

          this.property.image3 = null;
          this.url3 = null;
        }
        else if (imageNumber === 4) {
          this.image4Error='1MB以下のイメージを選択してください。';

          this.property.image4 = null;
          this.url4 = null;
        }
        else if (imageNumber === 5) {
          this.image5Error='1MB以下のイメージを選択してください。';

          this.property.image5 = null;
          this.url5 = null;
        }
        else if (imageNumber === 6) {
          this.image6Error='1MB以下のイメージを選択してください。';

          this.property.image6 = null;
          this.url6 = null;
        }
        else if (imageNumber === 7) {
          this.image7Error='1MB以下のイメージを選択してください。';

          this.property.image7 = null;
          this.url7 = null;
        }
        else {
          this.image8Error='1MB以下のイメージを選択してください。';

          this.property.image8 = null;
          this.url8 = null;
        }
      }
      else {
        if (imageNumber === 1) {
          this.image1Error = '';
          this.property.image1 = fileHandle;
          
          this.url1 = fileHandle.url;
        }
        else if (imageNumber === 2) {
          this.image2Error = '';

          this.property.image2 = fileHandle;
          this.url2 = fileHandle.url;
        }
        else if (imageNumber === 3) {
          this.image3Error = '';

          this.property.image3 = fileHandle;
          this.url3 = fileHandle.url;
        }
        else if (imageNumber === 4) {
          this.image4Error = '';

          this.property.image4 = fileHandle;
          this.url4 = fileHandle.url;
        }
        else if (imageNumber === 5) {
          this.image5Error = '';

          this.property.image5 = fileHandle;
          this.url5 = fileHandle.url;
        }
        else if (imageNumber === 6) {
          this.image6Error = '';

          this.property.image6 = fileHandle;
          this.url6 = fileHandle.url;
        }
        else if (imageNumber === 7) {
          this.image7Error = '';

          this.property.image7 = fileHandle;
          this.url7 = fileHandle.url;
        }
        else {
          this.image8Error = '';

          this.property.image8 = fileHandle;
          this.url8 = fileHandle.url;
        }
      }
      
    }
  
  }

  //on submit for update form

  onSubmit(propertyForm: NgForm) {


  if (propertyForm.invalid) {
      // If the form is invalid, mark all form controls as touched
      Object.keys(propertyForm.controls).forEach((key) => {
        propertyForm.controls[key].markAsTouched();
      });
      console.log("Form Errors");
      return;
    }
    this.userService.getUserById(this.ownerId).subscribe
      ((selectedOwnerData: UserInfo) => {
        this.ownerName = selectedOwnerData.firstName + " "+ selectedOwnerData.lastName;
        this.ownerKana = selectedOwnerData.firstName +" "+ selectedOwnerData.lastName;
        this.ownerData = selectedOwnerData;
        // console.log(this.ownerData);

        this.userService.getUserById(this.picId).subscribe
          ((selectedPICData: UserInfo) => {
            this.picName = selectedPICData.firstName +" "+
              selectedPICData.lastName;

            const mobileFirst = selectedPICData.phone1;
            const mobileSecond = selectedPICData.phone2;
            const mobileThird = selectedPICData.phone3;

            this.picData = selectedPICData;

            this.property.owner = this.ownerData;
            this.property.ownerName = this.ownerName;
            this.property.ownerKana = this.ownerKana;
            this.property.pic = this.picData;
            this.property.picName = this.picName;
            this.property.mobileFirst = this.mobileFirst;
            this.property.mobileSecond = this.mobileSecond;
            this.property.mobileThird = this.mobileThird;

            console.log(this.property.mobileFirst);
            console.log(this.property.owner);
            const formData = this.prepareFormDataForProduct(this.property);
            this.propertyService.updateProperty(this.id,formData).subscribe(
              (response: Property) => {
                console.log(response);

              },
              (error: HttpErrorResponse) => {
                console.log(error);
              }
            );
            window.history.back();
            setTimeout(()=>{
              window.location.reload();
            }, 100);


          } ,
                  (selectedPICData: HttpErrorResponse) => {
                    console.log(selectedPICData);
                  }
                );
              },
              (selectedOwnerDataError: HttpErrorResponse) => {
                console.log(selectedOwnerDataError);
              }
            );
  }

  onCancel() {
    this.myForm.resetForm();
    window.history.back();

  }

//preparation for form data to send backend

prepareFormDataForProduct(property: Property): FormData {
  const uploadImageData = new FormData();

  uploadImageData.append(
    "property",
    new Blob([JSON.stringify(property)], { type: "application/json" })
  );

  if (this.property.image1 && this.property.image1.file) {

    uploadImageData.append("image1",
      this.property.image1.file,
      this.property.image1.file.name,
    );
  }
  else if (!this.property.image1 || !this.property.image1.file) {
    uploadImageData.append("image1", new Blob(), null);
  }
  if (this.property.image2 && this.property.image2.file) {

    uploadImageData.append("image2", this.property.image2.file,
      this.property.image2.file.name);
  }
  else if (!this.property.image2 || !this.property.image2.file) {
    uploadImageData.append("image2", new Blob(), null);
  }
  if (this.property.image3 && this.property.image3.file) {

    uploadImageData.append("image3", this.property.image3.file,
      this.property.image3.file.name);
  }
  else if (!this.property.image3 || !this.property.image3.file) {
    uploadImageData.append("image3", new Blob(), null);
  }
  if (this.property.image4 && this.property.image4.file) {

    uploadImageData.append("image4", this.property.image4.file,
      this.property.image4.file.name);
  }
  else if (!this.property.image4 || !this.property.image4.file) {
    uploadImageData.append("image4", new Blob(), null);
  }
  if (this.property.image5 && this.property.image5.file) {

    uploadImageData.append("image5", this.property.image5.file,
      this.property.image5.file.name);
  }
  else if (!this.property.image5 || !this.property.image5.file) {
    uploadImageData.append("image5", new Blob(), null);
  }
  if (this.property.image6 && this.property.image6.file) {

    uploadImageData.append("image6", this.property.image6.file,
      this.property.image6.file.name);
  }
  else if (!this.property.image6 || !this.property.image6.file) {
    uploadImageData.append("image6", new Blob(), null);
  }
  if (this.property.image7 && this.property.image7.file) {

    uploadImageData.append("image7", this.property.image7.file,
      this.property.image7.file.name);
  }
  else if (!this.property.image7 || !this.property.image7.file) {
    uploadImageData.append("image7", new Blob(), null);
  }
  if (this.property.image8 && this.property.image8.file) {

    uploadImageData.append("image8", this.property.image8.file,
      this.property.image8.file.name);
  }
  else if (!this.property.image8 || !this.property.image8.file) {
    uploadImageData.append("image8", new Blob(), null);
  }

    return uploadImageData;

}

//check alpha
  keyPressAlpha(event: KeyboardEvent) {
    const inp = String.fromCharCode(event.keyCode);

    if (/[a-zA]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }

  }

  //check number
  keyPressNumeric(event: KeyboardEvent) {
    const inp = String.fromCharCode(event.keyCode);

    if (/[0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
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

  navigateToPreivousPage() {
    window.history.back();
  }
}
