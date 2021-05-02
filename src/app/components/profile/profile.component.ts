import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  private newEmail: string;
  private newPass: string;
  private currentPass: string;

  error = false;
  errMess: string;
  success = false;
  messege: string;

  constructor(private token: TokenStorageService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.user = this.token.getUser();
  }

  newEmailEvent(newEmail: string): void {
    this.newEmail = newEmail;
  }

  currentPassEvent(currentPass: string): void {
    this.currentPass = currentPass;
  }

  changeEmail(): void {
    if (!this.newEmail) {
      this.error = true;
      this.errMess = 'Wpisz nowy adres e-mail, aby go ustawić.';
      return;
    }
    if (!this.currentPass) {
      this.error = true;
      this.errMess = 'Wpisz obecne hasło, aby zmienić adres e-mail.';
      return;
    }
    console.log(this.newEmail + '/' + this.currentPass);
    this.profileService.changeEmail(this.user.id, this.currentPass, this.newEmail).subscribe(resp => {
          this.success = true;
          this.error = false;
          this.messege = resp;
      },
      err => {
        this.success = false;
        this.error = true;
        this.errMess = 'Serwer zwrócił błąd. Nieprawidłowy lub zajęty adres email.';
      }
    );
  }

  newPassEvent(newPass: string): void {
    this.newPass = newPass;
  }

  changePass(): void {
    if (!this.currentPass) {
      this.error = true;
      this.success = false;
      this.errMess = 'Wpisz obecne hasło, aby je zmienić.';
      return;
    }
    if (!this.newPass) {
      this.error = true;
      this.success = false;
      this.errMess = 'Wpisz hasło, które chcesz ustawić.';
      return;
    }
    this.profileService.changePassword(this.user.id, this.currentPass, this.newPass).subscribe(resp => {
          this.success = true;
          this.error = false;
          this.messege = resp;
        },
        err => {
          this.success = false;
          this.error = true;
          this.errMess = 'Serwer zwrócił błąd. Hasło nieprawidłowe.';
        }
    );
  }

  deleteAccount(): void {
    if (!this.currentPass) {
      this.error = true;
      this.success = false;
      this.errMess = 'Wpisz hasło, aby usunąć konto';
      return;
    }
    this.profileService.deleteAccount(this.user.id, this.currentPass).subscribe(resp => {
          this.success = true;
          this.error = false;
          this.messege = resp + ' ( ͡° ͜ʖ ͡°)';
          setTimeout(() => this.token.signOut(), 5000);
        },
        err => {
          this.success = false;
          this.error = true;
          this.errMess = 'Serwer zwrócił błąd. Hasło nieprawidłowe.';
        }
    );
  }
}
