import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http'
import { Observable, catchError ,throwError} from 'rxjs'
import { Property } from 'src/app/Model/Property';
import { UserInfo } from 'src/app/Model/userInfo';
import { Contract } from 'src/app/Model/Contract';


@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }
 //create property
  addProperty(property: any){
    return this.http.post<Property>(`${this.url}addProperty`, property).pipe(
      catchError((error: HttpHeaderResponse)=>{
        console.error('Error:',error);
        return throwError('Something Worng');
      })
    );
  }

 //read property
  getProperty(): Observable<Property[]>{
    return this.http.get<any[]>(this.url+'properties')
  }
 
  getPropertyById(id?:string): Observable<Property>{
    return this.http.get<Property>(`${this.url}property/${id}`)
  }

  

  updateProperty(id?: string ,property?: any): Observable<Property>{
    return this.http.put<Property>(`${this.url}updateProperty/${id}`, property)
  }
  

  // deleteProperty(id: number): Observable<any>{
  //   return this.http.delete<any>(`${this.url}deleteProperty/${id}`)
   
    
  // }
  deleteProperty(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}deleteProperty/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          return throwError('ForeignKeyError'); // Indicate foreign key error
        }
        return throwError('An error occurred while deleting the property.');
      })
    );
  }
 
  getPropertiesByCompanyId(companyId:any):Observable<Property[]>{
    return this.http.get<Property[]>(`${this.url}propertiesByCompanyId/${companyId}`)
  }
  getOwnersByCompanyIdWithPropertyName(companyId:any,propertyName:any):Observable<UserInfo[]>{
    return this.http.get<UserInfo[]>(`${this.url}ownersByCompanyIdWithPropertyName/${companyId/propertyName}`)
  }
}
