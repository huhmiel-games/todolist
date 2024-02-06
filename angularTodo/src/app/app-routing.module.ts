import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { path: 'list-todo', component: ListComponent },
  { path: 'add-todo', component: AddTodoComponent },
  { path: 'list-todo/:id', component: TodoComponent },
  { path: '', redirectTo: '/list-todo', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
