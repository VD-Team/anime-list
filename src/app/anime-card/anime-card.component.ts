import { Component, OnInit, Input} from '@angular/core';

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
  synopsis: String | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
