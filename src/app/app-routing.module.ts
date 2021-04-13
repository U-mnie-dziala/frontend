import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { QuizDetailsComponent } from './components/quiz-details/quizDetails.component';
import {MainComponent} from './components/main/main.component';
import {SearcherComponent} from './components/searcher/searcher.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import {ProfessionSearcherComponent} from './components/profession-searcher/profession-searcher.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'quiz', component: QuizDetailsComponent },
  { path: 'quiz/:UUID', component: QuizDetailsComponent },
  { path: 'wyszukaj/grupy', component: SearcherComponent },
  { path: 'wyszukaj/grupy/:searchGroupText', component: SearcherComponent },
  { path: 'wyszukaj/zawody', component: ProfessionSearcherComponent },
  { path: 'wyszukaj/zawody/:searchProffesionText', component: ProfessionSearcherComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'historia', component: BoardUserComponent },
  { path: 'historia/:UUID', component: BoardUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
