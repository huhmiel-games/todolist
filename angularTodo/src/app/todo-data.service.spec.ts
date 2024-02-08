import { TodoDataService } from './todo-data.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Todo } from './model/Todo';
import { of } from 'rxjs';

describe('TodoDataService', () =>
{
  let service: TodoDataService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let router: jasmine.SpyObj<Router>

  beforeEach(() =>
  {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    router = jasmine.createSpyObj('Router', ['navigate'])
    service = new TodoDataService(httpClientSpy, router)
  });

  it('should be created', () =>
  {
    expect(service).toBeTruthy();
  });

  it('should return expected todos (HttpClient called once)', (done: DoneFn) =>
  {
    const expectedTodos: Todo[] = [
      { id: 2, title: 'B', description: 'desc', done: 0 },
      { id: 1, title: 'A', description: '', done: 0 },
    ];

    httpClientSpy.get.and.returnValue(of(expectedTodos));

    service.getAllTodos().subscribe({
      next: (todos) =>
      {
        expect(todos).withContext('expected todos').toEqual(expectedTodos);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should return expected todo (HttpClient called once)', (done: DoneFn) =>
  {
    const expectedTodos: Todo[] = [
      { id: 2, title: 'B', description: 'desc', done: 0 },
      { id: 1, title: 'A', description: '', done: 0 },
    ];

    httpClientSpy.get.and.returnValue(of(expectedTodos[0]));

    service.getTodoById(2).subscribe({
      next: (todos) =>
      {
        expect(todos).withContext('expected todo').toEqual(expectedTodos[0]);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should create a todo (HttpClient called once)', (done: DoneFn) =>
  {
    httpClientSpy.post.and.returnValue(of({ status: 201 }));

    service.addTodo('test').subscribe({
      next: (res) =>
      {
        console.log(res);

        expect(res.status).toBe(201);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.post.calls.count()).withContext('one call').toBe(1);
  });
});
