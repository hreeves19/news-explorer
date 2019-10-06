import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import { HomeModule } from './pages/home/home.module';
import { SearchModule } from './pages/search/search.module';
import { GoogleNewsService } from './services/google-news.service';
import { CountryService } from './services/country.service';
import { HttpClientModule } from '@angular/common/http';
import { GoogleNewsModule } from './tables/google-news/google-news.module';
import { GuardianService } from './services/guardian.service';
import { NewYorkTimesService } from './services/new-york-times.service';
import { FormsModule } from '@angular/forms';

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
    SearchModule,
    HttpClientModule,
    GoogleNewsModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [GoogleNewsService, CountryService, GuardianService, NewYorkTimesService, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
