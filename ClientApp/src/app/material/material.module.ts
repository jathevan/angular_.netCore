import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from "@angular/material";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatIconModule,
    Material.MatIconModule,
    Material.MatButtonModule,
    Material.MatTableModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatDialogModule,
    Material.MatProgressBarModule,
    Material.MatCardModule
  ],
  exports:[
    Material.MatToolbarModule,
    Material.MatIconModule,
    Material.MatButtonModule,
    Material.MatTableModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatDialogModule,
    Material.MatProgressBarModule,
    Material.MatCardModule
  ]
})
export class MaterialModule { }
