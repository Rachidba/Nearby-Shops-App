import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Login } from '../models/login';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  success: boolean = false;
  error: boolean = false;
  constructor(private registerationService: RegistrationService) { }

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

  onRegister() {
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {
      var login = new Login(this.emailFormControl.value, this.passwordFormControl.value);
      var response = this.registerationService.register(login).subscribe(
        result => {
          this.success = true;
          this.error = false;
        },
        error => {
          this.success = false;
          this.error = true;
        }
      );
    }
  }
}
