import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-preview',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent implements OnChanges {
  @Input() publication: any = {
    title: '',
    description: '',
    price: 0,
    address: '',
    typeOfLocal: '',
    typeOfOperation: '',
    numberOfRooms: '',
    numberOfBathrooms: '',
    size: 0,
    imagenesUrls: [] // 🚀 Aquí guardamos las URLs en Base64 y luego las reales
  }; // Recibe los datos de la publicación desde el Strapper

  selectedImage: string = ''; // Imagen seleccionada
  currentIndex: number = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    console.log('🔄 Cambios detectados:', this.publication.imagenesUrls);
  
    if (this.publication?.imagenesUrls?.length > 0) {
      this.selectedImage = this.publication.imagenesUrls[0];
      console.log('✅ Primera imagen asignada:', this.selectedImage);
    }
  
    this.cdr.detectChanges(); // 🚀 Force Angular to detect changes
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.selectedImage = this.publication.imagenesUrls[this.currentIndex];
    }
  }

  nextImage() {
    if (this.currentIndex < this.publication.imagenesUrls.length - 1) {
      this.currentIndex++;
      this.selectedImage = this.publication.imagenesUrls[this.currentIndex];
    }
  }
}
