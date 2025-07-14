import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ContactDetails } from '../models/contactDetails.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ContactSettingsService {
  private contactSettingsUrl = environment.contactSettingsUrl;

  constructor(private http: HttpClient) { }

  getContactDetails(): Observable<ContactDetails> {
    return this.http.get<ContactDetails>(this.contactSettingsUrl);
  }

  updateContactDetails(contactDetails: ContactDetails) {
    return this.http.put(this.contactSettingsUrl + '/update', contactDetails);
  }
}
