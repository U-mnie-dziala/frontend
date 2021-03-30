import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { QuizDetailsComponent } from './components/quiz-details/quizDetails.component';
import {MainComponent} from './components/main/main.component';
import {SearcherComponent} from './components/searcher/searcher.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardUserComponent } from './components/board-user/board-user.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'quiz', component: QuizDetailsComponent },
  { path: 'search', component: SearcherComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
