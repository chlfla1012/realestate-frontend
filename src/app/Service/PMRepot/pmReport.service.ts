import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, throwError } from "rxjs";
import { PMReport } from 'src/app/Model/PMReport';


@Injectable({
  providedIn: 'root'
})
export class PMReportService {

  private url = "http://localhost:8080/";
  pmReport: PMReport;

  constructor(private http: HttpClient) { }

  deleteReport(id: string): Observable<any>{
    return null; //just dumb code by suwai
   
  }

}
