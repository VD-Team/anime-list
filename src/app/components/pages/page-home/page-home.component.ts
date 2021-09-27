import { AfterViewInit, Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {Router} from "@angular/router";
@Pipe({ name: 'searchFilter' })
export class FilterPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
  transform(items: Anime[], searchText: string): Anime[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    console.log(searchText)
    return items.filter(it => {
      return it.title.toLowerCase().includes(searchText.toLowerCase())
    });
  }
}

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit, AfterViewInit {

  requisitionType: string = "Popular"

  popularAnimes: Anime[] = []
  releasingAnimes: Anime[] = []
  topAnimes: Anime[] = []
  nextSeasonAnimes: Anime[] = []

  apiPopularAnimes: string = 'https://api.jikan.moe/v3/search/anime?q=&type=tv&limit=5&order_by=score&sort=desc'
  apiReleasingAnimes: string = 'https://api.jikan.moe/v3/search/anime?q=&type=tv&limit=5&order_by=start_date&status=airing&&sort=desc'
  apiTopAnimes: string = 'https://api.jikan.moe/v3/search/anime?q=&type=tv&limit=5&order_by=score&genre=1&sort=desc'
  apiNextSeasonAnimes: string = 'https://api.jikan.moe/v3/search/anime?q=&type=tv&limit=5&order_by=&status=upcoming&genre=1&sort=desc'

  constructor(private data: DataService, private router: Router) { }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => {
      let messageText = message
      console.log(messageText)
      if(messageText.length > 2) {
        this.searchAnimesByName(message)
      } else {
        this.searchAnimes(this.apiPopularAnimes, "popular")
        this.searchAnimes(this.apiReleasingAnimes, "releasing")
        this.searchAnimes(this.apiTopAnimes, "top")
        this.searchAnimes(this.apiNextSeasonAnimes, "season")
      }
    })
  }

  goToPage(name: string): void{
    if(this.requisitionType) {
      this.router.navigate([`${name}`, this.requisitionType]);
    } else {
      console.log("Erro")
    }
  }

  async searchAnimes(requisicao: string, type: string): Promise<void> {
    const response = await fetch(requisicao);
    const myJson = await response.json();
    switch (type){
      case "popular":
        this.popularAnimes = []
        for (const animeResult of myJson.results) {
          this.popularAnimes.push(new Anime(animeResult))
        }
        break
      case "releasing":
        this.releasingAnimes = []
        for (const animeResult of myJson.results) {
          this.releasingAnimes.push(new Anime(animeResult))
        }
        break
      case "top":
        this.topAnimes = []
        for (const animeResult of myJson.results) {
          this.topAnimes.push(new Anime(animeResult))
        }
        break
      case "season":
        this.nextSeasonAnimes = []
        for (const animeResult of myJson.results) {
          this.nextSeasonAnimes.push(new Anime(animeResult))
        }
        break
      default:
        break
    }
  }

  async searchAnimesByName(animeName: string): Promise<void> {
    const response = await fetch(`https://api.jikan.moe/v3/search/anime?q=${animeName}&page=1&type=tv`);
    const myJson = await response.json();
    this.popularAnimes = []
    for (const animeResult of myJson.results) {
      this.popularAnimes.push(new Anime(animeResult))
    }
  }

  ngAfterViewInit() {

  }
}

export class Anime {
  title: string
  image_url: string
  score: number
  id: number

  constructor(json: any) {
    this.title = json.title
    this.image_url = json.image_url
    this.score = json.score
    this.id = json.mal_id
  }
}
