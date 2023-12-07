
import { IncomeCheck } from 'src/app/Model/IncomeCheck';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IncomeCheckService } from 'src/app/Service/IncomeCheck/incomeCheck.service';
import { FileHandle } from 'src/app/Model/FileHandle';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CompanyName } from 'src/app/Model/CompanyName';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent implements OnInit {
  selectedOption: string;
  file: File;
  companyId: number;
  companyName: string;
  dataSource: MatTableDataSource<any>;
  searchByMonth: Date;
  searchByStatus: string[] = [];
  searchPropertyName: string;
  propertyName: string;
  month: string;
  incomecheck: any;
  status: string;
  filteredData: IncomeCheck[] = [];
  displayedColumns: string[] = ['ownerName', 'tenantName', 'propertyName', 'room', 'month', 'expectedAmount', 'income', 'status', 'customColumn1', 'remark'];
  columnFlex = {
    ownerName: '2', // First column takes 2/3 of the available space
    tenantName: '2',
    propertyName: '1',
    room: '1',
    month: '1',
    expectedAmount: '2',
    income: '2',
    status: '1',
    manualCheck: '1',
    remark: '2'
  };
  savedData: string; // Initialize it with an initial value
  logoId: number;
  plannedAmount: string;
  backendCompany: CompanyName = {
    companyName: null
  };
  backendLogo: FileHandle = {
    file: null,
    url: null
  };
  logoImage: SafeUrl;
  
  incomes: IncomeCheck[] = []; // Initialize as an empty array
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private service: IncomeCheckService,
    private userAuthService: UserAuthService,
    private datepipe: DatePipe,
    private router: Router, private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<any>([]); // Initialize the dataSource with an empty array or your data
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getCurrentCompanyId();
    this.getAllPaymentCheckByCompanyId();
    this.getCurrentUserInfo();
  }


  getCurrentUserInfo() {
    this.userAuthService.getCompanyId().subscribe(companyId => {
      this.companyId = companyId;
    });

    this.userAuthService.getCompanyName().subscribe(backendCompany => {
      this.backendCompany = backendCompany;
    });
    this.userAuthService.getLogoId().subscribe(logoId => {
      this.logoId = logoId;
    });

    this.userAuthService.getLogo().subscribe(backendLogo => {
      this.backendLogo = backendLogo;
    });
    console.log("Get Login data", this.companyId, this.logoId);
  }
  url: String;

  getCurrentCompanyId() {
    this.userAuthService.getCompanyId().subscribe(companyId => {
      this.companyId = companyId;

    });
  }

  getAllPaymentCheckByCompanyId() {

    this.service.getAllPaymentCheckByCompanyId(this.companyId).subscribe(data => {
      this.incomecheck = data;
      // Initialize the isChecked property for each row
      this.incomecheck.forEach(row => {
        row.isChecked = false; // Set it to true or false based on your requirements
      });
      console.log("Company id", this.companyId);
      this.formatDateStrings();
      this.dataSource = new MatTableDataSource<any>(this.incomecheck);
      console.log("Data" + this.incomecheck);
      console.log("Data" + this.dataSource);
      // Set the paginator for the MatTableDataSource
      this.dataSource.paginator = this.paginator;
    });
  }

  search() {
    // Convert the filter values to lowercase for case-insensitive search
    const filterValuePropertyName = this.propertyName ? this.propertyName.trim().toLowerCase() : null;
    const filterValueMonth = this.month ? this.datepipe.transform(this.month, 'yyyy-MM-dd') : null;
    const filterValueStatus = this.status ? this.status : null;

    // Filter the data based on the search criteria
    this.dataSource.filterPredicate = (data: any, filter: string) => {     
      const incomecheck = data as IncomeCheck;
      // Check if the property name, month, and status match the search criteria
      const isPropertyNameMatch = !filterValuePropertyName || incomecheck.propertyName.toLowerCase().includes(filterValuePropertyName);
      const isMonthMatch = !filterValueMonth || incomecheck.month === filterValueMonth;
      const isStatusMatch = !filterValueStatus || incomecheck.status === filterValueStatus;
      // Return true if all conditions match, otherwise false
      return isPropertyNameMatch && isMonthMatch && isStatusMatch;
    };

    // Apply the filter to the data source
    this.dataSource.filter = 'customFilter';
  }

  // Clear the filter by setting it to null
  reset() {
    this.propertyName = '';
    this.month = null;
    this.status = '';
    this.dataSource.filter = null;
  }

  toFileUploadPage(bankName: string) {
    this.router.navigate(['/income-check', bankName]);
  }

  onSubmit(paymentCheckForm: NgForm) {
    if (paymentCheckForm.invalid) {
      Object.keys(paymentCheckForm.controls).forEach((key) => {
        paymentCheckForm.controls[key].markAsTouched();
      });
      console.log("Form Errors");
      return;
    }

    const checkedRows = this.dataSource.data.filter(item => item.isChecked);
    const formData = new FormData();

    // Collect the "Remark" values from the checked rows
    const selectedRemarkValues = checkedRows
      .map((item) => item.remark)
      .join(', ');

    if (this.userAuthService.isCompanyNameFromBackend) {
      this.incomes = checkedRows.map(item => {
        const updatedStatus = item.isChecked ? "OK" : item.status;
        return {
          id: item.id,
          ownerName: item.ownerName,
          tenantName: item.tenantName,
          accountName: item.accountName,
          propertyName: item.propertyName,
          room: item.room,
          month: item.month,
          expectedAmount: item.expectedAmount,
          income: item.income,
          status: updatedStatus,
          remark: item.remark,
          contractType: item.contractType,
          contractId: item.contractId,
          companyId: { companyName: this.backendCompany.companyName },
          logo: this.userAuthService.isLogoFromBackend
            ? { file: this.backendLogo.file, url: this.backendLogo.url }
            : null,
          createdDate: null,
          modifiedDate: null
        };
      });
    } else {
      this.incomes = checkedRows.map(item => {
        const updatedStatus = item.isChecked ? "OK" : item.status;
        return {
          id: item.id,
          ownerName: item.ownerName,
          tenantName: item.tenantName,
          accountName: item.accountName,
          propertyName: item.propertyName,
          room: item.room,
          month: item.month,
          expectedAmount: item.expectedAmount,
          income: item.income,
          status: updatedStatus,
          remark: item.remark,
          contractType: item.contractType,
          contractId: item.contractId,
          companyId: { companyName: this.backendCompany.companyName },
          logo: null, // You can set this to null or provide an appropriate value
          createdDate: null, // Provide a suitable value or keep it as null
          modifiedDate: null // Provide a suitable value or keep it as null
        };
      });
    }
    console.log('income', this.incomes);

    // Convert the selected data array to JSON
    const selectedDataJson = JSON.stringify(this.incomes);
    formData.append("paymentCheck", new Blob([selectedDataJson], { type: "application/json" }));
    formData.append("logoId", this.logoId.toString());
    formData.append("companyId", this.companyId.toString());

    this.service.addListPaymentCheck(formData).subscribe(
      (response) => {
        console.log('PaymentCheck Data Added successfully', response);                
      },
      (error) => {
        console.error('Error saving customer', error);
      }
    );    
  }

  formatDateStrings() {
    this.incomecheck.forEach((incomecheck: IncomeCheck) => {
      if (incomecheck.month !== null) {
        const originalDate = new Date(incomecheck.month);
        const month1 = this.datepipe.transform(incomecheck.month, 'yyyy-MM-dd');
        incomecheck.month = month1 ?? incomecheck.month;

      }
    });
  }



}
