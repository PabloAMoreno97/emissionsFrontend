import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Emission } from "../models/emission.model";

interface NamedEntity {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmissionService {
  private apiUrl = 'http://localhost:8000/api/emissions/';

  constructor(private http: HttpClient) {}

  getAll(
    url?: string,
    filters?: { country?: string; activity?: string; emission_type?: string }
  ): Observable<Emission[]> {  // 🔹 Cambio aquí
    const apiUrl = url || this.apiUrl;

    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params = params.set(key, value);
      });
    }

    return this.http.get<Emission[]>(apiUrl, { params });  // 🔹 Cambio aquí también
  }

  getCountries(): Observable<NamedEntity[]> {
    return this.http.get<NamedEntity[]>('http://localhost:8000/api/countries/');
  }

  getActivities(): Observable<NamedEntity[]> {
    return this.http.get<NamedEntity[]>('http://localhost:8000/api/activities/');
  }

  getEmissionTypes(): Observable<NamedEntity[]> {
    return this.http.get<NamedEntity[]>('http://localhost:8000/api/emission_types/');
  }

  private handleError(error: HttpErrorResponse) {
    console.error('HTTP error:', error);
    return throwError(() => new Error('Request failed'));
  }
}