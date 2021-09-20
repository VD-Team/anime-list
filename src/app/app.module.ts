import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageFavoritosComponent, PageHomeComponent, PageNotFoundComponent, PagePerfilComponent } from './components/pages';
import { AnimeInfoPageComponent } from './anime-info-page/anime-info-page.component';
import { FooterComponent, HeaderComponent } from './components/general';
import { AnimeCardComponent } from './components/anime-card';

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
    PageFavoritosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
