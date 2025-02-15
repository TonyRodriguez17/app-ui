import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Publication } from '../../models/publication.model';
import { PublicationsService } from '../../services/publications.service';

@Component({
  selector: 'app-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './editpublication.component.html',
  styleUrl: './editpublication.component.css'
})
export class EditpublicationComponent {
  @Input() publication: Publication | null = null;
  @Output() closeForm = new EventEmitter<void>();
  @Output() refreshPublications = new EventEmitter<void>();

  loading = false;

  constructor(private publicationsServe: PublicationsService) { }

  updatePublication() {
    this.loading = true;
    if (this.publication) {
      const formData = new FormData();
      formData.append('id', this.publication.id.toString());
      formData.append('title', this.publication.title);
      formData.append('description', this.publication.description);
      formData.append('price', this.publication.price.toString());
      formData.append('address', this.publication.address);
      formData.append('typeOfLocal', this.publication.typeOfLocal);
      formData.append('typeOfOperation', this.publication.typeOfOperation);
      formData.append('numberOfRooms', this.publication.numberOfRooms.toString());
      formData.append('numberOfBathrooms', this.publication.numberOfBathrooms.toString());
      formData.append('size', this.publication.size.toString());

      this.publicationsServe.updatePublication(this.publication.id, formData).subscribe({
        next: (response) => {
          console.log('📄 Publicación actualizada con éxito:', response);
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
