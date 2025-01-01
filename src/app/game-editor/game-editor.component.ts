// game-editor.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
 
import { Game } from  '../models/game.model'
import { Option } from  '../models/option.model'
import { TypeGame } from '../models/type-game.model';

@Component({
  selector: 'app-game-editor',
  templateUrl: './game-editor.component.html',
  styleUrls: ['./game-editor.component.css']
})
export class GameEditorComponent implements OnInit {
  gameForm: FormGroup;
  typeGameOptions = Object.values(TypeGame);
  previewImage: string | ArrayBuffer | null = null;
  jsonOutput: string = '';
  showJsonOutput: boolean = false;

  constructor(private fb: FormBuilder) {
    this.gameForm = this.fb.group({
      typeGame: [TypeGame.MCQ, Validators.required],
      desktopImage: ['', Validators.required],
      mobileImage: ['', Validators.required],
      question: ['', Validators.required],
      explain: ['', Validators.required],
      options: this.fb.array([])
    });
  }

  ngOnInit() {
    this.addOption();
  }

  get options() {
    return this.gameForm.get('options') as FormArray;
  }

  addOption() {
    const optionGroup = this.fb.group({
      text: ['', Validators.required],
      position: this.fb.group({
        x: [0, Validators.required],
        y: [0, Validators.required]
      }),
      answer: ['']
    });
    this.options.push(optionGroup);
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  onImageUpload(event: Event, imageType: 'desktop' | 'mobile') {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target?.result as string;
        this.gameForm.patchValue({ [`${imageType}Image`]: file.name });
      };
      reader.readAsDataURL(file);
    }
  }

  setOptionPosition(event: MouseEvent, index: number) {
    const rect = (event.target as HTMLImageElement).getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);
    this.options.at(index).get('position')?.patchValue({ x, y });
  }

  async generateJson() {
    // if (this.gameForm.valid) {
      const formValue = this.gameForm.value;
      const gameData = {
        image: {
          desktop: formValue.desktopImage,
          mobile: formValue.mobileImage
        },
        question: formValue.question,
        explain: formValue.explain,
        typeGame: formValue.typeGame,
        options: formValue.options.map((opt: any) => new Option({
          text: opt.text,
          position: opt.position,
          answer: opt.answer
        }))
      };

      const game = new Game(gameData);
      const isValid = true; //await game.gameDataValidator();

      if (isValid) {
        this.jsonOutput = JSON.stringify(game, null, 2);
        this.showJsonOutput = true;
      } else {
        alert('Game data is invalid. Please check your inputs.');
      }
    // } else {
    //   alert('Please fill all required fields');
    // }
  }
}