import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, throwError } from "rxjs";
import { BankFormat } from 'src/app/Model/BankFormat';

@Injectable({
  providedIn: 'root'
})
export class BankFormatService {

  private url = "http://localhost:8080/";
  bankformat: BankFormat;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const storedBankFormat = localStorage.getItem('bankformat');
    if (storedBankFormat) {
      this.bankformat = JSON.parse(storedBankFormat);
      console.log(this.bankformat.bankName);
    }

  }

  // Add Bank Name - Create
  addBankFormat(bankformat: any) {
    return this.http.post<BankFormat>(`${this.url}addBankFormat`, bankformat).pipe(
      catchError((error: HttpHeaderResponse) => {
        console.error('Error: from testing', error);
        return throwError('Something Worng');
      })
    );
  }

  // Get Bank Format - Read
  getBankFormat(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'bankformatlist')
  }
  //Get Id
  // Get BankFormat by Id - Read
  getBankFormatById(id?: string): Observable<BankFormat> {
    return this.http.get<BankFormat>(`${this.url}bankformatDetail/${id}`)
  }
  // Update BankFormat - Update
  updateBankFormat(id?: string, bankformat?: any): Observable<any> {
    return this.http.put<any>(`${this.url}bankformatUpdate/${id}`, bankformat)
  }

  // Delete BankFormat - Delete
  deleteBankFormat(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}bankformatDelete/${id}`)
    
  }
  // Get BankFormat by Name - Read
  getBankFormatByName(bankName?: string): Observable<BankFormat> {
    return this.http.get<BankFormat>(`${this.url}bankformatName/${bankName}`)
  }
}
