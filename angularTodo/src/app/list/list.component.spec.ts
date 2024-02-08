import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListComponent } from './list.component';
import { TodoDataService } from '../todo-data.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

@Injectable({
  providedIn: 'root'
})
class MockTodoDataService
{
  expectedTodos: unknown[] = [
    { id: 2, title: 'B', description: 'desc', done: 1 },
    { id: 1, title: 'A', description: '', done: 0 },
  ];
  constructor() { }
  getAllTodos()
  {
    return of(this.expectedTodos).pipe(delay(100));
  }
  toggleTodoComplete(id: number)
  {
    return of(new HttpResponse({ body: {}, status: 201 })).pipe(delay(100))
  }
}

describe('ListComponent', () =>
{
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockTodoDataService: MockTodoDataService;

  beforeEach(() =>
  {
    mockTodoDataService = new MockTodoDataService()

    TestBed.overrideComponent(
      ListComponent,
      {
        set: {
          providers: [
            { provide: TodoDataService, useValue: mockTodoDataService },
            Router
          ]
        }
      }
    )

    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserModule,
        CommonModule
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create the list', () =>
  {
    expect(component).toBeTruthy();
  });

  it('should show todos - whenStable', fakeAsync(() =>
  {
    fixture.detectChanges();
    component.ngOnInit();
    tick(100);
    fixture.detectChanges();

    const todoTitle1 = fixture.nativeElement.querySelector('#todo-id-2').textContent;
    expect(todoTitle1).toEqual('B');

    const desc = fixture.nativeElement.querySelector('p').textContent;
    expect(desc).toEqual('desc')

    const todoTitle2 = fixture.nativeElement.querySelector('#todo-id-1').textContent;
    expect(todoTitle2).toEqual('A');
  }));

  it('should cross the title - whenStable', fakeAsync(() =>
  {
    fixture.detectChanges();
    component.ngOnInit();
    tick(100);
    fixture.detectChanges();

    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links[0]).toHaveClass('text-decoration-line-through');
    expect(links[1]).not.toHaveClass('text-decoration-line-through');
  }));
});
