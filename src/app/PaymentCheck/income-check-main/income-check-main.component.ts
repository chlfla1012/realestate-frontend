import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FileHandle } from 'src/app/Model/FileHandle';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CompanyName } from 'src/app/Model/CompanyName';
import { IncomeCheck } from 'src/app/Model/IncomeCheck';
import { BankFormat } from 'src/app/Model/BankFormat';
import { BankFormatService } from 'src/app/Service/BankFormat/bankFormat.service';
import { UserAuthService } from 'src/app/Service/UserInfo/user-auth.service';
import { IncomeCheckService } from 'src/app/Service/IncomeCheck/incomeCheck.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as dayjs from 'dayjs';
import 'dayjs/locale/ja';
import * as Papa from 'papaparse';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-income-check-main',
  templateUrl: './income-check-main.component.html',
  styleUrls: ['./income-check-main.component.css']
})
export class IncomeCheckMainComponent {
  csvData: any[];
  accountName: string;
  companyId: number;
  logoId: number;
  bankName: string;
  plannedAmount: string;
  backendCompany: CompanyName = {
    companyName: null
  };
  backendLogo: FileHandle = {
    file: null,
    url: null
  };
  logoImage: SafeUrl;
  incomes: IncomeCheck =
    {
      id: null,
      propertyName: null,
      room: null,
      ownerName: null,
      tenantName: null,
      accountName: null,
      month: null,
      expectedAmount: null,
      income: null,
      status: null,
      remark: null,
      contractId: null,
      companyId: { companyName: null },
      logo: null,
      createdDate: null,
      modifiedDate: null,
      contractType: null
    }
  bankformat: BankFormat = {
    id: null,
    bankName: null,
    date: null,
    content: null,
    income: null,
    remark: null,
    createdDate: null,
    modifiedDate: null
  }

  // csvData: MatTableDataSource<any> = new MatTableDataSource([]);
  file: File;

  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['month', 'accountName', 'income'];

  constructor(private router: Router,
    private userAuthService: UserAuthService,
    private incomeCheckService: IncomeCheckService,
    private bankFormatService: BankFormatService,
    private route: ActivatedRoute,private dialog: MatDialog
  ) {
    this.route.params.subscribe(params => {
      this.route.params.subscribe(params => {
        if (params['bankName']) {
          const bankName = params['bankName'];
          this.bankName = bankName;
          console.log('Selected Bank Name:', this.bankName);
        }
      });
    });
  }


