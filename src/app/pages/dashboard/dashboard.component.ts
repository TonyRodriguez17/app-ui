import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { StrapperComponent } from '../../components/strapper/strapper.component';
import { PublicationsService } from '../../services/publications.service';
import { Publication } from '../../models/publication.model';
import { FormsModule } from '@angular/forms';
import { EditpublicationComponent } from '../editpublication/editpublication.component';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, CommonModule, StrapperComponent, FormsModule, EditpublicationComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isModalOpen: boolean = false;
  isFormOpen: boolean = false;
  publications: Publication[] = [];
  filteredPublications: Publication[] = [];
  selectedPublication: Publication | null = null;
  search: string = '';
  selectedCategory: string = '';

  constructor(private publicationService: PublicationsService) { }

  ngOnInit() {
    this.getPublications();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  closeForm() {
    this.isFormOpen = false;
  }

  getPublications() {
    this.publicationService.getPublicaciones().subscribe({
      next: (publications: Publication[]) => {
        this.publications = publications;
        this.filteredPublications = publications;
      },
      error: (error) => {
        console.error('❌ Error al obtener las publicaciones:', error);
      }
    })
  }

  filterPublications() {
    this.filteredPublications = this.publications.filter(publication => {
      const matchesSearch = publication.title.toLowerCase().includes(this.search.toLowerCase());
      const matchesCategory = this.selectedCategory ? publication.typeOfOperation === this.selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }

  openEditModal(publication: Publication) {
    this.selectedPublication = publication;
    this.isFormOpen = true;
  }

  deletePublication(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      this.publicationService.deletePublication(id).subscribe({
        next: () => {
          this.getPublications(); 
        },
        error: (error) => {
          console.error('❌ Error al eliminar la publicación:', error);
        }
      });
    }
  }
}
