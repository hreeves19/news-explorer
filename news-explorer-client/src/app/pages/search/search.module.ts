import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatFormFieldModule, MatCardModule, MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { GoogleNewsComponent } from '../../tables/google-news/google-news.component';
import { GoogleNewsModule } from 'src/app/tables/google-news/google-news.module';




@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    GoogleNewsModule
  ]
})
export class SearchModule { }
