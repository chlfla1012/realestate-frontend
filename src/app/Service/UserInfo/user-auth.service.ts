import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileHandle } from 'src/app/Model/FileHandle';
import { BehaviorSubject } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CompanyName } from 'src/app/Model/CompanyName';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private id :string;
  private picId :string;
  private roleType: string;
  private firstName: string;
  private lastName: string;
  private phone1:string;
  private phone2:string;
  private phone3:string;
  private isAuthenticated1: boolean = false;
  private companyNameSubject = new BehaviorSubject<CompanyName>({companyName:null}); // Initialize the BehaviorSubject with an empty string.
  companyName$ = this.companyNameSubject.asObservable();
  private companyIdSubject = new BehaviorSubject<number>(0);
  companyId$ = this.companyIdSubject.asObservable();

  // Initialize the BehaviorSubject with an empty string.
  private logoSubject = new BehaviorSubject<FileHandle>({file: null, url: null });
  logo$ = this.logoSubject.asObservable();
  private logoIdSubject = new BehaviorSubject<number>(0); // Initialize the BehaviorSubject with an empty string.
  logoId$ = this.logoIdSubject.asObservable();

  private isLogoBackend = false;
  private isLogoIdBackend = false;
  private isCompanyNameBackend = false;
  private isCompanyIdBackend = false;


  
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { 
    
  }
  
  setLogo(image: string, name: string, isLogoBackend: boolean) {
    const imageBlob = this.dataURItoBlob(image);
    const imageFile = new File([imageBlob], name);
    const imageUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile));
    const imageFileHandle: FileHandle = { file: imageFile, url: imageUrl };
    this.logoSubject.next(imageFileHandle);
    this.isLogoBackend = isLogoBackend;
  }
   
 
  getLogo(){
    return this.logoSubject.asObservable();
  }

  setLogoId(logoId: number,isLogoIdBackend:boolean) {
    this.logoIdSubject.next(logoId);
    
    this.isLogoIdBackend = isLogoIdBackend;
  }

  getLogoId() {
    return this.logoIdSubject.asObservable();
  }

  setCompanyId(companyId: number, isCompanyIdBackend:boolean) {
    this.companyIdSubject.next(companyId);
    this.isCompanyIdBackend = isCompanyIdBackend;

  }
  getCompanyId() {
    return this.companyIdSubject.asObservable();
  }
  setCompanyName(companyName:CompanyName,isCompanyNameBackend:boolean ) {
    this.companyNameSubject.next(companyName); // Notify the subscribers when the companyName changes.
    this.isCompanyNameBackend = isCompanyNameBackend;
  }

  getCompanyName() {
    return this.companyNameSubject.asObservable();
  }
  get isLogoFromBackend() {
    return this.isLogoBackend;
  }
  get isLogoIdFromBackend() {
    return this.isLogoIdBackend;
  }
   get isCompanyNameFromBackend() {
    return this.isCompanyNameBackend;
  }
  get isCompanyIdFromBackend() {
    return this.isCompanyIdFromBackend;
  }
  public dataURItoBlob(image) {
    const byteString = window.atob(image);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

  const blob = new Blob([int8Array]);
    return blob;
  }

  


 
  setId(id: string) {
    this.id = id; 
  }

  getId(): string {
    return this.id;
  }
  getPicId(): string {
    return this.picId;
  }
  setPicId(picId: string) {
    this.picId = picId; 
  }
  setRoleType(roleType: string) {
    this.roleType = roleType; 
  }

  getRoleType(): string {
    return this.roleType;
  }
  
  setFirstName(firstName: string) {
    this.firstName = firstName; 
  }

  getFirstName(): string {
    return this.firstName;
  }

  setLastName(lastName: string) {
    this.lastName = lastName; 
  }

  getLastName(): string {
    return this.lastName;
  }

  getPhone1() {
    return this.phone1; 
  }
  setPhone1(phone1: string) {
    this.phone1 = phone1; 
  }

  getPhone2(): string {
    return this.phone2;
  }
  setPhone2(phone2: string) {
    this.phone2 = phone2; 
  }

  getPhone3(): string {
    return this.phone3;
  }
  setPhone3(phone3: string) {
    this.phone3 = phone3; 
  }
  public clear() {
  
  }

  public isLoggedIn() {
    return this.getRoleType() && this.getId();
  }

  isAuthenticated(): boolean {
    return this.isAuthenticated1;
  }

}