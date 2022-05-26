import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MetaTodo } from 'src/app/models/metaTodo';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AdminService } from '../admin.service';
import { SharedService } from 'src/app/shared/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FeatureService } from 'src/app/feature/feature.service';
import { TodoCategory } from 'src/app/models/todoCategory';
import { Result } from 'src/app/models/result';

@Component({
  selector: 'app-manage-todo',
  templateUrl: './manage-todo.component.html',
  styleUrls: ['./manage-todo.component.scss']
})
export class ManageTodoComponent implements OnInit {

  constructor(private adminService: AdminService, private sharedService: SharedService, private featureService: FeatureService) { }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  metaTodo: MetaTodo = {
    todoCategory: [],
    todoProgress: []
  };

  getCategory(): void {
    this.featureService.getTodosCategory().subscribe({
      next: (data: TodoCategory[]) => {
        console.log(data);
        // Mapping data as we have array of string
        let format = data.map((x: TodoCategory) => { return x.name });
        this.metaTodo.todoCategory = format;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      }
    });
  }

  addCategory(event: MatChipInputEvent): void {
    const value = event.value;

    // Add our fruit
    if (value) {
      this.adminService.addTodoCategory(value).subscribe({
        next: (data: Result) => {
          this.metaTodo.todoCategory.push(value);
          this.sharedService.successSnackbar(`${data.message}`, 'Ok');
        },
        error: (err: HttpErrorResponse) => {
          this.sharedService.failureSnackbar(err.error.message, 'Ok');
        }
      });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeCategory(x: string): void {
    const index = this.metaTodo.todoCategory.indexOf(x);

    if (index >= 0) {
      this.adminService.deleteTodoCategory(x).subscribe({
        next: (data: Result) => {
          this.metaTodo.todoCategory.splice(index, 1);
          this.sharedService.successSnackbar(`${data.message}`, 'Ok');
        },
        error: (err: HttpErrorResponse) => {
          this.sharedService.failureSnackbar(err.error.message, 'Ok');
        }
      });
    }
  }

  ngOnInit(): void {
    this.getCategory();
  }

}
