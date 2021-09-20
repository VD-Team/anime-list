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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPage(name: string, id: number): void{
    this.router.navigate([`${name}`]);
  }
}
