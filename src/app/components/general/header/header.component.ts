import { Component, Input, OnInit } from '@angular/core';

enum Button {
  Home = 'home',
  Perfil = 'perfil',
  Favoritos = 'favoritos',
  None = 'null'
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private buttonSelected = 'background-color: #FF434D;'
  private buttonUnselected = 'background-color: unset;'

  bhomeStyle = this.buttonUnselected
  bperfilStyle = this.buttonUnselected
  bfavoritosStyle = this.buttonUnselected
  bsearchStyle = ''
  searchIconPath = 'assets/search-icon.png'
  @Input()
  button: string = Button.None.toString()
  @Input()
  hasSearch: boolean = false

  constructor() { }

  ngOnInit(): void {
    switch (this.button) {
      case Button.Home.toString():
        this.bhomeStyle = this.buttonSelected
        break;
      case Button.Perfil.toString():
        this.bperfilStyle = this.buttonSelected
        break;
      case Button.Favoritos.toString():
        this.bfavoritosStyle = this.buttonSelected
    }
    if(!this.hasSearch) {
      this.bsearchStyle = 'display: none;'
    }
  }
}
