import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TodoComponent } from './todo/todo.component';
import { TodoDataService } from './todo-data.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddTodoComponent,
    PageNotFoundComponent,
    TodoComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
  providers: [TodoDataService]
})
export class AppModule { }
