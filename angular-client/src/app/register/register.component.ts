import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Login } from '../models/login';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  success = false;
  error = false;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  constructor(private registerationService: RegistrationService) {
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.passwordFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);
  }

  ngOnInit() {
  }

  onRegister() {
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {
      const login = new Login(this.emailFormControl.value, this.passwordFormControl.value);
      const response = this.registerationService.register(login).subscribe(
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
