import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from './todo';
import { ConfigService } from 'src/app/config.service';

@Injectable({
  providedIn: 'root'
})
export class TodoStoreService {

  constructor(public configService: ConfigService, ) { }
  // - We set the initial state in BehaviorSubject's constructor
  // - Nobody outside the Store should have access to the BehaviorSubject
  //   because it has the write rights
  // - Writing to state should be handled by specialized Store methods (ex: addTodo, removeTodo, etc)
  // - Create one BehaviorSubject per store entity, for example if you have TodoGroups
  //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
  private readonlyTodos = new BehaviorSubject<Todo[]>([]);


  // Expose the observable$ part of the _todos subject (read only stream)
  readonly todos$ = this.readonlyTodos.asObservable();

  // we'll compose the todos$ observable with map operator to create a stream of only completed todos
  readonly completedTodos$ = this.todos$.pipe(
    map(todos => todos.filter(todo => todo.isCompleted))
  );

  readonly uncompleteTodos$ = this.todos$.pipe(
    map(todos => todos.filter(todo => !todo.isCompleted))
  );
  // the getter will return the last value emitted in _todos subject
  private get todos(): Todo[] {
    return this.readonlyTodos.getValue();
  }

  // assigning a value to this.todos will push it onto the observable
  // and down to all of its subsribers (ex: this.todos = [])
  private set todos(val: Todo[]) {
    this.readonlyTodos.next(val);
  }


  addTodo(title: string) {
    // we assaign a new copy of todos by adding a new todo to it
    // with automatically assigned ID ( don't do this at home, use uuid() )
    this.todos = [
      ...this.todos,
      {
        id: this.configService.randomId(),
        title,
        isCompleted: false,
      }
    ];
  }


  removeTodo(id: string) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }


  setCompleted(id: string, isCompleted: boolean) {

    const todo = this.todos.find(todoItem => todoItem.id === id);

    if (todo) {
      // we need to make a new copy of todos array, and the todo as well
      // remember, our state must always remain immutable
      // otherwise, on push change detection won't work, and won't update its view
      const index = this.todos.indexOf(todo);
      this.todos[index] = {
        ...todo,
        isCompleted
      };
      this.todos = [...this.todos];
    }
    else{
      // Do nothing
    }
  }
}

