// sentence-completion.component.ts
import { Component, OnInit } from '@angular/core';

interface Phrase {
  id: number;
  images: string;
  phrase: string[];
  answer: string | string[];
}

interface ExerciseData {
  question: string;
  help: string;
  phrases: Phrase[];
}

@Component({
  selector: 'app-sentence-completion',
  templateUrl: './sentence-completion.component.html',
  styleUrls: ['./sentence-completion.component.scss']
})
export class SentenceCompletionComponent implements OnInit {
  exerciseData: ExerciseData = {
    question: "Complete les phrase suivants:",
    help: "conjugu les mot entre parantise ",
    phrases: [
      {
        id: 1,
        images: "/1.jpg",
        phrase: ["je", "(peuvoir)", "?", "marche tres vite."],
        answer: "peux"
      },
      {
        id: 2,
        images: "/2.jpg",
        phrase: ["je", "(chetcher)", "?", "mes cles,", "et je", "(sortir)", "?", "de la maison."],
        answer: ["cherches", "sors"]
      }
    ]
  };

  userAnswers: { [key: number]: string[] } = {};
  validationMessages: { [key: number]: string } = {};

  ngOnInit() {
    this.initializeUserAnswers();
  }

  initializeUserAnswers() {
    this.exerciseData.phrases.forEach(phrase => {
      this.userAnswers[phrase.id] = new Array(phrase.phrase.filter(word => word === '?').length).fill('');
    });
  }

  validateAnswers(phraseId: number) {
    const phrase = this.exerciseData.phrases.find(p => p.id === phraseId);
    if (!phrase) return;

    const correctAnswers = Array.isArray(phrase.answer) ? phrase.answer : [phrase.answer];
    const userAnswers = this.userAnswers[phraseId];

    const isCorrect = correctAnswers.every((answer, index) => 
      answer.toLowerCase() === userAnswers[index].toLowerCase());

    this.validationMessages[phraseId] = isCorrect 
      ? 'Correct !' 
      : 'Incorrect. Essayez encore.';
  }

  isInputField(word: string): boolean {
    return word === '?';
  }

  getImagePath(imageName: string): string {
    return `${imageName}`; // Adjust the path as needed 
  }
  getInputValue(phraseId: number, index: number): string {
    const answerIndex = this.getAnswerIndex(phraseId, index);
    return this.userAnswers[phraseId][answerIndex] || '';
  }
  
  setInputValue(phraseId: number, index: number, value: string): void {
    const answerIndex = this.getAnswerIndex(phraseId, index);
    this.userAnswers[phraseId][answerIndex] = value;
  }
  
  private getAnswerIndex(phraseId: number, index: number): number {
    return this.exerciseData.phrases
      .find(p => p.id === phraseId)?.phrase
      ?.slice(0, index)
      ?.filter(w => w === '?')
      ?.length ?? 0;
  }
  
  
}
