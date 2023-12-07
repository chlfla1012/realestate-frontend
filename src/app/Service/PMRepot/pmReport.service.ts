import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from "rxjs";
import { PMReport } from "src/app/Model/PMReport";
import { UserInfo } from 'src/app/Model/userInfo';
import { Property } from 'src/app/Model/Property';
import { debounceTime } from 'rxjs/operators';
import { Income } from "src/app/Model/Income";
import { Rental } from "src/app/Model/Rental";
import { Expense } from "src/app/Model/Expense";


@Injectable({
  providedIn: 'root'
})
export class PmReportService {

  private url = "http://localhost:8080/";
  pmReport:PMReport;

  constructor(private http: HttpClient) { }

//first step: Get property name from search box
  getOwnersByPropertyName(propertyName:string):Observable<Property[]>{
    return this.http.get<Property[]>(`${this.url}ownersByPropertyName/${propertyName}`)
  }


getOwnerName(ownerName: string): Observable<UserInfo[]> {
  return this.http.get<UserInfo[]>(`${this.url}ownerInfo/${ownerName}`)
    .pipe(
      catchError(error => {
        console.error("Error in getOwnerName", error);
        throw error;
      })
    );
}
getIncomeInformation(ownerName: string): Observable<Income[]> {
  return this.http.get<Income[]>(`${this.url}incomeInfo/${ownerName}`)
    .pipe(
      catchError(error => {
        console.error("Error in getIncomeInfo", error);
        throw error;
      })
    );
}
getRentalInformation(ownerName: string): Observable<Rental[]> {
  return this.http.get<Rental[]>(`${this.url}rentalInfo/${ownerName}`)
    .pipe(
      catchError(error => {
        console.error("Error in getIncomeInfo", error);
        throw error;
      })
    );
}
getReportByCompanyId(companyId:any): Observable<PMReport[]>{
  return this.http.get<PMReport[]>(`${this.url}reportsByCompanyId/${companyId}`)
}

deleteReport(id: string): Observable<any>{
  return null; //just dumb code by suwai 
}
getPmReportDataById(id?: string): Observable<PMReport> {
  return this.http.get<PMReport>(`${this.url}pmReportInfoById/${id}`)
}
getIncomeInformationById(id?: string): Observable<Income[]> {
  return this.http.get<Income[]>(`${this.url}incomeInfoById/${id}`)   
}
getExpenseInformationById(id?: string): Observable<Expense[]> {
  return this.http.get<Expense[]>(`${this.url}expenseInfoById/${id}`)    
}
getRentalInformationById(id?: string): Observable<Rental[]> {
  return this.http.get<Rental[]>(`${this.url}rentalInfoById/${id}`)    
}
addPMreport(pmReport: any){
  return this.http.post<PMReport>(`${this.url}addPMreport`, pmReport)
  .pipe(
    catchError((error: HttpHeaderResponse)=>{
      console.error('Error:',error);
      return throwError('Something Worng');
    })
  );
}

}