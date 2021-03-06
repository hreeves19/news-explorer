import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatFormFieldModule, MatCardModule, MatTableModule, MatSortModule, MatPaginatorModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { GoogleNewsComponent } from '../../tables/google-news/google-news.component';
import { GoogleNewsModule } from 'src/app/tables/google-news/google-news.module';
import { GlobalTableModule } from 'src/app/tables/global-table/global-table.module';




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
    GoogleNewsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    GlobalTableModule,
    MatProgressSpinnerModule
  ]
})
export class SearchModule { }
