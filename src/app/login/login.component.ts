import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from  '../shared/services/auth.service';
import { Signup } from '../shared/models/signup.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public  user: Signup = new Signup();
  public loginForm: FormGroup;
  public hide = true;
  public response: any;
  public message = false ;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authservice: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': [this.user.email, [
        Validators.required,
        Validators.email
      ]],
      'password': [this.user.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]]
    });
    }

  onLoginSubmit() {
    this.authservice.login(this.user).subscribe(data => {
      if (data === null ) {
        this. message = true ;
      } else {
      localStorage.setItem('token', 'fake login token');
        this.router.navigate(['/user/list']);
       }
    });

  }
}
