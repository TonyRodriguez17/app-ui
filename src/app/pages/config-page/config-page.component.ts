import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ContactSettingsService } from '../../services/contact-settings.service';
import { ContactDetails } from '../../models/contactDetails.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faYoutube, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-config-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './config-page.component.html',
  styleUrl: './config-page.component.css'
})
export class ConfigPageComponent implements OnInit {
  contactDetails: ContactDetails = {
    address: '',
    email: '',
    phone: '',
    weekdayHours: '',
    saturdayHours: '',
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: ''
  };

  constructor(
    private contactSettingsService: ContactSettingsService,
    private library: FaIconLibrary
  ) {
    library.addIcons(faYoutube, faFacebookF, faInstagram);
  }

  ngOnInit() {
    this.getSettings();
  }

  getSettings() {
    this.contactSettingsService.getContactDetails().subscribe({
      next: (contactDetails: ContactDetails) => {
        this.contactDetails = contactDetails;
      },
      error: (error) => {
        this.contactDetails = {
          address: '',
          email: '',
          phone: '',
          weekdayHours: '',
          saturdayHours: '',
          facebook: '',
          instagram: '',
          twitter: '',
          youtube: ''
        };
      }
    });
  }

  updateContactDetails() {
    if (!this.contactDetails) {
      return;
    }

    this.contactSettingsService.updateContactDetails(this.contactDetails).subscribe({
      next: () => {
        console.log('Detalles de contacto actualizados correctamente');
      },
      error: (error) => {
        console.error('Error al actualizar los detalles de contacto:', error);
      }
    });
  }
}
