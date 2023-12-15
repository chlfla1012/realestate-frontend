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
  private readonly localStorageKey = 'logoData'; 

  private isLogoBackend = false;
  private isLogoIdBackend = false;
  private isCompanyNameBackend = false;
  private isCompanyIdBackend = false;


  
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { 
    const storedData = localStorage.getItem(this.localStorageKey);
    if (storedData) {
      const logoData = JSON.parse(storedData);
      this.logoSubject.next(logoData);
      this.logoIdSubject.next(logoData.logoId);
      this.isLogoBackend = logoData.isLogoBackend;
      this.isLogoIdBackend = logoData.isLogoIdBackend;
      this.companyNameSubject.next(logoData.companyName);
      this.companyIdSubject.next(logoData.companyId);
      this.isCompanyNameBackend = logoData.isCompanyNameBackend;
      this.isCompanyIdBackend = logoData.isCompanyIdBackend;
      
    }
  }

  private saveToLocalStorage(): void {
    const logoData = this.logoSubject.getValue();
    //console.log('logoData:', logoData);
    const dataToStore = {
      companyName: this.companyNameSubject.getValue(),
      isCompanyNameBackend: this.isCompanyNameBackend,
      isCompanyIdBackend: this.isCompanyIdBackend,
      logo:this.logoSubject.getValue(),
      logoId: this.logoIdSubject.getValue(),
      isLogoIdBackend: this.isLogoIdBackend,
      isLogoBackend: this.isLogoBackend
    };
    localStorage.setItem(this.localStorageKey, JSON.stringify(dataToStore));
  }
  
  setLogo(image: string, name: string, isLogoBackend: boolean) {
    const imageBlob = this.dataURItoBlob(image);
    const imageFile = new File([imageBlob], name);
    const imageUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile));
    const imageFileHandle: FileHandle = { file: imageFile, url: imageUrl };
    this.convertFileToBase64(imageFile).then((base64Data: string) => {
    const dataToStore = {
      companyName: this.companyNameSubject.getValue(),
      isCompanyNameBackend: this.isCompanyNameBackend,
      isCompanyIdBackend: this.isCompanyIdBackend,
      logo: base64Data, // Store the Base64 representation of the image
      logoId: this.logoIdSubject.getValue(),
      isLogoIdBackend: this.isLogoIdBackend,
      isLogoBackend: this.isLogoBackend
    };
    localStorage.setItem(this.localStorageKey, JSON.stringify(dataToStore));
  });
    
    this.logoSubject.next(imageFileHandle);
    this.isLogoBackend = isLogoBackend;
    this.saveToLocalStorage();
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String.split(',')[1]); // Extracting base64 data
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
   
 
  getLogo(){
    return this.logoSubject.asObservable();
  }

  setLogoId(logoId: number,isLogoIdBackend:boolean) {
    this.logoIdSubject.next(logoId);  
    this.isLogoIdBackend = isLogoIdBackend;
    this.saveToLocalStorage();
  }

  getLogoId() {
    return this.logoIdSubject.asObservable();
  }

  setCompanyId(companyId: number, isCompanyIdBackend: boolean) {
    this.companyIdSubject.next(companyId);
    this.isCompanyIdBackend = isCompanyIdBackend;
    // Store companyId in local storage
    localStorage.setItem('companyId', String(companyId));
  }
  
  getCompanyId() {
    // Retrieve companyId from local storage
    const storedCompanyId = localStorage.getItem('companyId');
    if (storedCompanyId) {
      const companyId = parseInt(storedCompanyId, 10);
      this.companyIdSubject.next(companyId);
      return this.companyIdSubject.asObservable();
    } else {
      return this.companyIdSubject.asObservable();
    }
  }
  
  setCompanyName(companyName:CompanyName,isCompanyNameBackend:boolean ) {
    this.companyNameSubject.next(companyName); // Notify the subscribers when the companyName changes.
    this.isCompanyNameBackend = isCompanyNameBackend;
    this.saveToLocalStorage();
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
    localStorage.setItem('user_id', id); 
  }

  getId(): string {
    return localStorage.getItem('user_id'); 
  }
  getPicId(): string {
    return localStorage.getItem('pic_id');
  }
  setPicId(picId: string) {
    localStorage.setItem('pic_id', picId);
  }
  setRoleType(roleType: string) {
    localStorage.setItem('role_type', roleType); 
  }

  getRoleType(): string {
    return localStorage.getItem('role_type');
  }
  
  setFirstName(firstName: string) {
    localStorage.setItem('first_name', firstName);
  }

  getFirstName(): string {
    return localStorage.getItem('first_name');
  }

  setLastName(lastName: string) {
    localStorage.setItem('last_name', lastName);
  }

  getLastName(): string {
    return localStorage.getItem('last_name');
  }

  setPhone1(phone1: string) {
    localStorage.setItem('phone_1', phone1);
  }

  getPhone1(): string {
    return localStorage.getItem('phone_1');
  }

  setPhone2(phone2: string) {
    localStorage.setItem('phone_2', phone2);
  }

  getPhone2(): string {
    return localStorage.getItem('phone_2');
  }

  setPhone3(phone3: string) {
    localStorage.setItem('phone_3', phone3);
  }

  getPhone3(): string {
    return localStorage.getItem('phone_3');
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