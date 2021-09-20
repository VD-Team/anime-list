import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anime-card',
  templateUrl: './anime-card.component.html',
  styleUrls: ['./anime-card.component.css']
})
export class AnimeCardComponent implements OnInit {
  @Input()
  title: String | undefined
  @Input()
  image_url: String | undefined
  @Input()
  score: Number | undefined
  @Input()
  synopsis: String | undefined
  @Input()
  animeId: number | undefined

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPage(name: string): void{
    if(this.animeId) {
      this.router.navigate([`${name}`, this.animeId]);
    } else {
      console.log("Erro")
    }
  }
}
