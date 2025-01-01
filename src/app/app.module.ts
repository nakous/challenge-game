import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropComponent } from './component-display/drag-drop/drag-drop.component';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CreateGameComponent } from './create-game/create-game.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModalComponent } from './material-modal/material-modal.component';
import { GameEditorComponent } from './game-editor/game-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { QuizImageComponent } from './component-display/quiz-image/quiz-image.component';
import { DragDropEditComponent } from './component-edit/drag-drop-edit/drag-drop-edit.component';
import { QuizImageEditComponent } from './component-edit/quiz-image-edit/quiz-image-edit.component';
import {  HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { LectureComponent } from './component-display/lecture/lecture.component';
import { SingleMcqComponent } from './component-display/single-mcq/single-mcq.component';
import { MatchingGameComponent } from './component-display/matching-game/matching-game.component';
import { MatchingTextComponent } from './component-display/matching-text/matching-text.component';
import { CalculComponent } from './component-display/calcul/calcul.component';
import { SentenceCompletionComponent } from './component-display/sentence-completion/sentence-completion.component';
import { ReadingComponent } from './component-display/reading/reading.component';


@NgModule({
  declarations: [
    AppComponent,
    DragDropComponent,
    CreateGameComponent,
    MaterialModalComponent,
    GameEditorComponent,
    HomeComponent,
    QuizImageComponent,
    DragDropEditComponent,
    QuizImageEditComponent,
    LectureComponent,
    SingleMcqComponent,
    MatchingGameComponent,
    MatchingTextComponent,
    CalculComponent,
    SentenceCompletionComponent,
    ReadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    DragDropModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule ,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
