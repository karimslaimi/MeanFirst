import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { AppRoutingModule } from './app-routing.module';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginComponent } from './pages/login/login.component';
import {WebReqInterceptorService} from './web-req-interceptor.service';
import { SignupComponent } from './pages/signup/signup.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewListComponent,
    NewTaskComponent,
    LoginComponent,
    SignupComponent,
    EditListComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,

  ],
  providers: [
   { provide:HTTP_INTERCEPTORS,useClass:WebReqInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
