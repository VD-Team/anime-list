import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-anime-form',
  templateUrl: './anime-form.component.html',
  styleUrls: ['./anime-form.component.css']
})
export class AnimeFormComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data
  }

  closeWindow() {
    this.data.changeWindowState(false)
  }
}
