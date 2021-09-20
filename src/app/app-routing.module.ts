import {NgModule} from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {AnimeInfoPageComponent} from './anime-info-page/anime-info-page.component'

import { PageHomeComponent, PageNotFoundComponent } from './components';

const routes: Routes = [
    {path: 'home', component: PageHomeComponent},
    {path: 'animeInfoPage', pathMatch: 'full', component: AnimeInfoPageComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
