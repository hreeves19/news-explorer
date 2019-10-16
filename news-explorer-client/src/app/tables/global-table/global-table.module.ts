import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalTableComponent } from './global-table.component';
import { MatTableModule, MatButtonModule } from '@angular/material';



@NgModule({
  declarations: [GlobalTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule
  ],
  exports: [GlobalTableComponent]
})
export class GlobalTableModule { }
