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
    const response = await fetch('https://api.jikan.moe/v3/search/anime?type=tv&order_by=score&ascending');
    const myJson = await response.json();

    for (const animeResult of myJson.results) {
      this.animes.push(new Anime(animeResult.title, animeResult.image_url, animeResult.score))
    }
  }
}

class Anime {

  title: string
  image_url: string
  score: number

  constructor(title: string, image_url: string, score: number) {
    this.title = title
    this.image_url = image_url
    this.score = score
  }
}
