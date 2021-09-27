import {NgModule} from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {AnimeInfoPageComponent} from './anime-info-page/anime-info-page.component'

import { PageHomeComponent, PageNotFoundComponent, PagePerfilComponent } from './components/pages';
import {AllAnimesComponent} from "./all-animes/all-animes.component";

const routes: Routes = [
    {path: 'home', component: PageHomeComponent},
    {path: 'perfil', component: PagePerfilComponent},
    {path: 'animeInfoPage/:id', component: AnimeInfoPageComponent},
    {path: 'allAnimes', component: AllAnimesComponent},
    {path: 'allAnimes/:requisitionType', component: AllAnimesComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'page-not-found', component: PageNotFoundComponent},
    {path: '**', redirectTo: '/page-not-found', pathMatch: 'full'}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
