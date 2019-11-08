import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebService } from 'src/app/shared/services/web.service';
import { SpinnerService } from '../../shared/services/spinner.service';
import { ToastService } from '../../shared/services/toast.service';


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
    private loader: SpinnerService,
    private toast: ToastService
  ) { }

  ngOnInit() {
    let flag: boolean = localStorage.getItem('app_token') ? true : false;
    if (flag) {
      this.router.navigate(['/dashboard']);
      return;
    }
    this.form = this.fb.group({
      username: ['', Validators.required],
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
    console.log(this.form)
    if (this.form && !this.form.valid) {
      this.toast.error("Please provide valide email/password");
      return;
    }
      // let requestData = {
      //   "username": "skv@gmail.com",
      //   "password": "skv"
      // };
      this.webservice.commonMethod('user/login', this.form.value).subscribe(
        data => {
          // console.log(data);
          if (data.Status == 'Success'){
            this.authService.allowLogin();

          localStorage.setItem('app_token', data.Response.token);
          this.router.navigate(['/dashboard']);
          }
          else{
            this.toast.error("Invalid username /password")
          }


        },
        error=>{
          this.toast.error("Invalid username /password")

        }
      )
    //}
    // this.formSubmitAttempt = true;
  }
}