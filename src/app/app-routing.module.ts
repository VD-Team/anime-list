import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { PageHomeComponent, PageNotFoundComponent } from './components';

const routes: Routes = [
    {path: 'home', component: PageHomeComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }