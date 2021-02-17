import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { QuizDetailsComponent } from './components/quiz-details/quizDetails.component';
import {MainComponent} from './components/main/main.component';

const routes: Routes = [
  { path: 'quiz', component: QuizDetailsComponent },
  { path: '', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
