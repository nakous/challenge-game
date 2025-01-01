// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-calcul',
//   templateUrl: './calcul.component.html',
//   styleUrls: ['./calcul.component.css']
// })
// export class CalculComponent {
//   values? :number[];
//   exercises = {
//     question: "complete les calcul suivant :",
//     math: [
//       {
//         id: 1,
//         values: [3, 3],
//         resulta: "?",
//         answer: 6,
//         operation: "+"
//       },
//       {
//         id: 2,
//         values: ["?", 1],
//         resulta: 4,
//         answer: 5,
//         operation: "-"
//       },
//       {
//         id: 3,
//         values: [3, "?"],
//         resulta: 3,
//         answer: 1,
//         operation: "*"
//       },
//       {
//         id: 4,
//         values: [2, "?"],
//         resulta: 0,
//         answer: 2,
//         operation: "-"
//       }
//     ]
//   };

//   validationMessage: string = '';

//   validateAnswers() {
//     let allCorrect = true;
//     for (let value of this.exercise; let i = index){
      
//       if (this.values[i] !== this.exercise.answer) {
//         allCorrect = false;
//         break;
//       }
//     }
//     this.validationMessage = allCorrect ? 'All answers are correct!' : 'Some answers are incorrect. Please try again.';
//   }
// }

// Component TypeScript file (e.g., math-exercises.component.ts)
import { Component, OnInit } from '@angular/core';

interface Exercise {
  question: string;
  values: (string | number)[];
  operation: string;
  result: string | number;
  answer: number;
}

@Component({
  selector: 'app-calcul',
  templateUrl: './calcul.component.html',
  styleUrls: ['./calcul.component.css']
})
export class CalculComponent implements OnInit {
  // exercises: Exercise[] = [
  //   // Add your exercises here
  //   // {
  //   //   question: 'Solve the following addition:',
  //   //   values: [5, '?', 3],
  //   //   operation: '+',
  //   //   result: 10,
  //   //   answer: 2
  //   // },
  //   {
  //     question: 'Solve the following addition:',
  //     values: [5, 2, 3],
  //     operation: '+',
  //     result: '?',
  //     answer: 2
  //   },
  //   // Add more exercises...
  // ];
  exercises: { question: string, math: Exercise[] } = {
    question: 'Solve the following exercises:',
    math: [
      {
        question: '',
        values: [5, 2, 3],
        operation: '+',
        result: '?',
        answer: 10
      },
      {
        question: '',
        values: ['?', 2],
        operation: '*',
        result: '10',
        answer: 5
      },
      {
        question: '',
        values: [5,10,30,100, 3],
        operation: '-',
        result: '?',
        answer: 2
      },
      // Add more exercises...
    ]
  };
  userAnswers: { [key: number]: number | undefined } = {};
  validationMessage: string = '';

  ngOnInit() {
    this.initializeUserAnswers();
  }

  initializeUserAnswers() {
    this.exercises.math.forEach((_, index) => {
      this.userAnswers[index] = undefined;
    });
  }

  validateAnswers() {
    let allCorrect = true;
    this.exercises.math.forEach((exercise, index) => {
      if (this.userAnswers[index] !== exercise.answer) {
        allCorrect = false;
      }
    });
    this.validationMessage = allCorrect 
      ? 'Bravo ! Toutes les réponses sont correctes !' 
      : 'Certaines réponses sont incorrectes. Veuillez réessayer.';
  }

  isResultInput(exercise: Exercise): boolean {
    return exercise.result === '?';
  }
}
