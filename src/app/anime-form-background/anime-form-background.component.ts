import { Component, Input, OnInit } from '@angular/core';
import { AnimeDetail } from '../anime-info-page/anime-info-page.component';

@Component({
  selector: 'app-anime-form-background',
  templateUrl: './anime-form-background.component.html',
  styleUrls: ['./anime-form-background.component.css']
})
export class AnimeFormBackgroundComponent implements OnInit {

  @Input()
  anime: AnimeDetail | undefined

  constructor() { }

  ngOnInit(): void {
  }
}
