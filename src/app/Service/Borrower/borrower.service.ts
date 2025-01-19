import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Borrower } from 'src/app/Model/Borrower';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BorrowerService {

  private url = environment.hostUrl;

  constructor(private http: HttpClient) {}

  getBorrowerById(id?:any):Observable<Borrower[]>{
    return this.http.get<Borrower[]>(`${this.url}borrower/${id}`)
  }
}
