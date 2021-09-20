import {NgModule} from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {AnimeInfoPageComponent} from './anime-info-page/anime-info-page.component'

import { PageFavoritosComponent, PageHomeComponent, PageNotFoundComponent, PagePerfilComponent } from './components/pages';

const routes: Routes = [
    {path: 'home', component: PageHomeComponent},
    {path: 'perfil', component: PagePerfilComponent},
    {path: 'favoritos', component: PageFavoritosComponent},
    {path: 'animeInfoPage/:id', component: AnimeInfoPageComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
