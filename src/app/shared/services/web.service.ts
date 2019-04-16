import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class WebService {
  constructor(private http: HttpClient, ) { }
  baseUrl: string = 'http://localhost:3000';
  // baseUrl: string = 'https://expang.herokuapp.com';


  commonPostMethod(url: string, data: any): any {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // 'authorization': this.getAccessToken()
    })
    let body = data;
    let endPoint = this.baseUrl + url;
    return this.http.post(endPoint, body, { headers });
  }
}