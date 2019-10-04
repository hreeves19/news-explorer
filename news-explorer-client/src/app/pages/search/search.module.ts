import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatFormFieldModule, MatCardModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';




@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule
  ]
})
export class SearchModule { }
