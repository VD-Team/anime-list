import { AfterViewInit, Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HeaderComponent } from '../../general';
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

  animes: Anime[] = []

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => { 
      let messageText = message
      console.log(messageText)
      if(messageText.length > 2) {
        this.searchAnimesByName(message)
      } else {
        this.searchAnimes()
      }
    })
  }

  async searchAnimes(): Promise<void> {
    const response = await fetch('https://api.jikan.moe/v3/search/anime?type=tv&order_by=score&descending');
    const myJson = await response.json();
    this.animes = []
    for (const animeResult of myJson.results) {
      this.animes.push(new Anime(animeResult))
    }
  }

  async searchAnimesByName(animeName: string): Promise<void> {
    const response = await fetch(`https://api.jikan.moe/v3/search/anime?q=${animeName}&page=1&type=tv`);
    const myJson = await response.json();
    this.animes = []
    for (const animeResult of myJson.results) {
      this.animes.push(new Anime(animeResult))
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
