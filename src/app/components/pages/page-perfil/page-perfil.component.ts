import { Component, OnInit } from '@angular/core';
import { Anime } from '..';

@Component({
  selector: 'app-page-perfil',
  templateUrl: './page-perfil.component.html',
  styleUrls: ['./page-perfil.component.css']
})
export class PagePerfilComponent implements OnInit {

  user: User | undefined
  username: string | null = null

  constructor() { }

  ngOnInit(): void {
    sessionStorage.setItem('username', 'VitorG718')
    this.username = sessionStorage.getItem('username')
    if(this.username != null) {
      this.getUserInfo()
    } else {
      // Mostrar tela de login
    }
  }

  async getUser(): Promise<void> {
    fetch(`https://api.github.com/users/${this.username}`)
    .then(response => response.json())
    .then(json => {
      this.user = new User(json)
      localStorage.setItem(`user-${this.username}`, JSON.stringify(this.user))
    })
    .catch(err => console.log(err))
  }

  getUserInfo() {
    let userData = localStorage.getItem(`user-${this.username}`)
    if(userData == null) {
      this.getUser()
    } else {
      this.user = new User(JSON.parse(userData))
    }
  }
}

class User {
  
  favoritos: Anime[] = []

  avatar_url: string
  id: number
  login: string
  name: string

  constructor(json: any) {    
    this.avatar_url = json.avatar_url ?? 'assets/default-avatar.png'
    this.id = json.id
    this.login = json.login
    this.name = json.name ?? json.login
    this.getFavoritos(json.favoritos)
  }

  getFavoritos(favoritos: any) {
    this.favoritos = []
    for (const favorito of favoritos) {
      this.favoritos.push(new Anime(favorito))
    }
  }
}
