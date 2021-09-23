import { Component, Input, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { AnimeDetail } from '../anime-info-page/anime-info-page.component';
import { User } from '../components/pages';
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
  favorited = false
  private currentDate = new Date()
  private username: string | null = null

  differ: KeyValueDiffer<string, any>
  constructor(private data: DataService, private differs: KeyValueDiffers) {
    this.differ = this.differs.find({}).create()
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username')
  }

  ngDoCheck() {
    const change = this.differ.diff(this)
    if (change) {
      change.forEachChangedItem(item => {
        if(item.key == 'anime' && item.currentValue) {
          this.getAnimeDetails()
        }
      })
    }
  }

  closeWindow() {
    this.data.changeWindowState(false)
  }

  salvarFavorito() {
    console.log(this.startDate)
    const favorito = new Favorito(this.anime!, {
      status: this.status,
      nota: this.nota,
      startDate: this.startDate,
      endDate: this.endDate,
      progress: this.progress,
      rewatch: this.rewatch
    })
    if(this.username != null) {
      let user = this.getUser(this.username)
      const elements = user.favoritos.filter(element => element.anime.id == favorito.anime.id)
      if(elements.length == 0) {
        user.favoritos.push(favorito)
      } else {
        user.favoritos.forEach(element => {
          if(element.anime.id == favorito.anime.id) {
            element.endDate = favorito.endDate
            element.nota = favorito.nota
            element.startDate = favorito.startDate
            element.rewatch = favorito.rewatch
            element.progress = favorito.progress
            element.status = favorito.status
          }
        })
      }
      localStorage.setItem(`user-${this.username}`, JSON.stringify(user))
    }
    this.closeWindow()
  }

  removerFavorito() {
    let user = this.getUser(this.username!)
    const favoritos = user.favoritos.filter(element => element.anime.id != this.anime?.id)
    user.favoritos = favoritos
    localStorage.setItem(`user-${this.username}`, JSON.stringify(user))
    this.closeWindow()
  }

  getUser(username: string): User {
      username = username.split(' ').join('.')
      const jsonData = localStorage.getItem(`user-${username}`)
      return JSON.parse(jsonData!)
  }

  getAnimeDetails() {
    let username = sessionStorage.getItem('username')
    if(username != null) {
      let user = this.getUser(username)
      user.favoritos.forEach(element => {
        if(element.anime.id == this.anime?.id) {
          this.status = element.status
          this.rewatch = element.rewatch
          this.progress = element.progress
          this.endDate = element.endDate
          this.startDate = element.startDate
          this.nota = element.nota
          this.favorited = true
        }
      })
    }
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
