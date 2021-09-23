import { Component, OnInit } from '@angular/core';
import { Favorito } from 'src/app/anime-form/anime-form.component';
import { Anime } from '..';

@Component({
  selector: 'app-page-perfil',
  templateUrl: './page-perfil.component.html',
  styleUrls: ['./page-perfil.component.css']
})
export class PagePerfilComponent implements OnInit {

  user: User | undefined
  username: string | null = null
  inputText: string = ''
  canLogin: boolean = false

  constructor() { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username')
    if(this.username != null) {
      this.getUserInfo()
    }
  }

  async getUser(): Promise<void> {
    const username = this.username?.split(' ').join('-')
    fetch(`https://api.github.com/users/${this.username}`)
    .then(response => response.json())
    .then(json => {
      this.user = new User(json, this.username!)
      localStorage.setItem(`user-${username}`, JSON.stringify(this.user))
    })
    .catch(err => console.log(err))
  }

  getUserInfo() {
    const username = this.username?.split(' ').join('-')
    let userData = localStorage.getItem(`user-${username}`)
    if(userData == null) {
      this.getUser()
    } else {
      this.user = new User(JSON.parse(userData), this.username!)
    }
  }

  logar() {
    sessionStorage.setItem('username', this.inputText)
    this.username = this.inputText
    this.getUserInfo()
  }

  validateInput() {
    this.canLogin = this.inputText.length >= 3
  }
}

export class User {
  
  favoritos: Favorito[] = []

  avatar_url: string
  id: number
  login: string
  name: string

  constructor(json: any, username: string) {    
    this.avatar_url = json.avatar_url ?? 'assets/default-avatar.png'
    this.id = json.id ?? 0
    this.login = json.login ?? username
    this.name = json.name ?? this.login
    this.favoritos = json.favoritos ?? []
  }
}
