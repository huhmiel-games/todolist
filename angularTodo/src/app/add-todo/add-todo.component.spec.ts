import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoComponent } from './add-todo.component';
import { TodoDataService } from '../todo-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddTodoComponent', () =>
{
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      declarations: [AddTodoComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule,HttpClientTestingModule],
      providers: [TodoDataService]
    });

    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });

  it('should contains a form', () =>
  {
    const form = fixture.nativeElement.querySelector('form');

    expect(form).toBeTruthy();
  });

  it('should contains an text input for title', () =>
  {
    const inputTitle = fixture.nativeElement.querySelector('input[type=text]');

    expect(inputTitle).toBeTruthy();
  });

  it('should contains a textarea for description', () =>
  {
    const textareaDesc = fixture.nativeElement.querySelector('textarea');
    
    expect(textareaDesc).toBeTruthy();
  });

  it('should contains a submit button', () =>
  {
    const submitBtn = fixture.nativeElement.querySelector('button[type=submit]');
    
    expect(submitBtn).toBeTruthy();
  });
});
