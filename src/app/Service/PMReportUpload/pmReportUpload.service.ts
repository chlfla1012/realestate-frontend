import { Injectable } from '@angular/core';
import { PMReportUpload } from 'src/app/Model/PMReportUpload';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders,HttpResponse } from "@angular/common/http";
import { Observable, catchError, map, of, throwError } from "rxjs";
import { PMReport } from 'src/app/Model/PMReport';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PmReportUploadService {

  private url = environment.hostUrl;
  pmReportUpload: PMReportUpload;
    constructor(private http: HttpClient) { }

  uploadFile(formData: FormData) {
    return this.http.post<any>(`${this.url}pmreport/upload`, formData).pipe(
      catchError((error: HttpHeaderResponse)=>{
        console.error('Error: from testing',error);
        return throwError('return from pmReportUploadservice: Something Worng');
      })
    );
  }

  getReportsByOwnerName(ownerName: string): Observable<any[]> {  
    return this.http.get<any[]>(`${this.url}pmreport/pmReportByOwnerName/${ownerName}`);
  }

  getOwnerName(companyId:any):Observable<PMReport[]>{
    return this.http.get<PMReport[]>(`${this.url}ownerNameById/${companyId}`);
  }
}

