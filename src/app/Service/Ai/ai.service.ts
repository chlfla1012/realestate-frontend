import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class AiService {
  private hostUrl = environment.hostUrl;

  constructor(private http: HttpClient) {}

  uploadBankImage(formData: FormData): Observable<any[]> {
    return this.http.post<any[]>(`${this.hostUrl}ocr-image-upload`, formData);
  }

  generatePmComment(data: any, model: string): Observable<string> {
    return this.http.post(`${this.hostUrl}ai-pm-comment`, { data, model }, { responseType: 'text' });
  }

  generatePropertyDescription(data: any, model: string): Observable<string> {
    return this.http.post(`${this.hostUrl}ai-property-description`, { data, model }, { responseType: 'text' });
  }
}
