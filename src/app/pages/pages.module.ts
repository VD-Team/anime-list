import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralModule } from '../general';
import { PageHomeComponent } from './page-home';
import { AnimesModule } from '../animes';
import { PagePerfilComponent } from './page-perfil';

@NgModule({
  declarations: [
    PageHomeComponent,
    PagePerfilComponent
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
