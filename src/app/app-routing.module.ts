import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameEditorComponent } from './game-editor/game-editor.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'editor', component: GameEditorComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
