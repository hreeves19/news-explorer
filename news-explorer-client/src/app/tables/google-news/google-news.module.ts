import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleNewsComponent } from './google-news.component';
import { MatTableModule, MatButtonModule } from '@angular/material';



@NgModule({
  declarations: [GoogleNewsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule
  ],
  exports: [GoogleNewsComponent]
})
export class GoogleNewsModule { }
