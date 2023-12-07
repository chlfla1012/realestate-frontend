import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from '@angular/common/http'
import { Observable, catchError ,throwError} from 'rxjs'
import { Contract } from 'src/app/Model/Contract';
import { Property } from 'src/app/Model/Property';


@Injectable({
  providedIn: 'root'
})
export class ContractService {
  // getContractById(id: number) {
  //   throw new Error('Method not implemented.');
  // }

  private url = "http://localhost:8080/";

  constructor(private http: HttpClient) {}

addContract(contract: any){
  return this.http.post<Contract>(`${this.url}addContract`, contract)
  .pipe(
    catchError((error: HttpHeaderResponse)=>{
      console.error('Error:',error);
      return throwError('Something Worng');
    })
  );
}


 //read contract
  getContract(): Observable<Contract[]>{
    return this.http.get<any[]>(this.url+'contracts')
  }

  getcontractById(id?:string): Observable<Contract>{
    return this.http.get<Contract>(`${this.url}contract/${id}`)
  }

  updateContract(id?: string ,contract?: any): Observable<Contract>{
    return this.http.put<Contract>(`${this.url}updateContract/${id}`, contract)
  }

  // deleteContract(id: number): Observable<contract>{
  //   return this.http.delete<any>(`${this.url}deleteContract/${id}`)
  // }
  deleteContract(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}deleteContract/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          return throwError('ForeignKeyError'); // Indicate foreign key error
        }
        return throwError('An error occurred while deleting the contract.');
      })
    );
  }


  getContractsByCompanyId(companyId:any):Observable<Contract[]>{
    return this.http.get<Contract[]>(`${this.url}contractsByCompanyId/${companyId}`)
  }
  findByPropertyNameContaining(propertyName:any):Observable<Property[]>{
    return this.http.get<Property[]>(`${this.url}searchbyPropertyName/${propertyName}`)
  }
  getPropertyByName(propertyName?:string): Observable<Property>{
    return this.http.get<Property>(`${this.url}property/${propertyName}`)
  }

}

