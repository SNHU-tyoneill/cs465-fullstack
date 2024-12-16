import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { Authresponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  private apiBaseUrl = 'http://localhost:3000/api';
  private tripUrl = `${this.apiBaseUrl}/trips`;

  private getHttpOptions(): { headers: HttpHeaders } {
    const token = this.storage.getItem('travlr-token');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    
    console.log('Full headers:', headers.keys().map(key => `${key}: ${headers.get(key)}`));
    return { headers };
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripUrl);
  }

  addTrip(formData: Trip): Observable<Trip> {
    const options = this.getHttpOptions();
    console.log('Making request with options:', options);
    return this.http.post<Trip>(this.tripUrl, formData, options);
  }

  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.tripUrl}/${tripCode}`);
  }

  updateTrip(formData: Trip): Observable<Trip> {
    console.log('Updating trip with data:', formData);
    const options = this.getHttpOptions();
    console.log('Using headers:', options.headers.keys());
    return this.http.put<Trip>(`${this.tripUrl}/${formData.code}`, formData, options);
  }

  public login(user: User): Promise<Authresponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<Authresponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): 
  Promise<Authresponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return firstValueFrom(
      this.http.post<Authresponse>(url, user)
    ).catch((error) => {
      console.error('Error occurred during authentication API call:', error);
      throw error;
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}