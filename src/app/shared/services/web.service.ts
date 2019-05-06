import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
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

  commonMethod(url: string, data: any, method?: string): any {
    method = method ? method : 'POST';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // 'authorization': this.getAccessToken()
    })
    let endPoint = this.baseUrl + url;
    if (method == 'POST')
      return this.http.post(endPoint, data, { headers });
    else if (method == 'GET')
      return this.http.get(endPoint, { headers });
    else if (method == 'PUT')
      return this.http.put(endPoint, data, { headers });
    else if (method == 'DELETE')
      return this.http.delete(endPoint, { headers });

  }
  listProductCategory(callback) {
    this.commonMethod('/api/products_category', '', 'GET').subscribe(
      (data: any) => {
        if (data.Status == 'Success' && data.Response.length) {
          data.Response = data.Response.map((v: any) => {
            return {
              id: v.id,
              code: v.code,
              name: v.name
            }
          });
          callback(data);
        }
        else {
          callback(null);
        }

      },
      (error:any) =>{
        callback(null);
      }

    )
  }
}
