// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-reading',
//   templateUrl: './reading.component.html',
//   styleUrl: './reading.component.css'
// })
// export class ReadingComponent {

// }



import { Component, OnInit } from '@angular/core';
interface IWindow extends Window {
  webkitSpeechRecognition: any;
}
@Component({
  selector: 'app-reading',
  template: `
    <div class="reading-test">
      <h2>{{ data.question }}</h2>
      <p class="help-text">{{ data.help }}</p>
      <p class="phrase">{{ data.phrases }}</p>
      <button (click)="playAudio()" [disabled]="isPlaying">Écouter</button>
      <button (click)="startListening()" [disabled]="isListening">Lire</button>
      <p *ngIf="result" [ngClass]="{'correct': isCorrect, 'incorrect': !isCorrect}">
        {{ result }}
      </p>
    </div>
  `,
  styles: [`
    .reading-test {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .help-text {
      color: #666;
      font-style: italic;
    }
    .phrase {
      font-size: 18px;
      margin: 20px 0; 
    }
    button {
      margin-right: 10px;
      padding: 10px 20px;
    }
    .correct { color: green; }
    .incorrect { color: red; }
  `]
})
export class ReadingComponent implements OnInit {
  data = {
    question: "Lire le Text suivant:",
    help: "click sur le bouton ecouter e lire le texte  apres le systeme valide votre prenonciation",
    phrases: "je m'appele perplexity"
  };

  isPlaying = false;
  isListening = false;
  result = '';
  isCorrect = false;

  ngOnInit() {}

  playAudio() {
    this.isPlaying = true;
    const utterance = new SpeechSynthesisUtterance(this.data.phrases);
    utterance.lang = 'fr-FR';
    utterance.onend = () => {
      this.isPlaying = false;
    };
    speechSynthesis.speak(utterance);
  }

  startListening() {
    this.isListening = true;
    this.result = '';
    this.isCorrect = false;

    if ('webkitSpeechRecognition' in window) {
      const { webkitSpeechRecognition } = window as IWindow & typeof globalThis;
      const recognition = new webkitSpeechRecognition();
      
      recognition.lang = 'fr-FR';
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        this.result = transcript;
        this.isCorrect = this.data.phrases.toLowerCase() === transcript;
      };
      recognition.onend = () => {
        this.isListening = false;
      };
      recognition.start();
    } else {
      alert("La reconnaissance vocale n'est pas prise en charge par votre navigateur.");
      this.isListening = false;
    }
  }
}
