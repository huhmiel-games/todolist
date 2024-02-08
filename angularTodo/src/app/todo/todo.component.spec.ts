import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoDataService } from '../todo-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Todo } from '../model/Todo';

@Injectable({
  providedIn: 'root'
})
class MockTodoDataService
{
  expectedTodos: Todo[] = [
    { id: 2, title: 'B', description: 'desc', done: 1 },
    { id: 1, title: 'A', description: '', done: 0 },
  ];
  constructor() { }
  getTodoById(id: number)
  {
    return of(this.expectedTodos.find(todo => todo.id === id)).pipe(delay(100));
  }
  toggleTodoComplete(id: number)
  {
    return of(new HttpResponse({ body: {}, status: 201 })).pipe(delay(100))
  }
}

describe('TodoComponent', () =>
{
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>
  let mockTodoDataService: MockTodoDataService;

  beforeEach(() =>
  {
    mockTodoDataService = new MockTodoDataService()

    TestBed.overrideComponent(
      TodoComponent,
      {
        set: {
          providers: [
            { provide: TodoDataService, useValue: mockTodoDataService },
            {
              provide: ActivatedRoute,
              useValue: {
                params: of({
                  id: 2,
                }),
              }
            },
            Router
          ]
        }
      }
    )

    TestBed.configureTestingModule({
      declarations: [TodoComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserModule,
        CommonModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should not create if no todo', () =>
  {
    expect(fixture.nativeElement.querySelector('div')).toBeFalsy();
  });

  it('should show todo - whenStable', fakeAsync(() =>
  {
    fixture.detectChanges();
    component.ngOnInit();
    tick(100);
    fixture.detectChanges();
    
    const todo = fixture.nativeElement.querySelector('h2').textContent;
    expect(todo).toEqual('B');

    const desc = fixture.nativeElement.querySelector('p').textContent;
    expect(desc).toEqual('desc')
  }));

  it('should cross the title if checked - whenStable', fakeAsync(() =>
  {
    fixture.detectChanges();
    component.ngOnInit();
    tick(100);
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('a');
    expect(link).toHaveClass('text-decoration-line-through');
  }));
});
