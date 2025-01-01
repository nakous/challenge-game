import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface Question {
  type: string;
  question: string;
  answer: boolean;
  userAnswer?: boolean;
}

interface GroupBoolean {
  type: string;
  title: string;
  id: string;
  group: Question[];
}

interface Exercise {
  id: number;
  title: string;
  content: string;
  type: string;
  image: string;
  questions: GroupBoolean[];
}

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrl: './lecture.component.css'
})
export class LectureComponent implements OnInit {
  
  @Input() exercise!: Exercise;
  @Output() exerciseCompleted = new EventEmitter<boolean>();
  allAnswered: boolean = false;
  result: string = '';

  constructor() { }

  ngOnInit(): void { }

  
  checkAnswers(): void {
    let correct = true;
    for (let group of this.exercise.questions) {
      for (let question of group.group) {
        if (question.userAnswer === undefined) {
          correct = false;
          break;
        }
        if (question.userAnswer !== question.answer) {
          correct = false;
          break;
        }
      }
    }
    this.result = correct ? 'All answers are correct!' : 'Some answers are incorrect. Please try again.';
    this.exerciseCompleted.emit(correct);
  }

  updateAllAnswered(): void {
    this.allAnswered = this.exercise.questions.every(group =>
      group.group.every(question => question.userAnswer !== undefined)
    );
  }
}