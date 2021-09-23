import { Component, Input, OnInit } from '@angular/core';
import { AnimeDetail } from '../anime-info-page/anime-info-page.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-anime-form',
  templateUrl: './anime-form.component.html',
  styleUrls: ['./anime-form.component.css']
})
export class AnimeFormComponent implements OnInit {

  @Input()
  anime: AnimeDetail | undefined

  defaultStatus = ['Assistido', 'Acompanhando', 'Quero assistir']
  status: string | null = null
  nota: number = 0
  startDate: Date = new Date()
  endDate: Date = new Date()
  progress: number = 0
  rewatch: number = 0
  private currentDate = new Date()

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data
  }

  closeWindow() {
    this.data.changeWindowState(false)
  }

  salvarFavorito() {
    const favorito = new Favorito(this.anime!, {
      status: this.status,
      nota: this.nota,
      startDate: this.startDate,
      endDate: this.endDate,
      progress: this.progress,
      rewatch: this.rewatch
    })
    //Push the new favorite
    this.closeWindow()
  }
}

export class Favorito {
  
  anime: AnimeDetail
  status: string | null
  nota: number
  startDate: Date
  endDate: Date
  progress: number
  rewatch: number

  constructor(anime: AnimeDetail, details: any) {
    this.anime = anime
    this.status = details.status
    this.startDate = details.startDate
    this.nota = details.nota
    this.endDate = details.endDate
    this.progress = details.progress
    this.rewatch = details.rewatch
  }
}
