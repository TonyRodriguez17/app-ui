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
    numberOfHalfBathrooms: 0,
    size: 0,
    buildSize: 0,
    imagenesUrls: [] 
  }; 

  selectedImage: string = ''; // Imagen seleccionada
  currentIndex: number = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    if (this.publication?.imagenesUrls?.length > 0) {
      this.selectedImage = this.publication.imagenesUrls[0];
      console.log('✅ Primera imagen asignada:', this.selectedImage);
    }
  
    this.cdr.detectChanges(); 
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
