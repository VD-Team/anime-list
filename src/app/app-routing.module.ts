import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { PageFavoritosComponent } from './pages/page-favoritos';

import { PageHomeComponent } from './pages/page-home';
import { PageNotFoundComponent } from './pages/page-not-found';
import { PagePerfilComponent } from './pages/page-perfil';

const routes: Routes = [
    {path: 'home', component: PageHomeComponent},
    {path: 'perfil', component: PagePerfilComponent},
    {path: 'favoritos', component: PageFavoritosComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }