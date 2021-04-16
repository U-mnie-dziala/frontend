import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    password2: null,
  };
  notequal = false;

  isSuccessful = false;
  isSignUpFailed = false;
  message = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!(this.form.password === this.form.password2)){
      this.notequal = true;
      console.log('notequal');
      return;
    }
    this.notequal = false;
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe(
      data => {
        console.log(data);
        this.message = data.message;
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.message = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
