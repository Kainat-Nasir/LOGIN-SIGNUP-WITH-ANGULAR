import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get('http://localhost:3000/getAll');
  }

  postData(data: any): Observable<any> {
    // console.log("payload",data);
    return this.http.post('http://localhost:3000/signup',data);
  }

}
