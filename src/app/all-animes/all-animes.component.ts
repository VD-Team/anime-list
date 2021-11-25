import { Component, OnInit } from '@angular/core';
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

  requisitionType: number | undefined

  title: string = ""

  requisicao: string = 'https://api.jikan.moe/v3/search/anime?q=&type=tv&order_by=score&sort=desc'

  private sub: any;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.searchAnimes()
  }

  chooseRequisition(requisitionType: number): string{
    switch (requisitionType){
      case 0:
        this.title = "POPULAR"
        return this.requisicao = 'https://api.jikan.moe/v3/search/anime?q=&type=tv&order_by=score&sort=desc'
      case 1:
        this.title = "RELEASING"
        return this.requisicao = 'https://api.jikan.moe/v3/search/anime?q=&type=tv&order_by=start_date&status=airing&&sort=desc'
      case 2:
        this.title = "TOP"
        return this.requisicao = 'https://api.jikan.moe/v3/search/anime?q=&type=tv&order_by=score&genre=1&sort=desc'
      case 3:
        this.title = "NEXT SEASON"
        return this.requisicao = 'https://api.jikan.moe/v3/search/anime?q=&type=tv&order_by=&status=upcoming&genre=1&sort=desc'
      default:
        return ''
    }
  }

  async searchAnimes(): Promise<void> {
    this.sub = this.route.params.subscribe(params => {
      this.requisitionType = +params['requisitionType'];
    });

    const response = await fetch(this.chooseRequisition(this.requisitionType ?? -1));
    const myJson = await response.json();
    this.animes = []
    for (const animeResult of myJson.results) {
      this.animes.push(new Anime(animeResult))
    }
  }
}
