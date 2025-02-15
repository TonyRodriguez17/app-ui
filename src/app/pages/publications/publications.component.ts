import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-publications',
  imports: [CommonModule, FormsModule],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.css'
})
export class PublicationsComponent {
  @Output() formData = new EventEmitter<any>();

  publication = {
    title: '',
    description: '',
    price: 0,
    address: '',
    typeOfLocal: '',
    typeOfOperation: '',
    numberOfRooms: '',
    numberOfBathrooms: '',
    size: 0
  };

  sendData() {
    this.formData.emit(this.publication);
  }
}
