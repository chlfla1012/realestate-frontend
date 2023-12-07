import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CompanyName } from 'src/app/Model/CompanyName';
import { FileHandle } from 'src/app/Model/FileHandle';
import { Property } from 'src/app/Model/Property';
import { UserInfo } from 'src/app/Model/userInfo';
import { PropertyService } from 'src/app/Service/Property/PropertyService';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';

@Component({
  selector: 'app-propertycreate',
  templateUrl: './propertycreate.component.html',
  styleUrls: ['./propertycreate.component.css']
})
export class PropertycreateComponent {
  @ViewChild('ownerId', { static: true }) ownerIdSelect!: MatSelect;
  @ViewChild('f') myForm!: NgForm;
  image1Error: string;
  image2Error: string;
  image3Error: string;
  image4Error: string;
  image5Error: string;
  image6Error: string;
  image7Error: string;
  image8Error: string;

  companyId: number;
  backendCompany: CompanyName = {
    companyName: null
  };

  companyName: CompanyName;
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
    companyId: { companyName: null },
    propertyType: "マンション",
    status: "未契約",
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
    rentTax: "なし",
    serviceFeesTsubo: null,
    serviceFeesTotal: null,
    serviceFeesTax: "なし",
    parkingFees: null,
    parkingFeesTax: "なし",
    repairExpenses: null,
    repairTax: "なし",
    deposit: null,
    depositTax: "なし",
    keyMoney: null,
    keyMoneyTax: "なし",
    toalDeposit: null,
    toalDepositTax: "なし",
    restorationFees: null,
    restorationFeesTax: "なし",
    restorationStatus: false,
    fireInsuranceFees: null,
    fireInsuranceFeesTax: "なし",
    insuranceYears: null,
    renewalFees: null,
    renewalFeesTax: "なし",
    signboardFees: null,
    signboardFeesTax: "なし",
    consumptionTax: null,


    ground: "",
    underground: "",
    elevator: false,
    structure: "なし",
    buildingDate: "",
    newBuild: false,
    buildNo: "",

    exclusiveArea: "",
    exclusiveStatus: "なし",
    layout: "",
    layoutStatus: "なし",
    totalUnits: "",
    layoutRemarks: "",

    classification: "住居",
    areaMeter: null,
    areaTsubo: null,
    
    waterSupply: "指定なし",
    gas: "指定なし",
    electricity: "指定なし",
    drainage: "指定なし",
    pets: "指定なし",
    diy: "指定なし",

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
    managementForm: "指定なし",

    constructCompany: "",
  }

  maxSelectSize: number = 1048576; // 1 MB
  maxTextAreaSize: number = 2097152; // 2 MB

  constructor(private router: Router,
    private userService: UserInfoService,
    private userAuthService:UserAuthService,
    private propertyService: PropertyService,
    private sanitizer: DomSanitizer) {
    
     
    this.ownerData = {
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
    }
  }

  ownerIdFormControl: FormControl = new FormControl('', Validators.required);

  data: any;
  // Owner ID validation properties
  isOwnerIdTouched:Boolean = false; // To track the touch status

  // Getter to check if the owner ID is invalid (empty)
  get isOwnerIdInvalid(): boolean {
    return !this.ownerId; // Change this based on the ownerId data type (e.g., !this.ownerId || this.ownerId === '')
  }

  ngOnInit() {   
    // this.getCurrentCompanyName();
    this.getCurrentUserInfo();
    this.getOwners();
    this.getPICUsers();
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
 
  getPICUsers() {
    this.userService.getUsersByCompanyId(this.companyId).subscribe(data => {
      this.picUsers = data;
    },
      (error) => {
        console.error('Error fetching users:', error);
      });
  }

  getOwners() { 
     this.userService.getOwnersByCompanyId(this.companyId).subscribe(data => {
      this.ownerUsers = data;
    },
      (error) => {
        console.error('Error fetching owners:', error);
      });
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
        this.ownerKana = selectedOwnerData.firstNamekana +" "+ selectedOwnerData.lastNamekana;
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
            this.property.companyId = {companyName: this.backendCompany.companyName };
            console.log("comopany id", this.property.companyId);
            this.property.owner = this.ownerData;
            this.property.ownerName = this.ownerName;
            this.property.ownerKana = this.ownerKana;
            this.property.pic = this.picData;
            this.property.picName = this.picName;
            this.property.mobileFirst = this.mobileFirst;
            this.property.mobileSecond = this.mobileSecond;
            this.property.mobileThird = this.mobileThird;

            const formData = this.prepareFormDataForProduct(this.property);
            this.propertyService.addProperty(formData).subscribe(
              (response: Property) => {
                console.log(response);
                this.router.navigate(['/property-list']);

                
            setTimeout(() => {
              window.location.reload();
            }, 100);

               
              },
              (error: HttpErrorResponse) => {
                console.log(error);
              }
            );
            

          
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
    // Reset the form data
    this.myForm.resetForm();
    this.router.navigate(['/property-list']);
   
    // Navigate to the previous page
  }
      
    
    
    
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
    uploadImageData.append("companyId", this.companyId.toString());
    return uploadImageData;
  
  }

 
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
  
  keyPressAlpha(event: KeyboardEvent) {
    const inp = String.fromCharCode(event.keyCode);

    if (/[a-zA]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
    
  }
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





