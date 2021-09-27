import { Component, OnInit } from '@angular/core';
import {AnimeDetail} from "../anime-info-page/anime-info-page.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Anime} from "../components/pages";

@Component({
  selector: 'app-all-animes',
  templateUrl: './all-animes.component.html',
  styleUrls: ['./all-animes.component.css']
})
export class AllAnimesComponent implements OnInit {
  animes: Anime[] = []
  hasTrailer: boolean = false

  requisitionType: string | undefined

  requisicao: string = 'https://api.jikan.moe/v3/search/anime?q=&type=tv&order_by=score&sort=desc'

  private sub: any;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.searchAnimes()
  }

  chooseRequisition(requisitionType: string): string{
    switch (requisitionType){
      case "Popular":
        return this.requisicao = 'https://api.jikan.moe/v3/search/anime?q=&type=tv&order_by=score&sort=desc'
      case "Releasing":
        return this.requisicao = 'https://api.jikan.moe/v3/search/anime?q=&type=tv&order_by=start_date&status=airing&&sort=desc'
      case "Top":
        return this.requisicao = 'https://api.jikan.moe/v3/search/anime?q=&type=tv&order_by=score&genre=1&sort=desc'
      case "NextSeason":
        return this.requisicao = 'https://api.jikan.moe/v3/search/anime?q=&type=tv&order_by=&status=upcoming&genre=1&sort=desc'
      default:
        return ''
    }
  }

  async searchAnimes(): Promise<void> {
    this.sub = this.route.params.subscribe(params => {
      console.log("AQUIIII" + params)
    });

    const response = await fetch(this.chooseRequisition("Top"));
    const myJson = await response.json();
    this.animes = []
    for (const animeResult of myJson.results) {
      this.animes.push(new Anime(animeResult))
    }
  }
}
