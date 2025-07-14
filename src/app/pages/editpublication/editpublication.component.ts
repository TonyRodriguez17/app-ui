import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Publication } from '../../models/publication.model';
import { PublicationsService } from '../../services/publications.service';
import { NgxMaskDirective } from 'ngx-mask';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-edit',
  imports: [CommonModule, FormsModule, NgxMaskDirective, NavbarComponent],
  standalone: true,
  templateUrl: './editpublication.component.html',
  styleUrl: './editpublication.component.css'
})
export class EditpublicationComponent implements OnInit {
  editedPublication: Publication | null = null;
  loading = false;

  constructor(
    private publicationsService: PublicationsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.publicationsService.getPublicationBySlug(slug).subscribe({
        next: (pub) => {
          this.editedPublication = { ...pub };
        },
        error: () => {
          console.error('❌ Error al cargar la publicación');
        }
      });
    }
  }

  updatePublication() {
    this.loading = true;
    if (this.editedPublication) {
      const formData = new FormData();

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

      this.publicationsService.updatePublication(this.editedPublication.id, formData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.loading = false;
          console.error('❌ Error al actualizar la publicación');
        },
      });
    }
  }
}
