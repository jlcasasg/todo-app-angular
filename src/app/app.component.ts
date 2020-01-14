import { Component } from '@angular/core';
import { TodoStoreService } from './todo-list/todo-store.service';
import { Todo } from './todo-list/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() { }

}
