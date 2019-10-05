import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule, MatButtonModule
} from '@angular/material';
import { HomeModule } from './pages/home/home.module';
import { SearchModule } from './pages/search/search.module';
import { GoogleNewsService } from './services/google-news.service';
import { CountryService } from './services/country.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HomeModule,
    MatButtonModule,
    SearchModule
  ],
  providers: [GoogleNewsService, CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
