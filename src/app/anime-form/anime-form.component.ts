import { Component, Input, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';
import axios from 'axios';
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
  status: string = 'Quero assistir'
  nota: number = 0
  startDate: Date = new Date()
  endDate: Date = new Date()
  progress: number = 0
  rewatch: number = 0
  favorited = false
  private currentDate = new Date()
  private user: User | undefined
  private favoritos: Favorito[] = []

  differ: KeyValueDiffer<string, any>
  constructor(private data: DataService, private differs: KeyValueDiffers) {
    this.differ = this.differs.find({}).create()
  }

  ngOnInit(): void {
    this.getUser()
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
    if(this.user != undefined) {
      const favorito = new Favorito(this.anime!, {
        status: this.status,
        nota: this.nota,
        startDate: this.startDate,
        endDate: this.endDate,
        progress: this.progress,
        rewatch: this.rewatch
      },
      this.user.id)
      console.log('Anime: ', favorito)
      axios.post('localhost:3000/anime', favorito)
    }
    this.closeWindow()
  }

  removerFavorito() {
    const favoritos = this.favoritos.filter(element => element.id == this.anime?.id)
    if (this.user != undefined && favoritos.length != 0) {
      let favorito = favoritos[0]
      axios.delete(`https://intense-dusk-81169.herokuapp.com/anime?userId=${this.user?.id}&id=${favorito.id}`)
    }
    this.closeWindow()
  }

  getUser(){
      if (this.user != undefined) return
      const jsonData = sessionStorage.getItem('user')
      if (jsonData != null) {
        this.user = JSON.parse(jsonData)
        if(this.user != undefined) {
          axios.get(`https://intense-dusk-81169.herokuapp.com/animes?userId=${this.user.id}`)
          .then(response => {
            this.favoritos = response.data
          })
        }
      }
  }

  getAnimeDetails() {
    this.getUser
    if(this.user != undefined) {
      this.favoritos.forEach(element => {
        if(element.id == this.anime?.id) {
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
  
  id: number
  userId: number
  status: string
  nota: number
  startDate: Date
  endDate: Date
  progress: number
  rewatch: number
  title: string
  image_url: string

  constructor(anime: AnimeDetail, details: any, userId: number) {
    this.id = anime.id
    this.userId = userId
    this.status = details.status
    this.startDate = details.startDate
    this.nota = details.nota
    this.endDate = details.endDate
    this.progress = details.progress
    this.rewatch = details.rewatch
    this.title = anime.title
    this.image_url = anime.image_url
  }
}
