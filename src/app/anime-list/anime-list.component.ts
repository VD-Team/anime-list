import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css']
})

export class AnimeListComponent implements OnInit {
  animes: Anime[] = []

  constructor() { }

  ngOnInit(): void {
    this.userAction()
  }

  async userAction(): Promise<void>{
    const response = await fetch('https://api.jikan.moe/v3/search/anime?q=type=TV&page=1');
    const myJson = await response.json();

    for (const animeResult of myJson.results) {
      this.animes.push(new Anime(animeResult.title, animeResult.synopsis, animeResult.image_url))
    }
  }
}

class Anime{
  synopsis: string
  title: string
  image_url: string

  constructor(title: string, synopsis: string, image_url: string) {
    this.title = title
    this.synopsis = synopsis
    this.image_url = image_url
  }
}
