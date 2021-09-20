import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-anime-info-page',
  templateUrl: './anime-info-page.component.html',
  styleUrls: ['./anime-info-page.component.css']
})
export class AnimeInfoPageComponent implements OnInit, OnDestroy {

  anime: Anime | undefined
  id: number | undefined
  private sub: any;

  dangerousUrl: string
  videoUrl: SafeResourceUrl

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.dangerousUrl = 'https://www.youtube.com/embed/qig4KOK2R2g?enablejsapi=1&wmode=opaque&autoplay=1'
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousUrl)
  }

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

    const response = await fetch(`https://api.jikan.moe/v3/anime/${1}`);
    const myJson = await response.json();
    this.anime = new Anime(myJson.title, myJson.image_url, myJson.synopsis, myJson.airing, myJson.episodes, myJson.genres, ["null"], myJson.airing ?  "Lançando" : "Completo", myJson.trailer_url, myJson.aired, myJson.duration, myJson.score, myJson.popularity, myJson.rank)
    console.log(myJson.aired)
    console.log(this.anime)
    console.log(myJson)
  }
}

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
  trailer_url: string
  image_url: string
  synopsis: string

  genresToString: [string]
  status: string

  constructor(title: string, image_url: string, synopsis: string, airing: boolean, episodes: number, genres: [Genre], genresToString: [string], status: string, trailer_url: string, aired: Aired, duration: string, score: number, popularity: number, rank: number) {
    this.airing = airing
    this.title = title
    this.image_url = image_url
    this.synopsis = synopsis
    this.episodes = episodes
    this.genres = genres
    this.genresToString = genresToString
    this.status = status
    this.trailer_url = trailer_url
    this.aired = new Aired(aired.string)
    this.duration = duration
    this.score = score
    this.popularity = popularity
    this.rank = rank
    this.parseGenres()
  }

  parseDate(){

  }

  parseGenres(){
    let parsedGenres = [];

    for (let i = 0; i < this.genres.length; i++) {
      const newGenre = new Genre(this.genres[i].name)
      parsedGenres.push(newGenre)
    }
    for (let i = 0; i < parsedGenres.length; i++) {
      this.genres[i] = parsedGenres[i]
    }
    this.genresToString.shift()
    for (let i = 0; i < this.genres.length; i++) {
      this.genresToString.push(this.genres[i].name)
    }
    console.log(this.genresToString.join(', '))
  }
}

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
