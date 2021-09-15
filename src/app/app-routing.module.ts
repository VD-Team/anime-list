import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { PageFavoritosComponent } from './pages/page-favoritos/page-favoritos.component';

import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PagePerfilComponent } from './pages/page-perfil/page-perfil.component';

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