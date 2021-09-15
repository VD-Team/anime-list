import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralModule } from '../general';
import { PageHomeComponent } from './page-home';
import { AnimesModule } from '../animes';
import { PagePerfilComponent } from './page-perfil';
import { PageFavoritosComponent } from './page-favoritos';

@NgModule({
  declarations: [
    PageHomeComponent,
    PagePerfilComponent,
    PageFavoritosComponent
  ],
  imports: [
    CommonModule,
    GeneralModule,
    AnimesModule
  ],
  exports: [
    PageHomeComponent
  ]
})
export class PagesModule { }
