import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralModule } from '../general/general.module';
import { PageHomeComponent } from './page-home/page-home.component';
import { PagePerfilComponent } from './page-perfil/page-perfil.component';
import { PageFavoritosComponent } from './page-favoritos/page-favoritos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    PageHomeComponent,
    PagePerfilComponent,
    PageFavoritosComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    GeneralModule
  ],
  exports: [
    PageHomeComponent
  ]
})
export class PagesModule { }
