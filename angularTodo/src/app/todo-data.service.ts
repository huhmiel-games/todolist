import { Injectable } from '@angular/core';
import { Todo } from './model/Todo';
import { Observable, catchError, throwError, retry } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService
{
  endpoint = 'http://localhost:8000';
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient, private router: Router)
  {

  }

  processError(err: any): any
  {
    let message = '';
    if (err.error instanceof ErrorEvent)
    {
      message = err.error.message;
    }
    else
    {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(() =>
    {
      message;
    });
  }

  getAllTodos()
  {
    return this.httpClient
      .get<Todo[]>(this.endpoint, this.httpHeader)
      .pipe(retry(1), catchError(this.processError));
  }

  getTodoById(id: number)
  {
    return this.httpClient
      .get<Todo>(`${this.endpoint}/${id}`, this.httpHeader)
      .pipe(retry(1), catchError(this.processError));
  }

  toggleTodoComplete(id: number)
  {
    return this.httpClient.patch(`${this.endpoint}/${id}`, {}, {
      headers: this.httpHeader.headers,
      observe: 'response'
    });
  }

  addTodo(title: string, description = '')
  {
    return this.httpClient.post(this.endpoint,
      {
        title,
        description
      },
      {
        headers: this.httpHeader.headers,
        observe: 'response'
      });
  }

  redirectToPageNotFound()
  {
    this.router.navigate(['error']);
  }
}
