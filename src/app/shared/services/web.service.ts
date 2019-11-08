import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SpinnerService } from '../../shared/services/spinner.service';
import { callbackify } from 'util';


@Injectable({ providedIn: 'root' })
export class WebService {
  constructor(private http: HttpClient, private loader: SpinnerService) { }
  baseUrl: string = 'http://localhost/shop_api/';
  // baseUrl: string = 'https://expang.herokuapp.com';


  commonPostMethod(url: string, data: any): any {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': this.getAccessToken()
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
      'Authorization': this.getAccessToken()
    })
    let endPoint = this.baseUrl + url;
    if (method == 'POST')
      return this.http.post(endPoint, data, { headers });
    else if (method == 'GET')
      return this.http.get(endPoint, { headers });
    else if (method == 'PUT')
      return this.http.put(endPoint, data, { headers });
    else if (method == 'DELETE') {
      const options = {
        headers: headers,
        body: data
      };
      return this.http.delete(endPoint, options);
    }

  }
  listItem(url: string, callback: Function) {
    this.loader.loaderStart();
    this.commonMethod(url, '', 'GET').subscribe(
      (data: any) => {
        if (data.Status == 'Success' && data.Response.length) {
          callback(data, '');
        }
        else {
          callback(null, data);
        }
        this.loader.loaderStop();
      },
      (error: any) => {
        callback(null, "Please check your Internet Connection !!!");
        this.loader.loaderStop();
      }

    )
  }
  createItem(url: string, body: any, callback: Function) {
    this.loader.loaderStart();
    // if (this.category.id == 0) {
    this.commonMethod(url, body, 'POST').subscribe(
      (data: any) => {
        if (data.Status) {
          // this.toast.success("Product Category Created Successfully..")
        this.loader.loaderStop();

          callback(data);
          // if(flag){
          //   this.showCreate(false);
          // }
          // else
          // this.listProductCategory();
        }
        else {
          callback(null);
        }
      },
      (error: any) => {
        callback(null);
      },
      () => {
        this.loader.loaderStop();
      }
    );
    // }
  }
  updateItem(url: string, body: any, callback: Function) {
    this.loader.loaderStart();
    this.commonMethod(url, body, 'PUT').subscribe(
      (data: any) => {
        if (data.Status) {
          this.loader.loaderStop();
          callback(data);
          // this.toast.success("Product Category Updated Successfully..")

          // this.spinner.loaderStop();
          // this.listProductCategory();
        }
        else {
          callback(null);
        }
      },
      (error: any) => {
        callback(null);
      },
      () => {
        this.loader.loaderStop();
      });
  }
  deleteItem(url: string, body: any, callback: Function) {
    this.loader.loaderStart();
    // console.log("its come")
    this.commonMethod(url, body, 'DELETE').subscribe(
      (data: any) => {
        // console.log("its inside come")
        if (data.Status) {
          // this.toast.success("Product Category Deleted..")
          // this.loader.loaderStop();
          // this.showVisibility(false, false);
          // this.listProductCategory();
          callback(data);
        }
        else {
          // console.log("its else come")
          callback(null);
        }
      },
      (error: any) => {
        this.loader.loaderStop();

        callback(null);
      },
      () => {
        this.loader.loaderStop();
      });
  }
  setFocus(elm: string) {
    setTimeout(() => {
      (<HTMLInputElement>document.getElementById(elm)).focus();
    }, 100);
  }
  uploadToCloud(formData: FormData) {
    let headers = new HttpHeaders({

      'Accept': 'application/json',
      'enctype': "multipart/form-data"

    })

    let endPoint = this.baseUrl + 'upload';
    // console.log(endPoint);
    return this.http.post(endPoint, formData, { headers });

  }
  getAccessToken() {
    if(!localStorage.getItem('app_token')) return '';
    return 'bearer ' + localStorage.getItem('app_token');
  }
}
