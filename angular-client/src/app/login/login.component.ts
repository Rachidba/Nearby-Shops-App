import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service'
import { Login } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  error: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  onLogin() {
    if(this.emailFormControl.valid && this.emailFormControl.valid)
    {
      var login = new Login(this.emailFormControl.value, this.passwordFormControl.value);
      this.authService.login(login).subscribe(
        result => {
          this.error = false;
        },
        error => {
          this.error = true;
        }
      );
    }
  }
}