import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { Publication } from '../../models/publication.model';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.css'
})
export class PublicationsComponent {
  @Output() formData = new EventEmitter<Publication>();

  publication: Publication = {
    id: 0,
    title: '',
    slug: '',
    description: '',
    price: 0,
    address: '',
    typeOfLocal: '',
    typeOfOperation: '',
    numberOfRooms: 0,
    numberOfBathrooms: 0,
    numberOfHalfBathrooms: 0,
    size: 0,
    buildSize: 0,
    views: 0
  };

  sendData() {
    this.formData.emit(this.publication);
  }
}
