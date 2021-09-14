import { Component, OnInit } from '@angular/core';

enum Button {
  Home = 'Home',
  Perfil = 'Perfil',
  Favoritos = 'Favoritos'
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private buttonSelected = 'background-color: #FF434D;'
  private buttonUnselected = 'background-color: unset;'

  bhomeStyle = this.buttonSelected
  bperfilStyle = this.buttonUnselected
  bfavoritosStyle = this.buttonUnselected
  bsearchHidden = false
  searchIconPath = 'assets/search-icon.png'

  constructor() { }

  ngOnInit(): void {
  }

  buttonClicked(button: string): void {
    this.bhomeStyle = this.buttonUnselected
    this.bperfilStyle = this.buttonUnselected
    this.bfavoritosStyle = this.buttonUnselected

    switch (button) {
      case Button.Home:
        this.bhomeStyle = this.buttonSelected
        this.bsearchHidden = false
        break;
      case Button.Perfil:
        this.bperfilStyle = this.buttonSelected
        this.bsearchHidden = true
        break;
      case Button.Favoritos:
        this.bfavoritosStyle = this.buttonSelected
        this.bsearchHidden = false
    }
  }
}
