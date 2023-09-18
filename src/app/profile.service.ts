import { Injectable } from '@angular/core';
import { Profile } from './profile';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private http: HttpClient
    
  ) { }
  apiUrl = 'http://localhost:3000/profiles';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'Application/json'})
  }

  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiUrl)
  }

  submitProfile(profile: Profile): Observable<Profile>{
    return this.http.post<Profile>(this.apiUrl, profile, this.httpOptions)
  }

  deleteProfile(id: number): Observable<Profile>{
    const url = `${this.apiUrl}/${id}`
    return this.http.delete<Profile>(url, this.httpOptions)
  }

  updateProfile(profile: Profile, id: number): Observable<any>{
    return this.http.put<Profile>(`${this.apiUrl}/${id}`, profile, this.httpOptions)
  }

  getProfile(id: number): Observable<Profile>{
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Profile>(url)
  }

}
