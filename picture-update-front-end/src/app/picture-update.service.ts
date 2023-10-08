import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {ImageUpload} from "./models/image-upload.model";



@Injectable({
  providedIn: 'root'
})
export class PictureUpdateService {

  private readonly baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient ) { }

  uploadImage(file: File, imageUpload: ImageUpload): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    if (imageUpload.imageDetails) {
      formData.append('imageDetails', imageUpload.imageDetails);
    } else {
      // You can decide what to do here. For example, you could throw an error or use a default value.
      console.error('Image details are missing!');
      return throwError('Image details are missing!');
    }

    return this.http.post(this.baseUrl + '/images/upload', formData, { responseType: 'text' });


  }

  getAllImages(): Observable<ImageUpload[]>{
    return this.http.get<ImageUpload[]>(this.baseUrl + '/images/all')
  }

  deleteImage(imageId: number): Observable<any> {
    const url = this.baseUrl + "/images/" + imageId;
    return this.http.delete(url, { headers: this.getAuthHeaders() });
  }


  private getAuthHeaders() {
    let token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
    }
    return {};
  }

}
