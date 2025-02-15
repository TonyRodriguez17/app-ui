import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PublicationsComponent } from '../../pages/publications/publications.component';
import { UploadComponent } from '../../pages/upload/upload.component';
import { PreviewComponent } from '../../pages/preview/preview.component';
import { PublicationsService } from '../../services/publications.service';

@Component({
  selector: 'app-strapper',
  imports: [CommonModule, FormsModule, PublicationsComponent, UploadComponent, PreviewComponent],
  templateUrl: './strapper.component.html',
  styleUrl: './strapper.component.css'
})
export class StrapperComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() refreshPublications = new EventEmitter<void>();

  currentStep = 1;
  loading = false;
  successMessage = '';

  publicacionData = {
    title: '',
    description: '',
    price: 0,
    address: '',
    typeOfLocal: '',
    typeOfOperation: '',
    numberOfRooms: '',
    numberOfBathrooms: '',
    size: 0,
    imagenes: [] as File[],
    imagenesUrls: [] as string[]
  };

  constructor(private publicationsService: PublicationsService) { }

  nextStep() {
    if (this.currentStep < 3) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  isActive(step: number) {
    return this.currentStep === step;
  }

  isCompleted(step: number) {
    return this.currentStep > step;
  }

  handleFormData(data: any) {
    this.publicacionData = { ...this.publicacionData, ...data };
  }

  handleImages(images: File[], previews: string[]) {
    console.log('🔄 Antes de actualizar: ', this.publicacionData.imagenesUrls); // Debug

    // 🚀 Actualizamos las imágenes en `publicacionData`
    this.publicacionData = {
      ...this.publicacionData,
      imagenes: [...images],
      imagenesUrls: [...previews]
    };

    console.log('🖼 Imágenes Base64 actualizadas en StrapperComponent:', this.publicacionData.imagenesUrls);
  }

  actualizarPreviews(previews: string[]) {
    console.log('📥 Recibiendo imágenes en actualizarPreviews:', previews);
    this.publicacionData.imagenesUrls = [...previews];
    console.log('✅ Imágenes Base64 almacenadas:', this.publicacionData.imagenesUrls);
  }

  generatePreviews(files: File[]): string[] {
    return files.map(file => URL.createObjectURL(file));
  }

  isStepValid(): boolean {
    const form = this.publicacionData;
    return (
      form.title.trim() !== '' &&
      form.description.trim() !== '' &&
      form.price > 0 &&
      form.address.trim() !== '' &&
      form.typeOfLocal.trim() !== '' &&
      form.typeOfOperation.trim() !== '' &&
      form.numberOfRooms !== '' &&
      form.numberOfBathrooms !== '' &&
      form.size > 0
    );
  }

  isImageStepValid(): boolean {
    return this.publicacionData.imagenes.length > 0;
  }

  publicar() {
    this.loading = true;
    this.successMessage = '';
  
    this.publicationsService.publicar({
      title: this.publicacionData.title,
      description: this.publicacionData.description,
      price: this.publicacionData.price,
      address: this.publicacionData.address,
      typeOfLocal: this.publicacionData.typeOfLocal,
      typeOfOperation: this.publicacionData.typeOfOperation,
      numberOfRooms: this.publicacionData.numberOfRooms.toString(),
      numberOfBathrooms: this.publicacionData.numberOfBathrooms.toString(),
      size: this.publicacionData.size
    }).subscribe({
      next: (response) => {
        const publicacionId = response.id;
        console.log('Publicación creada con ID:', publicacionId);
  
        if (this.publicacionData.imagenes.length > 0) {
          this.publicationsService.subirImagenes(publicacionId, this.publicacionData.imagenes)
            .subscribe({
              next: (imgResponse) => {
                console.log('Imágenes subidas correctamente:', imgResponse);
  
                // 🚀 Guardamos las URLs devueltas por el backend
                this.publicacionData.imagenesUrls = imgResponse.urls;
                this.loading = false;
                this.successMessage = 'Publicación creada con éxito 🎉';
  
                // 🚀 Emitir evento para cerrar el modal después de la publicación
                this.closeModal.emit();
                this.refreshPublications.emit();
              },
              error: (error) => {
                console.error('❌ Error subiendo imágenes:', error);
                this.loading = false;
              }
            });
        } else {
          this.loading = false;
          this.successMessage = 'Publicación creada con éxito 🎉';
          this.closeModal.emit(); // 🚀 Cerrar modal si no hay imágenes
        }
      },
      error: (error) => {
        console.error('❌ Error creando publicación:', error);
        this.loading = false;
      },
      complete: () => {
        console.log('✅ Proceso de publicación completado');
      }
    });
  }
} 
