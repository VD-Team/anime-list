import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimeCardComponent } from './anime-card';
import { AnimeListComponent } from './anime-list';

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
