import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { QuizDetailsComponent } from './components/quiz-details/quizDetails.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SearcherComponent } from './components/searcher/searcher.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { AuthInterceptor } from './helpers/auth.interceptors';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfessionSearcherComponent } from './components/profession-searcher/profession-searcher.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    QuizDetailsComponent,
    MainComponent,
    SearcherComponent,
    LoginComponent,
    RegisterComponent,
    BoardUserComponent,
    ProfileComponent,
    ProfessionSearcherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatPaginatorModule
  ],
  providers: [AuthInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
