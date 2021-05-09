import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import {UserHistoryService} from '../../services/user-history.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  isTokenExpired = false;
  message = '';
  roles: string[] = [];

  responseSaving = '';

  resetPassword = false;
  newPassword = false;
  emailSent = false;

  changedPassword = false;
  changePasswordCode: string;
  notequal: any;
  emailSentSuccess = true;
  correctCode = true;
  changedPasswordOK = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private userHistoryService: UserHistoryService, private router: Router) { }

  ngOnInit(): void {
    if (this.router.url === '/zaloguj/re'){
      this.tokenStorage.signOut();
      this.message = 'Twoja sesja wygasła, zaloguj się ponownie.';
      this.isTokenExpired = true;
    }
    else if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    this.unsetResettingPassword();
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
            this.userHistoryService.saveUserHistory().subscribe(response => {
                this.responseSaving = response;
              },
              err => {
                this.userHistoryService.quiz = null;
                this.userHistoryService.saveHistoryFailed = false;
              },
              () => this.reloadPage()
            );
        }
        else{
          this.reloadPage();
        }
      }
    );
  }

  reloadPage(): void {
    this.router.navigate(['/zaloguj'])
      .then(() => {
        window.location.reload();
      });
  }

  unsetResettingPassword(): void {
    this.resetPassword = false;
    this.emailSent = false;
    this.newPassword = false;
    this.changedPassword = false;

  }

  resetPasswordRequest(email: string): void {
    this.authService.resetPassword(email).subscribe(response => {
      this.resetPassword = false;
      this.emailSentSuccess = true;
      this.emailSent = true;
      },
      error => this.emailSentSuccess = false
    );
  }

  checkCode(): void {
    this.authService.resetPasswordwithToken(this.changePasswordCode).subscribe(response => {
        this.newPassword = true;
        this.emailSent = false;
        this.correctCode = true;
      },
      error => this.correctCode = false
    );
  }

  changePassword(newPassword: string): void {
    this.authService.resetPasswordFinal(newPassword, this.changePasswordCode).subscribe(response => {
        this.newPassword = false;
        this.changedPassword = true;
        this.changedPasswordOK = true;
      },
      error => {
        this.changedPassword = true;
        this.changedPasswordOK = false;
      }
    );
  }
}
