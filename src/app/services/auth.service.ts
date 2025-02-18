import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) : Observable<any> {
    return this.http.post(this.apiUrl + '/login', { email, password });
  }

  forgotPassword(email: string) : Observable<any> {
    return this.http.post(this.apiUrl + '/forgot-password', { email });
  }

  resetPassword(token: string, newPassword: string) : Observable<any> {
    return this.http.post(this.apiUrl + '/reset-password', { token, newPassword }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
