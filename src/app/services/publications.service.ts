import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publication } from '../models/publication.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {
  private publicacionesUrl = environment.publicationsUrl;
  private imagenesUrl = environment.imagesUrl;

  constructor(private http: HttpClient) { }

  publicar(datos: any): Observable<any> {
    return this.http.post(`${this.publicacionesUrl}/create`, datos);
  }

  subirImagenes(publicacionId: number, imagenes: File[]): Observable<any> {
    const formData = new FormData();
    imagenes.forEach((imagen, index) => {
      formData.append(`files`, imagen);
    });
    formData.append('publicacionId', publicacionId.toString());

    return this.http.post(`${this.imagenesUrl}/${publicacionId}`, formData);
  }
  
  getPublicaciones(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.publicacionesUrl);
  }

  getPublicationById(publicationId: number): Observable<Publication> {
    return this.http.get<Publication>(`${this.publicacionesUrl}/${publicationId}`);
  }

  getPublicationBySlug(slug: string): Observable<Publication> {
    return this.http.get<Publication>(`${this.publicacionesUrl}/detail/${slug}`);
  }

  updatePublication(publicationId: number, publication: any): Observable<Publication> {
    return this.http.put<Publication>(`${this.publicacionesUrl}/update/${publicationId}`, publication);
  }

  deletePublication(publicationId: number): Observable<any> {
    return this.http.delete(`${this.publicacionesUrl}/delete/${publicationId}`);
  }
}
