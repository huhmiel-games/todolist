import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../todo-data.service';
import { Todo } from '../model/Todo';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  providers: [TodoDataService]
})
export class ListComponent implements OnInit
{
  todos: Todo[] = [];
  private todosSubscription!: Subscription;
  private toggleSubscription!: Subscription;

  constructor(private todoDataService: TodoDataService, private router: Router) { }

  ngOnInit(): void
  {
    this.todosSubscription = this.todoDataService.getAllTodos().subscribe(todos =>
    {
      if (this.isTodoList(todos))
      {
        this.todos = todos
      }
    }, error => {
      this.router.navigate(['error']);
    });
  }

  ngOnDestroy(): void
  {
    if (this.todosSubscription)
    {
      this.todosSubscription.unsubscribe();
    }

    if (this.toggleSubscription)
    {
      this.toggleSubscription.unsubscribe();
    }
  }

  toggleTodoComplete(id: number)
  {
    this.todoDataService.toggleTodoComplete(id).subscribe((res) =>
    {
      if (res.status === 204)
      {
        this.ngOnInit();
      }
    });
  }

  isTodoList(todos: unknown | undefined): todos is Todo[]
  {
    return Array.isArray(todos) && typeof todos[0] === "object" && todos[0] !== null && "title" in todos[0]
  }
}
