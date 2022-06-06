import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TortasComponent } from './tortas/tortas.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: "", component: TortasComponent}
];

@NgModule({
  declarations: [ TortasComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  
  

})
export class PostresModule { }
