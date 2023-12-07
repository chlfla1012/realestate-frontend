import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Contract } from 'src/app/Model/Contract';
import { Property } from 'src/app/Model/Property';
import { UserInfo } from 'src/app/Model/userInfo';
import { ContractService } from 'src/app/Service/Contract/ContractService';
import { PropertyService } from 'src/app/Service/Property/PropertyService';
import { UserInfoService } from 'src/app/Service/UserInfo/userInfoService';
import { AlertDialogComponent } from './AlertDialogComponent';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { CompanyName } from 'src/app/Model/CompanyName';
import { DatePipe } from '@angular/common';
import { LOCALE_ID, Inject } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
// import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
// import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-contract-create',
  templateUrl: './contract-create.component.html',
  styleUrls: ['./contract-create.component.css'],
  providers: [DatePipe] ,// Provide DatePipe,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ContractCreateComponent {
  showResults: boolean = false;
  companyId: number;
  backendCompany: CompanyName = {

    companyName: null
  };
  maxDate: string;  // Property to hold the max contract start date
  companyName: CompanyName;
  selectedaccounttype:string='regular';
  lendertype: string;
  borrowertype: string;
  // propertyName: string = '';
  // results: any[] = [];
  selectedProperty: any;

  propertyName: string ;
  selectedPropertyName: string;
  results: any[] = [];
  private searchTextChanged = new Subject<string>();
  containers: boolean[] = [true, false, false, false, false, false, false];

  errorMessage: string = '';
  picId:string;
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
  propertyIDs:Property[];
  picUsers:UserInfo[];
  propertyData:Property;
  picData:UserInfo;
  contract:Contract={
    companyId: { companyName: null },
    id: null,
    propertyName: null,
    roomno: null,
    ownerName: null,
    ownerKana: null,
    lenderId: {
      id:undefined,
      lenderType: 'LK',
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
    },
    borrowerId: {
      id:undefined,
      borrowerType: 'BK',
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

    },
    tenantId: {
      id:undefined,
      tenantFirstName: null,
      tenantLastName: null,
      tenantFirstKana: null,
      tenantLastKana: null,
      tenantTelFirst: null,
      tenantTelSecond: null,
      tenantTelThird: null,
      tenantFurikomisaki: null,

    },
    contractStartDate: null,
    contractEndDate: null,
    contractLength: null,
    contractMemo: null,

    classification: null,
    taxRate: null,
    rent: 0.00,
    rentTax: "税込",
    managementFee: 0.00,
    managementFeeTax: null,
    parkingFee: 0.00,
    parkingFeeTax: null,
    bicycleParkingFee: 0.00,
    bicycleParkingFeeTax: null,
    keymoney: 0.00,
    keymoneyTax: null,
    shikiken: 0.00,
    shikikenTax: null,
    deposit: 0.00,
    depositTax: null,
    renewalFee: 0.00,
    renewalFeeTax: null,
    repairCost: 0.00,
    repairCostTax: null,
    departureTime: false,
    penaltyFee: 0.00,
    penaltyFeeTax: null,
    signboardFee: 0.00,
    signboardFeeTax: null,
    brokerageFee: 0.00,
    brokerageFeeTax: null,
    totalCost: 0.00,
    bankName: null,
    branchName: null,
    accountType: null,
    accountNo: null,
    accountName: null,
    apportionment: null,
    picName: null,
    picNameKana: null,
    mobileFirst: null,
    mobileSecond: null,
    mobileThird: null,
    department: null,
    pic: undefined,
    property: undefined,
    createdDate: null,
    modifiedDate: null,
    createdName: null,
    modifiedName: null,
    tenantFullName: null,
    tenantFullNameKana: null
  }
  toggleContainer(index: number) {
    this.containers[index] = !this.containers[index];
  }

  // toggleContainer() {
  //   this.containerVisible = !this.containerVisible;
  // }
  @ViewChild('searchModal') searchModal: any; // Add this line
  filteredProperties: Property[];
  searchText: string;


  ownerKana: string;
  ownerData: UserInfo;
  ownerkana: string;
  formBuilder: any;
  contractForm: any;
  constructor(private router:Router,
    private propertyService:PropertyService,
    private userService: UserInfoService,
    private userAuthService:UserAuthService,
    private contractService:ContractService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private renderer: Renderer2,
    private el: ElementRef,
    @Inject(LOCALE_ID) private locale: string
) {
      this.picData = {
        id:null,
        firstName: "",
        lastName: "",
        firstNamekana: "",
        lastNamekana: "",
        gender:"",
        dateOfBirth:"",
        department:"",
        phone1: null,
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
        apportionment:"",
        companyId:{companyName:null},

        logo:null
      }
      this.propertyData={
      id: null,
      companyId:{companyName:null},
      propertyType: "",
      status: "",
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
      rentTax: "",
      serviceFeesTsubo: null,
      serviceFeesTotal: null,
      serviceFeesTax: "",
      parkingFees: null,
      parkingFeesTax: "",
      repairExpenses: null,
      repairTax: "",
      deposit: null,
      depositTax: "",
      keyMoney: null,
      keyMoneyTax: "",
      toalDeposit: null,
      toalDepositTax: "",
      restorationFees: null,
      restorationFeesTax: "",
      restorationStatus: false,
      fireInsuranceFees: null,
      fireInsuranceFeesTax: "",
      insuranceYears: null,
      renewalFees: null,
      renewalFeesTax: "",
      signboardFees: null,
      signboardFeesTax: "",
      consumptionTax: null,
      ground: "",
      underground: "",
      elevator: false,
      structure: "",
      buildingDate:"",
      newBuild: false,
      buildNo: "",
      exclusiveArea: "",
      exclusiveStatus: "",
      layout: "",
      layoutStatus: "",
      totalUnits: "",
      layoutRemarks: "",

      classification: "",
      areaMeter: null,
      areaTsubo: null,

      waterSupply: "",
      gas: "",
      electricity: "",
      drainage: "",
      pets: "",
      diy: "",

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
      managementForm: "",

      constructCompany: "",
      }
      this.contractForm = this.fb.group({
        // Define your form controls and validators here
        // For example:
        propertyname: ['', Validators.required],
        // other form controls...
      });

      const today = new Date();
      this.maxDate = today.toISOString().split('T')[0];// Set max date to today's date in 'yyyy-MM-dd' format
      // this.selectedPropertyName='';

   }
  updateContractEndDate() {
    if (this.contract.contractStartDate && this.contract.contractLength) {
      const startDate = new Date(this.contract.contractStartDate);
      const contractLength = parseInt(this.contract.contractLength, 10);
      startDate.setFullYear(startDate.getFullYear() + contractLength);
      startDate.setDate(startDate.getDate() - 1);

      // Format the date with the Japanese locale
      const datePipe = new DatePipe(this.locale);
      this.contract.contractEndDate = datePipe.transform(startDate, 'yyyy-MM-dd');
    } else {
      this.contract.contractEndDate = null;
    }
  }
    data: any;
    // propertyIdControl: FormControl = new FormControl('', Validators.required);
    ngOnInit() {
      // this.getCurrentCompanyName();
      this.getCurrentUserInfo();

      this.getPICUsers();
      this.getProperties();

      this.searchTextChanged.pipe(debounceTime(300)).subscribe(() => {
        this.searchByPropertyName();
      });

    }

  getCurrentUserInfo() {
    this.userAuthService.getCompanyId().subscribe(companyId => {
      this.companyId = companyId;
    });

    this.userAuthService.getCompanyName().subscribe(backendCompany => {
      this.backendCompany = backendCompany;
    });


    console.log("Get Login data", this.companyId);  }



    cancel(): void {
      console.log('Cancel function called');
      // Clear form values
      this.contractForm.reset();

      // Navigate back to "Ichiran" screen
      this.router.navigate(['/contract-list']);
    }
  getProperties() {

  this.propertyService.getPropertiesByCompanyId(this.companyId).subscribe(data => {
    this.propertyIDs = data;

},
  (error) => {
    console.error('Error fetching owners:', error);
  }
);
}



  getPICUsers() {

      this.userService.getUsersByCompanyId(this.companyId).subscribe(data => {
        this.picUsers = data;
        // console.log("picusers", this.ownerUsers);
      },
        (error) => {
          console.error('Error fetching owners:', error);
        });
    }

    onPICSelectionChange() {
      this.userService.getUserById(this.picId).subscribe(
        (data: UserInfo) => {
          this.mobileFirst = data.phone1.toString();
          this.mobileSecond = data.phone2.toString();
          this.mobileThird = data.phone3.toString();
          this.picName=data.firstName+" "+data.lastName;
          this.picNamekana = data.firstNamekana + " " + data.lastNamekana;
          this.picdepartment = data.department;
        },
        (error) => {
          console.error('Error fetching PIC data:', error);
        }
      );
    }

  onInputChanged(): void {
    this.showResults = this.propertyName.length > 0;
    this.searchTextChanged.next(this.propertyName);
  }

  onSelectChange(event: any): void {
    const selectedValue = event.target.value;
    this.propertyName = selectedValue;
}
  
