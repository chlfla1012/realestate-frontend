import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, throwError } from "rxjs";
import { UserInfo } from "../../Model/userInfo";
import { UserAuthService } from "./user-auth.service";


@Injectable({
    providedIn: 'root'
  })
  export class UserInfoService {

    private url = "http://localhost:8080/";
    userInfo :UserInfo;
  
    constructor(private http: HttpClient,private userAuthService: UserAuthService) { }

    ngOnInit() {
     
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        this.userInfo = JSON.parse(storedUserInfo);
      }
    
    }
  
    // adding manager data
    addManagerInfo(userInfo: any){
      console.log(userInfo);
      return this.http.post<UserInfo>(`${this.url}createManagerInfo`, userInfo).pipe(
              catchError((error: HttpHeaderResponse)=>{
          // console.error('Error:',error);
          return throwError('Something Worng');
        })
      );
  }
  //adding user data
  addUserInfo(userInfo: any){
    console.log(userInfo);
    return this.http.post<UserInfo>(`${this.url}createUserInfo`, userInfo).pipe(
            catchError((error: HttpHeaderResponse)=>{
        console.error('Error:',error);
        return throwError('Something Worng');
      })
    );
  }
  //adding owner data
  addOwnerInfo(userInfo: any){
    console.log(userInfo);
    return this.http.post<UserInfo>(`${this.url}createOwnerInfo`, userInfo).pipe(
            catchError((error: HttpHeaderResponse)=>{
        console.error('Error:',error);
        return throwError('Something Worng');
      })
    );
  }

//when login 
  login(email: string, password: string): Observable<UserInfo[]> {
      const data = { email, password };
      return this.http.post<any>(`${this.url}userLogin`, data).pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError('Something went wrong');
        })
      );
    }
    
  //check role
    roleMatch(allowedRoles: string[]): boolean {
      const userRole: string = this.userAuthService.getRoleType();
    
        if (userRole && allowedRoles.includes(userRole)) {
          return true; // User has one of the allowed roles
        }
    
          return false; // User does not have any of the allowed roles
  }
  
  //forgot password
    
      forgotPassword(data:any){
    return this.http.post(this.url+
      "user/forgot",data,{
        headers:new HttpHeaders().set('Content-Type','application/json')
      }
      )
      }

      getEmail(email: string): Observable<UserInfo> {
        //const data = { email};
        //console.log(data);
        return this.http.post<any>(`${this.url}forgotPassword`, email).pipe(
          catchError((error) => {
            console.error('Error:', error);
            return throwError('Something went wrong');
          })
        );
      }
  //get all users
      getUserInfo(): Observable<UserInfo[]>{
        return this.http.get<UserInfo[]>(this.url+'userInfo')
      }
  //get user by id
  getUserById(id?:string): Observable<UserInfo>{
    return this.http.get<UserInfo>(`${this.url}user/${id}`)
  }
  
  getUserAddressByCompanyId(id?:string): Observable<UserInfo[]>{
    return this.http.get<UserInfo[]>(`${this.url}userAddressByCompanyId/${id}`)
  }
  
  //get manager users
  getManagerUsers(): Observable<UserInfo[]>{
    return this.http.get<UserInfo[]>(`${this.url}manager`)
  }
  // getManagers(): Observable<ManagerTest[]>{
  //   return this.http.get<ManagerTest[]>(`${this.url}manager`)
  // }
  //get owners
  getOwners(): Observable<UserInfo[]>{
    return this.http.get<UserInfo[]>(`${this.url}owners`)
  }
  //get pic users
  getPICUsers(): Observable<UserInfo[]>{
    return this.http.get<UserInfo[]>(`${this.url}pics`)
  }
  //update user
  updateUserInfo(id?: string ,userInfo?: any): Observable<any>{
    return this.http.put<any>(`${this.url}updateUser/${id}`, userInfo)
  }
  updateManager(id?: string ,userInfo?: any): Observable<any>{
    return this.http.put<any>(`${this.url}updateManager/${id}`, userInfo)
  }
//testing for componay name

  // Delete UserInfo - Delete
  deleteUserInfo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}deleteUser/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          return throwError('ForeignKeyError'); // Indicate foreign key error
        }
        return throwError('An error occurred while deleting the user.');
      })
    );
  }

 
  getUsersByCompanyId(companyId:any):Observable<UserInfo[]>{
    return this.http.get<UserInfo[]>(`${this.url}usersByCompanyId/${companyId}`)
  }
  
  
  getOwnersByCompanyId(companyId:any):Observable<UserInfo[]>{
    return this.http.get<UserInfo[]>(`${this.url}ownersByCompanyId/${companyId}`)
  }

 
  
}