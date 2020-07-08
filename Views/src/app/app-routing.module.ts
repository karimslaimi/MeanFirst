import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {TaskViewComponent} from './pages/task-view/task-view.component';

const routes: Routes = [
  {path: '', component: TaskViewComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)

  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
