import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/result';
import { Todo } from 'src/app/models/todo';
import { SharedService } from 'src/app/shared/shared.service';
import { FeatureService } from '../feature.service';

@Component({
  selector: 'app-view-todo',
  templateUrl: './view-todo.component.html',
  styleUrls: ['./view-todo.component.scss']
})
export class ViewTodoComponent implements OnInit {

  constructor(private featureService: FeatureService, private sharedService: SharedService) { }

  todoList: Todo[] = [];

  getUserTodos(): void {
    this.featureService.getTodo().subscribe({
      next: (data: Todo[]) => {
        console.log(data);
        this.todoList = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    });
  }

  deleteUserTodo(todoId: string): void {
    this.featureService.deleteTodo(todoId).subscribe({
      next: (data: Result) => {
        this.sharedService.successSnackbar(`${data.message}`, 'Ok');
        this.getUserTodos();
      },
      error: (err: HttpErrorResponse) => {
        this.sharedService.failureSnackbar(`${err.error.message}`, 'Ok');
      }
    });
  }

  ngOnInit(): void {
    this.getUserTodos();
  }

}
