/*import { Component, OnInit } from '@angular/core';
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
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebService } from 'src/app/shared/services/web.service';


import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private webservice: WebService,
    private router:Router
  ) {}

  ngOnInit() {
    let flag:boolean = localStorage.getItem('app_token') ? true : false;
    if(flag){
      this.router.navigate(['/dashboard']);
      return;
    }
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value);
    }
    localStorage.setItem('app_token',"1");
    this.formSubmitAttempt = true;
  }
}