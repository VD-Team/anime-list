import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GeneralModule } from './general';
import { AnimeListComponent } from './anime-list/anime-list.component';
import { AnimeCardComponent } from './anime-card/anime-card.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimeListComponent,
    AnimeCardComponent
  ],
  imports: [
    BrowserModule,
    GeneralModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
