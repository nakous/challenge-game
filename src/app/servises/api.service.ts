import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:4200/api';

  constructor(private http: HttpClient) {}

  saveImage(image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);

    return this.http.post(`${this.baseUrl}/saveImage`, formData);
  }

  saveGame(gameData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/saveGame`, gameData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getGames(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getGames`);
  }

  getGame(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getGame/${name}`);
  }
}