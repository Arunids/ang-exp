// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ToastService {

//   constructor() { }
// }

import {
  Injectable
} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

constructor() { }

success(message: any) {
  
  var iDiv = document.createElement('div');
iDiv.id = 'block';
iDiv.className = 'block';
iDiv.innerHTML = `<div id="toast-popup">
<i class="close fa fa-times"></i>
<i class="success fa fa-check-circle"></i>
<h4>Success</h4>
<p>Any one with the access can view this page </p>
</div>`;
document.getElementsByTagName('body')[0].appendChild(iDiv);
setTimeout(() => {
  
  (<HTMLElement>document.getElementById('toast-popup')).style.top = "0px";
  (<HTMLElement>document.querySelector('.close')).addEventListener('click',()=>{
   
this.closePopup();  

    
  })
  setTimeout(()=>{
    this.closePopup();  
    
        },4000);
  
}, 200);
  
 
  // setTimeout(() => {
  //     this.appRef.detachView(componentRef.hostView);
  //     componentRef.destroy();
  // }, 3000);
}
  
closePopup(){
  
    (<HTMLElement>document.getElementById('toast-popup')).style.top = "-150px";
  
}
  
}