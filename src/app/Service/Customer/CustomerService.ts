import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, throwError } from "rxjs";
import { Customer } from 'src/app/Model/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = "http://localhost:8080/";
  customer :Customer;

  constructor(private http: HttpClient) { }

  ngOnInit() {     
    const storedCustomer = localStorage.getItem('customer');
    if (storedCustomer) {
      this.customer = JSON.parse(storedCustomer);
      console.log(this.customer.personFirstKana);
    }
  
  }

  // Add Customer - Create
  addCustomer(customer: any){
    return this.http.post<Customer>(`${this.url}addCustomer`, customer).pipe(
      catchError((error: HttpHeaderResponse)=>{
        console.error('Error: from testing',error);
        return throwError('Something Worng');
      })
    );
  }

  
  // Get Customers - Read
  getCustomer(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'customers')
  }
 //Get Id
 
  // Get Customer by Id - Read
  getCustomerById(id?:string): Observable<Customer>{
    return this.http.get<Customer>(`${this.url}customerDetail/${id}`)
  }

  // Update Customer - Update
  updateCustomer(id?: string ,customer?: any): Observable<any>{
    return this.http.put<any>(`${this.url}customerUpdate/${id}`, customer)
  }
  


  // Delete Customer - Delete
  deleteCustomer(id: string): Observable<any>{
    return this.http.delete<any>(`${this.url}customerDelete/${id}`)
  }
 

  getCustomersByCompanyId(companyId:any):Observable<Customer[]>{
    return this.http.get<Customer[]>(`${this.url}customersByCompanyId/${companyId}`)
  }
}
