import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimeCardComponent } from './anime-card/anime-card.component';
import { AnimeListComponent } from './anime-list/anime-list.component';

@NgModule({
  declarations: [
    AnimeCardComponent, 
    AnimeListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AnimeCardComponent,
    AnimeListComponent
  ]
})
export class AnimesModule { }