  ngOnInit(): void {
    this.getCurrentUserInfo();
    this.getBankFormatByName();
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

  getBankFormatByName() {
    this.bankFormatService.getBankFormatByName(this.bankName).subscribe(data => {
      this.bankformat = data;
      console.log(this.bankformat.id);
    })
  }
  onFileSelected(event: any): void {
    this.file = event.target.files[0];
    this.parseCSV();
  }

  parseCSV(): void {
    Papa.parse(this.file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const csvColumnNames = result.meta.fields; // Extract column names from the CSV

        const content = this.bankformat.content;
        const date = this.bankformat.date;
        const income = this.bankformat.income;
        const bankName = this.bankformat.bankName;

        const EXPECTED_DB_COLUMNS = [content, date, income];

        console.log("this is db column" + EXPECTED_DB_COLUMNS);

        // Compare CSV column names with expected database column names
        const columnsExist = this.checkColumnsExist(EXPECTED_DB_COLUMNS, csvColumnNames);
        if (columnsExist) {
          // Continue processing the CSV data
          // Parse CSV data and extract specific fields
          const csvData = result.data.map((row) => {

            // const convertToDate = (dateStr) => {
            //   // Add more formats if needed
            //   const formats = ["YYYY.MM.DD", "H.MM.SS", "YYYY年M月D日", "M/D/YYYY", "YYYYMMDD"];

            //   for (const format of formats) {
            //     const parsedDate = dayjs(dateStr, { format });
            //     if (parsedDate.isValid()) {
            //       // Standardize the date format to "YYYY-MM-DD"
            //       return parsedDate.format("YYYY-MM-DD");
            //     }
            //   }

            //   // Return the original date string if no format matches
            //   return dateStr;
            // };

            // // Standardize the date format for the current row
            // const standardizedDate = convertToDate(row[date]);
            const dateParts = row[date].split('.');

            // Check for specific date formats and convert to "YYYY-13-10"
            let formattedDate;

            if (row[date].match(/\d{1,4}\/\d{1,2}\/\d{1,2}/)) {
              // Format like "2022/1/4"
              const match = row[date].match(/(\d{1,4})\/(\d{1,2})\/(\d{1,2})/);
              formattedDate = `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
            } else if (row[date].match(/H(\d{1,2})\.(\d{1,2})\.(\d{1,2})/)) {
              // Format like "H29.6.15"
              const match = row[date].match(/H(\d{1,2})\.(\d{1,2})\.(\d{1,2})/);
              const eraYear = parseInt(match[1]) + 1988; // Assuming the era "H" started in 1988
              formattedDate = `${eraYear}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
            } else if (dateParts.length === 3) {
              // Format like "2022.14.10"
              const dayPart = dateParts[2].match(/\d+/); // Extract the numeric part from the day
              formattedDate = `${dateParts[0]}-${dateParts[1].padStart(2, '0')}-${dayPart[0].padStart(2, '0')}`;
            }
            // else if (row[date].match(/(\d{1,4})年(\d{1,2})月(\d{1,2})日/)) {
            //   // Format like "２０２０年8月4日"
            //   const match = row[date].match(/(\d{1,4})年(\d{1,2})月(\d{1,2})日/);
            //   formattedDate = `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
            // } 
            else if (row[date].match(/(\d{1,4})年(\d{1,2})月(\d{1,2})日分/)) {
              // Format like "2022年1月17日分"
              const match = row[date].match(/(\d{1,4})年(\d{1,2})月(\d{1,2})日分/);
              formattedDate = `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
            }
            else if (row[date].match(/(\d{1,4})年(\d{1,2})月(\d{1,2})日/)) {
              // Format like "２０２０年8月4日" or "２０２０年8月4日(２０２０年8月4日)"
              const match = row[date].match(/(\d{1,4})年(\d{1,2})月(\d{1,2})日(?:\((\d{1,4})年(\d{1,2})月(\d{1,2})日\))?/);
              formattedDate = `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
              if (match[4] && match[5] && match[6]) {
                // If the part in parentheses exists, use that information
                formattedDate = `${match[4]}-${match[5].padStart(2, '0')}-${match[6].padStart(2, '0')}`;
              }
            }
            else if (row[date].match(/\d{8}/)) {
              // Format like "20150310"
              formattedDate = dayjs(row[date], { format: 'YYYYMMDD' }).format('YYYY-13-DD');
            } else {
              // For other cases, retain the original date
              formattedDate = row[date];
            }

            // Remove non-numeric characters from the income field
            const numericIncome = parseFloat(row[income].replace(/[^0-9.-]/g, ''));
            if (bankName === 'あおぞら銀行') {
              if (row.取引区分 === '振込') {
                return {
                  month: formattedDate,
                  accountName: row[content],
                  income: numericIncome,
                };
              }
            } else if (numericIncome > 0) {
              return {
                month: formattedDate,
                accountName: row[content],
                income: numericIncome,
              };
            } return null; // Return null for rows with negative or zero income
          }).filter((row) => row !== null);// Filter out null values from the map
          this.csvData = csvData;
        } else {          
          // Show an error or handle the mismatch
          //this.openErrorDialog('選択したcsvファイルに誤りがあります。正しい銀行名または正しいcsvファイルを選択してください。');
          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            data: {
              message: '選択したcsvファイルに誤りがあります。正しい銀行名または正しいcsvファイルを選択してください。',
            },
          });
        }
      },
    });
  }
  
  checkColumnsExist(expectedColumns: string[], actualColumns: string[]): boolean {
    // Check if all expected columns exist in the actual columns
    return expectedColumns.every(column => actualColumns.includes(column));
  }
  onSubmit(PaymentCheckForm: NgForm) {
    if (PaymentCheckForm.invalid) {
      Object.keys(PaymentCheckForm.controls).forEach((key) => {
        PaymentCheckForm.controls[key].markAsTouched();
      });
      return;
    }
    console.log("This is Testing from submit" + this.csvData);
    const formData = new FormData();
    // Add csvData to formData as a JSON file
    const csvDataBlob = new Blob([JSON.stringify(this.csvData)], { type: 'application/json' });
    formData.append('csvData', csvDataBlob, 'csvData.json');

    if (this.userAuthService.isCompanyNameFromBackend) {
      this.incomes.companyId = { companyName: this.backendCompany.companyName };
      this.incomes.companyId = { companyName: this.backendCompany.companyName };
    }
    if (this.userAuthService.isLogoFromBackend) {
      // If the logo is from the backend, set the logo ID accordingly
      this.incomes.logo = { file: this.backendLogo.file, url: this.backendLogo.url };
    }
    console.log("This is Testing for CSV Data Save" + this.csvData);
    formData.append("paymentCheck", new Blob([JSON.stringify(this.incomes)], { type: 'application/json' }));
    formData.append("logoId", this.logoId.toString());
    formData.append("companyId", this.companyId.toString());

    this.incomeCheckService.uploadCSVData(formData).subscribe(
      (response) => {
        console.log('Data sent successfully to the backend');
      },
      (error) => {
        console.error('Error sending data to the backend', error);
      }
    );
    this.router.navigate(['/income-list']);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  back() {
    window.history.back();
  }
}
