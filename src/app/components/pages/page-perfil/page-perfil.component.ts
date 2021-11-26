import { Component, OnInit } from '@angular/core';
import { Favorito } from 'src/app/anime-form/anime-form.component';
import  axios  from 'axios';
import { Anime } from '..';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-perfil',
  templateUrl: './page-perfil.component.html',
  styleUrls: ['./page-perfil.component.css']
})
export class PagePerfilComponent implements OnInit {

  user: User | undefined
  loginPassword: string = ''
  loginEmail: string = ''

  name: string = ''
  email: string = ''
  password: string = ''
  rePassword: string = ''
  confirmation: boolean = false
  genre: string = ''

  canLogin: boolean = false

  //Sexo
  defaultGenre = ['Masculino', 'Feminino', 'Não quero informar']

  constructor(private router: Router) { }

  ngOnInit(): void {
    let userData = sessionStorage.getItem('user')
    if(userData != null) {
      this.user = new User(JSON.parse(userData))
    }
  }

  logar() {
    let user = {
      email: this.loginEmail, 
      password: this.loginPassword
    }

    axios.post('https://intense-dusk-81169.herokuapp.com/login', user)
    .then (response => {
      console.log(response)
      if (response && !response.data.error){
        this.loginEmail = ''
        this.loginPassword = ''
        this.saveUser(response.data)
      }
    })
  }

  registrar(){
    let person = {
      name: this.name, 
      email: this.email, 
      password: this.password,
      genre: this.genre,
      confirmation: this.confirmation
    }

    axios.post('https://intense-dusk-81169.herokuapp.com/users', person)
    .then (response => {
      console.log(response)
      if (response && !response.data.error){
        this.name = ''
        this.confirmation = false
        this.email = ''
        this.genre = ''
        this.password = ''
        this.rePassword = ''
        this.saveUser(response.data)
      }
    })
  }

  markCheckbox(){
    console.log(this.confirmation)
    this.confirmation = !this.confirmation
  }

  validateInput() {
    this.canLogin = this.name.length >= 3
  }

  validateLogin(){
    this.canLogin = this.loginEmail.length >= 3
  }

  private saveUser(data: any) {
    this.user = new User(data)
    sessionStorage.setItem('user', JSON.stringify(this.user))
  }

}

export class User {
  
  favoritos: Favorito[] = []

  avatar_url: string
  id: number
  name: string
  email: string
  password: string

  constructor(json: any) {    
    this.avatar_url = 'assets/default-avatar.png'
    this.id = json.id ?? 0
    this.name = json.name
    this.email = json.email
    this.password = json.password
  }
}
