import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { QuizComponent } from './components/quiz/quiz.component';
import {MainComponent} from './components/main/main.component';

const routes: Routes = [
  { path: 'quiz', component: QuizComponent },
  { path: '', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
