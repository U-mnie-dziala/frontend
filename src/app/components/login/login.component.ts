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

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private userHistoryService: UserHistoryService, private router: Router) { }

  ngOnInit(): void {
    if (this.router.url === '/zaloguj/re'){
      this.tokenStorage.signOut();
      this.message = 'Twoja sesja wygasła, zaloguj się ponownie.';
      this.isTokenExpired = true;
    }
    else if (this.tokenStorage.getToken()) {
      console.log(this.tokenStorage.getUser());
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
}
