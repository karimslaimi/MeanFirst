import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {TaskViewComponent} from './pages/task-view/task-view.component';
import {NewListComponent} from './pages/new-list/new-list.component';
import {NewTaskComponent} from './pages/new-task/new-task.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {EditListComponent} from './pages/edit-list/edit-list.component';
import {EditTaskComponent} from './pages/edit-task/edit-task.component';

const routes: Routes = [
  {path: '', redirectTo:"lists",pathMatch:"full" },
  {path: 'new-list',component: NewListComponent},
  {path:'lists/:id',component:TaskViewComponent},
  {path:'lists',component:TaskViewComponent},
  {path:'lists/:id/new-task',component:NewTaskComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'edit-list/:id',component:EditListComponent},
  {path:'lists/:listId/edit-task/:taskId',component:EditTaskComponent},

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)

  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
