import { HttpClient, HttpHeaderResponse ,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Contract } from 'src/app/Model/Contract';
import { Invoice } from 'src/app/Model/Invoice';
import { Property } from 'src/app/Model/Property';
import { HttpErrorResponse } from '@angular/common/http';
import { Borrower } from 'src/app/Model/Borrower';


@Injectable({
  providedIn: 'root'
})
export class InvoiceServiceService{
  getInvoiceByCompanyId(companyId: number) {
    throw new Error('Method not implemented.');
  }
  private url = "http://localhost:8080/";
  filteredDataArray: Invoice[];

  constructor(private http: HttpClient) { }



  
  addInvoice(invoice: any){
    return this.http.post<Invoice>(`${this.url}addInvoice`, invoice)
    .pipe(
      catchError((error: HttpHeaderResponse)=>{
        console.error('Error:',error);
        return throwError('Something Worng');
      })
    );
  }


  getPropertyByBorrowerType(companyId:any): Observable<Property[]>{
    return this.http.get<Property[]>(`${this.url}propertiesByBorrowerType/${companyId}`)
  }

  getContractsByBorrowerType(companyId:any):Observable<Contract[]>{
    //console.log();
    return this.http.get<Contract[]>(`${this.url}contractsByBorrowerType/${companyId}`)
  }

  getBcMail(borrowerCooperate:string):Observable<Borrower[]>{
    // console.log("BorrowerCooperate"+this.borrowerCooperate);
    console.log(`Search Parameters: borrowerCooperate=${borrowerCooperate}`);

    return this.http.get<Borrower[]>(`${this.url}searchMail/${borrowerCooperate}`)
  }
  
  getPDFByCompanyId(companyId:any):Observable<Invoice[]>{
    console.log("Hello Invoice By");
    return this.http.get<Invoice[]>(`${this.url}PDFByCompanyId/${companyId}`)
  }


  // getInvoiceById(id?:string): Observable<Invoice>{
  //   return this.http.get<Invoice>(`${this.url}invoice/${id}`)
  // }

    // Get Invoice - Read
    getInvoice(): Observable<Invoice[]>{
     // return this.http.get<Invoice[]>(this.url+'invoice')
      // return this.http.get<Invoice[]>(`${this.url}invoice`)
      return this.http.get<any[]>(this.url+'invoice')

    }

    getInvoiceAndInvoiceListByCompanyId(companyId:any): Observable<Invoice[]>{
      //console.log("Invoice List service ",this.http.get<Invoice[]>(`${this.url}invoicesAndInvoiceListsByCompanyId/${companyId}`));
      return this.http.get<Invoice[]>(`${this.url}invoicesAndInvoiceListsByCompanyId/${companyId}`)
    }
  
    searchInvoiceList(companyId?:any,propertyName?:String,lenderPersonName?:String):Observable<Invoice[]>{
      console.log(`Search Parameters: companyId=${companyId}, propertyName=${propertyName}, lenderPersonName=${lenderPersonName}`);
      console.log(this.searchInvoiceList)
      return this.http.get<Invoice[]>(`${this.url}searchInvoiceList/${companyId}/${propertyName}/${lenderPersonName}`)
  
    }
    

    getInvoiceById(id?:string): Observable<Invoice>{
      return this.http.get<Invoice>(`${this.url}invoiceDetail/${id}`)
    }
  

    updateInvoices(id?: string ,invoice?: any): Observable<Invoice>{
      return this.http.put<Invoice>(`${this.url}updateInvoice/${id}`, invoice)
    }
    
  
    deleteInvoice(id: string): Observable<void> {
      return this.http.delete<void>(`${this.url}deleteInvoice/${id}`).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 500) {
            return throwError('ForeignKeyError'); // Indicate foreign key error
          }
          return throwError('An error occurred while deleting the property.');
        })
      );
    }
    

  }