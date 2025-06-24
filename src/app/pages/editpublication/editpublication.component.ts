import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Publication } from '../../models/publication.model';
import { PublicationsService } from '../../services/publications.service';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-edit',
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  standalone: true,
  templateUrl: './editpublication.component.html',
  styleUrl: './editpublication.component.css'
})
export class EditpublicationComponent implements OnChanges {
  @Input() publication: Publication | null = null;
  @Output() closeForm = new EventEmitter<void>();
  @Output() refreshPublications = new EventEmitter<void>();

  editedPublication: Publication | null = null;
  loading = false;

  constructor(private publicationsServe: PublicationsService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['publication'] && this.publication) {
      this.editedPublication = structuredClone(this.publication);
    }
  }

  updatePublication() {
    this.loading = true;
    if (this.editedPublication) {
      const formData = new FormData();

      console.log('Actualizando publicación:', this.editedPublication);
      
      formData.append('id', this.editedPublication.id.toString());
      formData.append('title', this.editedPublication.title);
      formData.append('description', this.editedPublication.description);
      formData.append('price', this.editedPublication.price.toString());
      formData.append('address', this.editedPublication.address);
      formData.append('typeOfLocal', this.editedPublication.typeOfLocal);
      formData.append('typeOfOperation', this.editedPublication.typeOfOperation);
      formData.append('numberOfRooms', this.editedPublication.numberOfRooms.toString());
      formData.append('numberOfBathrooms', this.editedPublication.numberOfBathrooms.toString());

      if (this.editedPublication.numberOfHalfBathrooms != null) {
        formData.append('numberOfHalfBathrooms', this.editedPublication.numberOfHalfBathrooms.toString());
      }

      formData.append('size', this.editedPublication.size.toString());
      formData.append('buildSize', this.editedPublication.buildSize.toString());

      this.publicationsServe.updatePublication(this.editedPublication.id, formData).subscribe({
        next: (response) => {
          this.loading = false;
          this.closeForm.emit();
          this.refreshPublications.emit();
        },
        error: () => {
          console.error('❌ Error al actualizar la publicación');
        },
      });
    }
  }
}
