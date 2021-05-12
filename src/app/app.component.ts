import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import {Router} from '@angular/router';
import {UserHistoryService} from './services/user-history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  userId?: number;
  toolbarVariable = 'toolbar';
  title = 'Tiara Przydziału';

  constructor(public router: Router, private tokenStorageService: TokenStorageService, private userHistoryService: UserHistoryService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
      this.userId = user.id;

      this.userHistoryService.username = this.username;
      this.userHistoryService.userId = this.userId;

    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  myFunction(): void {
    if (this.toolbarVariable === 'toolbar'){
      this.toolbarVariable = 'toolbarresponsive';
    }
    else {
      this.toolbarVariable = 'toolbar';
    }
  }

}
