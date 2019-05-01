import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/shared/services/web.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [WebService]

})
export class LoginComponent implements OnInit {

  user:any = {
    name:"",
    pass:""
  };
  constructor(private _webservice: WebService) { }

  ngOnInit() {
  }

}
