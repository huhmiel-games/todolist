import { Component } from '@angular/core';
import { Todo } from '../model/Todo';
import { TodoDataService } from '../todo-data.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  providers: [TodoDataService]
})
export class TodoComponent
{
  todo: Todo | undefined;
  todoSubscription!: Subscription | undefined;

  constructor(
    private todoDataService: TodoDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void
  {
    this.activatedRoute.params.subscribe(params =>
    {
      const id = params['id'];
      
        this.todoSubscription = this.todoDataService.getTodoById(id)?.subscribe(todo =>
        {
          if (this.isTodo(todo))
          {
            this.todo = todo;
          }
        }, error => {
          this.router.navigate(['error']);
        });
    });
  }

  toggleTodoComplete(id: number)
  {
    this.todoDataService.toggleTodoComplete(id).subscribe((res) =>
    {
      if (res.status === 204)
      {
        this.router.navigate(['list-todo']);
      }
    });
  }

  isTodo(todo: unknown | undefined): todo is Todo
  {
    return typeof todo === "object" && todo !== null && "title" in todo;
  }

  redirectToPageNotFound()
  {
    this.router.navigate(['error']);
  }
}
