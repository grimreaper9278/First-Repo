import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tree } from './tree';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  constructor(
    private http: HttpClient,
    
    ) { }
    httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'Application/json'})
    }
    // listUrl = 'http://sarallah-zn.com/back/api/v1/category/listCetegoryWithoutParent'
    listUrl = 'http://localhost:3000/categories'
    
    // getData(): Observable<any>{ 
    //   return this.http.get<any>(this.listUrl)
    // }

    getData(): Observable<any>{ 
      return this.http.get<any>(this.listUrl)
    }

}
