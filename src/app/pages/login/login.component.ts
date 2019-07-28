import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebService } from 'src/app/shared/services/web.service';
import { SpinnerService } from '../../shared/services/spinner.service';


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
    private router: Router,
    private loader: SpinnerService
  ) { }

  ngOnInit() {
    let flag: boolean = localStorage.getItem('app_token') ? true : false;
    if (flag) {
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
    // this.loader.loaderStart();
    if (this.form.valid) {
      let requestData = {
        "username": "skv@gmail.com",
        "password": "skv"
      };
      this.webservice.commonMethod('/api/user/login', requestData).subscribe(
        data => {
          console.log(data);
          if (data.Status == 'Success')
            this.authService.allowLogin();

          localStorage.setItem('app_token', data.Response);
          this.router.navigate(['/dashboard']);


        }
      )
    }
    this.formSubmitAttempt = true;
  }
}