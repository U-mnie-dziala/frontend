import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import {UserHistoryService} from '../../services/user-history.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  message = '';
  roles: string[] = [];

  responseSaving = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private userHistoryService: UserHistoryService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.message = data.message;
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
      },
      err => {
        this.message = err.error.message;
        this.isLoginFailed = true;
      },
      () => {
        if (this.isLoggedIn && this.userHistoryService.saveHistoryFailed) {
            this.userHistoryService.userId = this.tokenStorage.getUser().id;
            console.log('Execute saveUserHistory');
            this.userHistoryService.saveUserHistory().subscribe(response => {
                this.responseSaving = response;
                console.log('Success to save quiz: ' + response + '.');
              },
              err => {
                this.userHistoryService.quiz = null;
                this.userHistoryService.saveHistoryFailed = false;
                console.log('Failed to save quiz');
              },
              () => this.reloadPage()
            );
            console.log('Reloading...');
        }
        else{
          this.reloadPage();
        }
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
