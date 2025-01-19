import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, throwError } from "rxjs";
import { IncomeCheck } from 'src/app/Model/IncomeCheck';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class IncomeCheckService {

  private url = environment.hostUrl;
  incomeCheck: IncomeCheck;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const storedIncomeCheck = localStorage.getItem('incomeCheck');
    if (storedIncomeCheck) {
      this.incomeCheck = JSON.parse(storedIncomeCheck);     
    }
  }
  uploadCSVData(incomeCheck: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    console.log('Testing From incomeCheck Service',incomeCheck.companyId);
      return this.http.post<IncomeCheck>(`${this.url}upload`, incomeCheck, { headers }).pipe(
      catchError((error: HttpHeaderResponse)=>{
        console.error('Error: from testing',error);
        return throwError('Something Worng');
      })
    );
  }  
  
  getAllPaymentCheckByCompanyId(companyId:any):Observable<IncomeCheck[]>{
    return this.http.get<IncomeCheck[]>(`${this.url}paymentCheckByCompanyId/${companyId}`)
  }
  
  addListPaymentCheck(paymentCheck: any){
    return this.http.post<IncomeCheck>(`${this.url}addPaymentCheck`, paymentCheck).pipe(
      catchError((error: HttpHeaderResponse)=>{
        console.error('Error: from testing',error);
        return throwError('Something Worng');
      })
    );
  }

}
