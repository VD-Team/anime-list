import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  animes: Anime[] = []

  constructor() { }

  ngOnInit(): void {
    this.searchAnimes()
  }

  async searchAnimes(): Promise<void> {
    const response = await fetch('https://api.jikan.moe/v3/search/anime?q=type=TV&page=1');
    const myJson = await response.json();

    for (const animeResult of myJson.results) {
      this.animes.push(new Anime(animeResult.title, animeResult.image_url))
    }
  }
}

class Anime {

  title: string
  image_url: string

  constructor(title: string, image_url: string) {
    this.title = title
    this.image_url = image_url
  }
}
