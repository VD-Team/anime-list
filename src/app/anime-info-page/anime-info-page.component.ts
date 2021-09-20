import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-anime-info-page',
  templateUrl: './anime-info-page.component.html',
  styleUrls: ['./anime-info-page.component.css']
})
export class AnimeInfoPageComponent implements OnInit, OnDestroy {

  anime: Anime | undefined
  id: number | undefined
  hasTrailer: boolean = false
  private sub: any;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit(): void {
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
      this.router.navigate(['**']);
    }
    this.anime = new Anime(myJson, this.sanitizer.bypassSecurityTrustResourceUrl(myJson.trailer_url))
    this.hasTrailer = myJson.trailer_url == null ? false:true
    console.log(myJson.aired)
    console.log(this.anime)
  }
}

//ANIME RECEBIDO PELA API
class Anime {
  aired: Aired
  airing: boolean
  duration: string
  episodes: number
  genres: [Genre]
  popularity: number
  rank: number
  score: number
  title: string
  trailer_url: SafeResourceUrl
  image_url: string
  synopsis: string

  genresToString: [string] = [""]
  status: string

  constructor(json: any, trailer_url: SafeResourceUrl) {
    this.airing = json.airing
    this.title = json.title
    this.image_url = json.image_url
    this.synopsis = json.synopsis
    this.episodes = json.episodes
    this.genres = json.genres
    this.status = json.airing ?  "Lançando" : "Completo"
    this.trailer_url = json.trailer_url
    this.aired = new Aired(json.aired.string)
    this.duration = json.duration
    this.score = json.score
    this.popularity = json.popularity
    this.rank = json.rank
    this.trailer_url = trailer_url
    this.parseGenres()
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
