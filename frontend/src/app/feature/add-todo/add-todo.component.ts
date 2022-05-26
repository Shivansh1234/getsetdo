import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Result } from 'src/app/models/result';
import { TodoCategory } from 'src/app/models/todoCategory';
import { TodoData } from 'src/app/models/todoData';
import { SharedService } from 'src/app/shared/shared.service';
import { FeatureService } from '../feature.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  constructor(private fb: FormBuilder, private featureService: FeatureService, private shardService: SharedService) { }

  todoCategoryList: any[] = [];

  addTodoForm: FormGroup = this.fb.group({
    todoName: ['sample', Validators.required],
    todoType: ['', Validators.required],
    todoProgress: ['sample', Validators.required],
    todoDescription: ['sample', Validators.required]
  });

  addTodo(): void {
    let addtodoData: TodoData = {
      todoName: this.addTodoForm.get('todoName')?.value,
      todoType: this.addTodoForm.get('todoType')?.value,
      todoProgress: this.addTodoForm.get('todoProgress')?.value,
      todoDescription: this.addTodoForm.get('todoDescription')?.value,
    }
    this.featureService.addTodos(addtodoData).subscribe({
      next: (data: Result) => {
        this.shardService.successSnackbar(`${data.message}`, 'Ok');
      },
      error: (err: HttpErrorResponse) => {
        this.shardService.failureSnackbar(`${err.error.message}`, 'Ok');
      }
    });
  }

  getTodoCategory(): void {
    this.featureService.getTodosCategory().subscribe({
      next: (data: TodoCategory[]) => {
        this.todoCategoryList = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      }
    })
  }

  ngOnInit(): void {
    this.getTodoCategory();
  }

}
