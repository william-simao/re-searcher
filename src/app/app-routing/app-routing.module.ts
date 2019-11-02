import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '../app.component';
import { HomePageComponent } from '../pages/home/home-page/home-page.component';
import { AboutPageComponent } from '../pages/about/about-page/about-page.component';
import { HelpPageComponent } from '../pages/help/help-page/help-page.component';
import { ConfigKeysComponent } from '../pages/config/config-keys/config-keys.component';

export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'config', component: ConfigKeysComponent},
  { path: 'about', component: AboutPageComponent },
  { path: 'help', component: HelpPageComponent},
  { path: '**', redirectTo: 'home' }
];