//all properties data 
  searchByPropertyName(): void {
    console.log("Property Name  "+this.propertyName);
    this.contractService.findByPropertyNameContaining(this.propertyName).subscribe((data) => {
      console.log("Property Name  "+this.propertyName);
      this.results = data;
      //console.log("Show this.result data "+this.results);
    });
  }

  selectPropertyName(selectedPropertyName: string): void {
    console.log('Selected Property Name 02:', this.propertyName);
    this.propertyName = selectedPropertyName;
    // Hide the results after selecting a property
   this.showResults = false;
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

 private selectedOption: string;

  options = [
    { name: "first", value: 1 },
    { name: "two", value: 2 }
  ]

    onSubmit(contractForm: NgForm): void {
      if (contractForm.invalid) {
        this.handleFormError(contractForm);
        return;
      }

      // Fetch data based on the selected property using company ID
      this.propertyService.getPropertiesByCompanyId(this.companyId)
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

              // Update the contract object with the fetched data
              this.contract.property = selectedProperty;
              this.contract.propertyName = selectedProperty.propertyName;
              this.contract.roomno = this.roomno;
              this.contract.ownerName = this.ownername;
              this.contract.ownerKana = this.ownerKana;

              // Fetch data based on the selected PIC
              this.fetchPicData();
            } else {
              console.error('Selected property not found');
            }
          },
          (error) => {
            console.error('Error fetching Property data:', error);
          }
        );
    }

    handleFormError(contractForm: NgForm): void {
      this.openAlertDialog('必要なフィールドを入力してください。');

      // Mark all form controls as touched
      Object.values(contractForm.controls).forEach(control => control.markAsTouched());
      console.log("Form Errors");
    }

    fetchPicData(): void {
      this.userService.getUserById(this.picId).subscribe(
        (selectedPICData: UserInfo) => {
          this.handlePicData(selectedPICData);
        },
        (selectedPICDataError: HttpErrorResponse) => {
          console.log(selectedPICDataError);
        }
      );
    }

    handlePicData(selectedPICData: UserInfo): void {
      this.picName = selectedPICData.firstName + " " + selectedPICData.lastName;
      const mobileFirst = selectedPICData.phone1;
      const mobileSecond = selectedPICData.phone2;
      const mobileThird = selectedPICData.phone3;
      const picNameKana = selectedPICData.firstNamekana + " " + selectedPICData.lastNamekana;
      const department = selectedPICData.department;

      this.picData = selectedPICData;
      console.log("test", this.picData);

      // Update the contract object with the fetched data
      this.contract.companyId = { companyName: this.backendCompany.companyName };
      this.contract.pic = this.picData;
      this.contract.picName = this.picName;
      this.contract.picNameKana = this.picNamekana;
      this.contract.department = this.picdepartment;
      this.contract.mobileFirst = this.mobileFirst;
      this.contract.mobileSecond = this.mobileSecond;
      this.contract.mobileThird = this.mobileThird;

      this.submitContract();
    }

    submitContract(): void {
      const formData = new FormData();
      formData.append("contract", new Blob([JSON.stringify(this.contract)], { type: "application/json" }));
      formData.append("borrowerId", new Blob([JSON.stringify(this.contract.borrowerId)], { type: "application/json" }));
      formData.append("lenderId", new Blob([JSON.stringify(this.contract.lenderId)], { type: "application/json" }));
      formData.append("tenantId", new Blob([JSON.stringify(this.contract.tenantId)], { type: "application/json" }));
      formData.append("companyId", this.companyId.toString());
      console.log(formData);

      this.contractService.addContract(formData).subscribe(
        (response: Contract) => {
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          console.error('Error submitting contract:', error);
        }
      );
         //  this.router.navigate(['/contract-list']);
            // setTimeout(() => {
            //   window.location.reload();
            // }, 100);
    }

    openAlertDialog(message: string): void {
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        width: '350px',
        data: { message: message }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog closed');
      });
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
  navigateToPreivousPage() {
    window.history.back();
  }
}
