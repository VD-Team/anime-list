import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { PageHomeComponent } from './pages/page-home';

const routes: Routes = [
    {path: 'home', component: PageHomeComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }