import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result';
import { Todo } from '../models/todo';
import { TodoCategory } from '../models/todoCategory';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  constructor(private http: HttpClient) { }

  getTodo(): Observable<Todo[]> {
    let userToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + userToken
    });
    return this.http.get<Todo[]>(`${environment.baseUrl}/todos/getTodos`, { headers });
  }

  addTodos(todoData: any): Observable<Result> {
    let userToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + userToken
    });
    return this.http.put<Result>(`${environment.baseUrl}/todos/addTodo`, todoData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteTodo(todoId: string): Observable<Result> {
    console.log(todoId);
    let userToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + userToken
    });
    return this.http.delete<Result>(`${environment.baseUrl}/todos/deleteTodo/${todoId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // TOOLKIT METHODS - common method to be used by users and admins
  getTodosCategory(): Observable<TodoCategory[]> {
    let adminToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + adminToken
    });
    return this.http.get<TodoCategory[]>(`${environment.baseUrl}/manageTodo/getTodoCategory`, { headers })
  }


  private handleError(err: HttpErrorResponse) {
    return throwError(() => err);
  }
}
