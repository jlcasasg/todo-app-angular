import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo-list/todo';
import { TodoStoreService } from '../todo-list/todo-store.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todo: Todo;
  constructor(private todosStore: TodoStoreService) {
    this.todo = {
      title: '',
    };
  }

  ngOnInit() {

  }

  addTodo() {
    this.todosStore.addTodo(this.todo.title);
  }
}
