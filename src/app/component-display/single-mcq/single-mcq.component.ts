import { Component, Input, Output, EventEmitter } from '@angular/core';

interface McqOption {
  id: string;
  text: string;
}

interface McqExercise {
  id: number;
  title: string;
  question: string;
  type: string;
  image?: string;
  options: McqOption[];
  correctAnswer: string;
}

@Component({
  selector: 'app-single-mcq',
  templateUrl: './single-mcq.component.html',
  styleUrls: ['./single-mcq.component.css']
})

export class SingleMcqComponent {
  @Input() exercise!: McqExercise;
  @Output() answerSubmitted = new EventEmitter<boolean>();

  selectedAnswer!: string;

  onSelectionChange(optionId: string) {
    this.selectedAnswer = optionId;
    const isCorrect = this.isCorrect();
    this.answerSubmitted.emit(isCorrect);
  }

  isCorrect(): boolean {
    return this.selectedAnswer === this.exercise.correctAnswer;
  }
}
