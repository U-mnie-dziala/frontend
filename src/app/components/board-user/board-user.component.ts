import {Component, Input, OnInit} from '@angular/core';
import { UserService } from '../../services/user.service';
import {UserHistoryService} from '../../services/user-history.service';
import {QuizHistory} from '../../interfaces/quiz-history';
import {SearchService} from '../../services/search.service';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionHistory} from '../../interfaces/question-history';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  userHistory: QuizHistory[];
  errMessege: string;
  publicLink = 'https://tiara-przydzialu.netlify.app/historia/';
  uuid: string;
  @Input() userName: string;
  @Input() userId: number;
  gettingHistoryFailed = false;

  constructor(private userHistoryService: UserHistoryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.uuid = params.UUID;
    });
    if (this.uuid){
      this.getUserHistoryByUUID();
    }
    else {
      this.getUserHistory();
    }
  }


  private getUserHistoryByUUID(): void {
    this.userHistoryService.getUserHistoryByUUID(this.uuid).subscribe(
      data => {

        this.userHistory = [];
        this.userHistory.push(JSON.parse(data));
        this.userHistory[0].quiz = JSON.parse(JSON.parse(data).quiz);
      },
      err => {
        this.errMessege = JSON.parse(err.error).message;
      }
    );
  }

  private getUserHistory(): void {
    this.userHistoryService.getUserHistory().subscribe(
      data => {
        this.userHistory = JSON.parse(data);
        for (let i = 0; i < this.userHistory.length; i++) {
          this.userHistory[i].quiz = JSON.parse(JSON.parse(data)[i].quiz);
          this.gettingHistoryFailed = false;
        }
      },
      err => {
        if (err.status === 401){
          this.router.navigateByUrl('/zaloguj/re');
        }
        this.errMessege = JSON.parse(err.error).message;
        this.gettingHistoryFailed = true;
      }
    );
  }

  showResults(history: QuizHistory): void {
    this.userHistoryService.quiz = history.quiz;
  }

  parseResponses(questionHistory: QuestionHistory): string {

    let returnVal = '';
    returnVal += questionHistory.answersForHistory.forEach(answer => answer.text) + ', ';

    return returnVal;
  }
}
