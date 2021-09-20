import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AnimeCardComponent, FooterComponent, HeaderComponent, PageHomeComponent, PageNotFoundComponent } from './components';
import { AnimeInfoPageComponent } from './anime-info-page/anime-info-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AnimeCardComponent,
    PageHomeComponent,
    PageNotFoundComponent,
    AnimeInfoPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
