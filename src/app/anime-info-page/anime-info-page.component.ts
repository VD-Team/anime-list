import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-anime-info-page',
  templateUrl: './anime-info-page.component.html',
  styleUrls: ['./anime-info-page.component.css']
})
export class AnimeInfoPageComponent implements OnInit, OnDestroy {

  anime: AnimeDetail | undefined
  id: number | undefined
  hasTrailer: boolean = false
  hasFavoriteForm: boolean = true
  private sub: any;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router, private data: DataService) { }

  ngOnInit(): void {
    this.data.currentWindowState.subscribe(value => {
      this.hasFavoriteForm = value
    })
    this.searchAnime()
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async searchAnime(): Promise<void> {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    const response = await fetch(`https://api.jikan.moe/v3/anime/${this.id}`);
    const myJson = await response.json();
    if(myJson.error) {
      await this.router.navigate(['**']);
    }
    this.anime = new AnimeDetail(myJson, this.sanitizer.bypassSecurityTrustResourceUrl(myJson.trailer_url))
    this.hasTrailer = myJson.trailer_url != null
  }
}

//ANIME RECEBIDO PELA API
export class AnimeDetail {
  aired: Aired
  airing: boolean
  duration: string
  ending_themes: [string]
  episodes: number
  external_links: [Link]
  genres: [Genre]
  opening_themes: [string]
  popularity: number
  rank: number
  score: number
  title: string
  trailer_url: SafeResourceUrl
  image_url: string
  studios: [Studio]
  synopsis: string
  type: string
  title_english: string
  title_japanese: string

  genresToString: [string] = [""]
  studiosToString: [string] = [""]
  status: string

  constructor(json: any, trailer_url: SafeResourceUrl) {
    this.airing = json.airing
    this.title = json.title
    this.image_url = json.image_url
    this.synopsis = json.synopsis
    this.ending_themes = json.ending_themes
    this.episodes = json.episodes
    this.external_links = json.external_links
    this.genres = json.genres
    this.status = json.airing ?  "Lançando" : "Completo"
    this.trailer_url = json.trailer_url
    this.aired = new Aired(json.aired.string)
    this.duration = json.duration
    this.opening_themes = json.opening_themes
    this.score = json.score
    this.popularity = json.popularity
    this.rank = json.rank
    this.studios = json.studios
    this.title_english = json.title_english
    this.title_japanese = json.title_japanese
    this.type = json.type
    this.trailer_url = trailer_url
    this.parseGenres()
    this.parseStudios()
  }

  parseStudios(){
    let parsedStudios = [];

    for (let i = 0; i < this.studios.length; i++) {
      const newStudio = new Studio(this.studios[i].name)
      parsedStudios.push(newStudio)
    }
    //ATRIBUI OS ESTUDIOS AO ARRAY PRINCIPAL DE ESTUDIOS
    for (let i = 0; i < parsedStudios.length; i++) {
      this.studios[i] = parsedStudios[i]
    }
    //REMOVE O PRIMEIRO ITEM DO ARRAY, QUE ATUALMENTE É ""
    this.studiosToString.shift()
    //PREENCHIMENTO DO ARRAY DE STRINGS DE ESTUDIOS
    for (let i = 0; i < this.studios.length; i++) {
      this.studiosToString.push(this.studios[i].name)
    }
  }

  parseGenres(){
    let parsedGenres = [];

    for (let i = 0; i < this.genres.length; i++) {
      const newGenre = new Genre(this.genres[i].name)
      parsedGenres.push(newGenre)
    }
    //ATRIBUI OS GÊNEROS AO ARRAY PRINCIPAL DE GÊNEROS
    for (let i = 0; i < parsedGenres.length; i++) {
      this.genres[i] = parsedGenres[i]
    }
    //REMOVE O PRIMEIRO ITEM DO ARRAY, QUE ATUALMENTE É ""
    this.genresToString.shift()
    //PREENCHIMENTO DO ARRAY DE STRINGS DE GÊNERO
    for (let i = 0; i < this.genres.length; i++) {
      this.genresToString.push(this.genres[i].name)
    }
  }
}

//CLASSE GÊNERO PARA O ANIME
class Genre{
  name: string

  constructor(name: string) {
    this.name = name
  }
}

class Aired{
  string: string

  constructor(string: string) {
    this.string = string
  }
}

class Studio{
  name: string

  constructor(name: string) {
    this.name = name
  }
}

class Link{
  name: string
  url: SafeUrl

  constructor(name: string, url: SafeUrl) {
    this.name = name
    this.url = url
  }
}
