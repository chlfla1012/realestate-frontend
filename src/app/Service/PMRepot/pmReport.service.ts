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

deleteReport(id: string): Observable<void> {
  return this.http.delete<void>(`${this.url}deletePMReport/${id}`).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 500) {
        return throwError('ForeignKeyError'); // Indicate foreign key error
      }
      return throwError('An error occurred while deleting the report.');
    })
  );
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
//Get Data For Detail Page
getPMReportById(id?:string): Observable<PMReport>{
  return this.http.get<PMReport>(`${this.url}pmReport/${id}`)
}
getExpenseDataById(id?:string): Observable<Expense[]>{
  return this.http.get<Expense[]>(`${this.url}expenseData/${id}`)
}
getIncomeDataById(id?:string): Observable<Income[]>{
  return this.http.get<Income[]>(`${this.url}incomeData/${id}`)
}
getRentalDataById(id?:string): Observable<Rental[]>{
  return this.http.get<Rental[]>(`${this.url}rentalData/${id}`)
}
//Finished getting data for detail

//Delete PM report data
deletePMReport(id: string): Observable<void> {
  return this.http.delete<void>(`${this.url}deletePMReport/${id}`).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 500) {
        return throwError('ForeignKeyError'); // Indicate foreign key error
      }
      return throwError('An error occurred while deleting the pm report.');
    })
  );
}
findByPropertyName(propertyName:any,id: any):Observable<Property[]>{
  return this.http.get<Property[]>(`${this.url}searchbyPropertyName/${propertyName}/${id}`)
}

updatePMReport(id?: string ,expenseRow?: any){
  return this.http.put<Expense>(`${this.url}updatePMReport/${id}`, expenseRow)
  .pipe(
    catchError((error: HttpHeaderResponse)=>{
      console.error('Error:',error);
      return throwError('Something Worng');
    })
  );
}

deleteExpenseRow(id: number): Observable<void>{
  return this.http.delete<void>(`${this.url}deleteExpenseRow/${id}`)
}

}