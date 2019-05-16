import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

  loaderStart() {
    let iDiv: any = document.createElement('div');
    iDiv.id = 'spinner-popup';
    iDiv.innerHTML = `<div class="background-grey"></div>
    <div class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>`;
    document.getElementsByTagName('body')[0].appendChild(iDiv);

  }
  loaderStop() {
    let elem:any = document.getElementById('spinner-popup');
    if(elem && elem.parentNode)
    elem.parentNode.removeChild(elem);
  }
}
