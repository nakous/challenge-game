import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servises/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  exercise = {
    id: 1,
    title: "UNE SEMAINE DU PETIT ELFE FERME-L’OEIL",
    content: "Dans le monde entier, il n’est personne qui sache autant d’histoires que Ole Ferme-l’oeil. Lui, il sait raconter... Vers le soir, quand les enfants sont assis sagement à table ou sur leur petit tabouret, Ole Ferme-l’oeil arrive, il monte sans bruit l’escalier, il marche sur ses bas, il ouvre doucement la porte et pfuitt ! il jette du lait doux dans les yeux des enfants, un peu seulement, mais assez cependant pour qu’ils ne puissent plus tenir les yeux ouverts ni par conséquent le voir ; il se glisse juste derrière eux et leur souffle dans la nuque, alors leur tête devient lourde, lourde, mais ça ne fait aucun mal, car Ole Ferme-l’oeil ne veut que du bien aux enfants, il veut seulement qu’ils se tiennent tranquilles, et ils le sont surtout quand on les a mis au lit. Quand les enfants dorment, Ole Ferme-l’oeil s’assied sur leur lit. Il est bien habillé, son habit est de soie, mais il est impossible d’en dire la couleur, il semble vert, rouge ou bleu selon qu’il se tourne, il tient un parapluie sous chaque bras, l’un décoré d’images, et celui-là il l’ouvre au-dessus des enfants sages qui rêvent alors toute la nuit des histoires ravissantes, et sur l’autre parapluie il n’y a rien. Il l’ouvre au-dessus des enfants méchants, alors ils dorment si lourdement que le matin en s’éveillant ils n’ont rien rêvé du tout.",
    type: "lecture",
    image: "imgs/luc1.png",
    questions: [
      {
        type: "group-boolean",
        title: "Mettre V pour Vrai et F pour Faux.",
        id: "1",
        group: [
          {
            type: "true-false",
            question: "Les enfants restent debout à table.",
            answer: true
          },
          {
            type: "true-false",
            question: "Ole Ferme-l’oeil monte les escaliers bruyamment.",
            answer: true
          },
          {
            type: "true-false",
            question: "Ole Ferme-l’oeil souffle sur la nuque des enfants.",
            answer: true
          },
          {
            type: "true-false",
            question: "Ole Ferme-l’oeil possède 2 parapluies.",
            answer: true
          },
          {
            type: "true-false",
            question: "Le parapluie sans images est pour les enfants méchants.",
            answer: false
          }
        ]
      }
    ]
  };

  singleMcq = {
    id: 1,
    title: "Identification du verbe",
    question: "Dans la phrase « Le facteur trie le courrier. », quel est le verbe ?",
    type: "single-mcq",
    image: "", // Optional, remove if not needed
    options: [
      { id: 'facteur', text: 'facteur' },
      { id: 'courrier', text: 'courrier' },
      { id: 'trie', text: 'trie' }
    ],
    correctAnswer: 'trie'
  };
  
  onExerciseCompleted(isCorrect: boolean) {
    if (isCorrect) {
      console.log('Congratulations! All answers are correct.');
      // You can add more logic here, such as:
      // - Showing a success message
      // - Updating the user's score
      // - Moving to the next exercise
    } else {
      console.log('Some answers are incorrect. Please try again.');
      // You can add more logic here, such as:
      // - Showing an encouragement message
      // - Offering hints
      // - Tracking the number of attempts
    }
  }
  onAnswerSelected(isCorrect: boolean ) {
    if (isCorrect) {
      console.log('Congratulations! All answers are correct.');
      // You can add more logic here, such as:
      // - Showing a success message
      // - Updating the user's score
      // - Moving to the next exercise
    } else {
      console.log('Some answers are incorrect. Please try again.');
      // You can add more logic here, such as:
      // - Showing an encouragement message
      // - Offering hints
      // - Tracking the number of attempts
    }
  }
  
  ngOnInit(): void {
    // console.log(this.gameData);
    // this.fetchGames();
  }
  constructor(private apiService: ApiService) {}

  fetchGames() {
    this.apiService.getGames().subscribe(games => {
      console.log('Games:', games);
    });
  }

/*
<app-drag-drop [jsonData]="gameData"></app-drag-drop>
  title = 'noso';
  gameData = new Game({
    image: {
      desktop: "1.jpg",
      mobile: "1.jpg"
    },
    question: "Ajouter les bloc sur les zones vide",
    explain: "explain ce jeu",
    typeGame: "dragdrop",
    options: [
      { text: "choose text 1 sffdsf ", position: { x: 30, y: 40 } },
      { text: "choose text 2", position: { x: 200, y: 200 } },
      { text: "choose text 3", position: { x: 400, y: 60 } },
    ]
  });

  settengs = {
    "heroImages": {
      "desktop": {
        "width": 1280,
        "height": 720,
        "description": "Hero image for desktop devices"
      },
      "mobile": {
        "width": 360,
        "height": 200,
        "description": "Hero image for mobile devices"
      }
    }
  };*/
}
