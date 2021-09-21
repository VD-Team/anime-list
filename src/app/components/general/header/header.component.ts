import { Component, Injectable, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

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
@Injectable()
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
  searchText: string = ''

  constructor(private data: DataService) { }

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

  updateMessage() {
    this.data.changeMessage(this.searchText)
  }
}
