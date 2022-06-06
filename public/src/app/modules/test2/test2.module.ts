import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProbarComponent } from './probar/probar.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "", component: ProbarComponent}
];

@NgModule({
  declarations: [ProbarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class Test2Module { }
