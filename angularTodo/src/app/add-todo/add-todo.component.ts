import { Component } from '@angular/core';
import { TodoDataService } from '../todo-data.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  providers: [TodoDataService]
})
export class AddTodoComponent
{
  public todoForm = this.formBuilder.group({
    title: '',
    description: ''
  });

  constructor(
    private todoDataService: TodoDataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  onSubmit()
  {    
    const { title, description } = this.todoForm.value;

    if (title && typeof title === 'string')
    {
      this.todoDataService.addTodo(title, description ?? '').subscribe((res) =>
      {
        if (res.status === 201)
        {
          this.router.navigate(['list-todo']);
        }
      });
    }
  }
}
