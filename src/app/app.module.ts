import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FilterPipe, PageFavoritosComponent, PageHomeComponent, PageNotFoundComponent, PagePerfilComponent } from './components/pages';
import { AnimeInfoPageComponent } from './anime-info-page/anime-info-page.component';
import { FooterComponent, HeaderComponent } from './components/general';
import { AnimeCardComponent } from './components/anime-card';
import { FormsModule } from '@angular/forms';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AnimeCardComponent,
    PageHomeComponent,
    PageNotFoundComponent,
    AnimeInfoPageComponent,
    PagePerfilComponent,
    PageFavoritosComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
