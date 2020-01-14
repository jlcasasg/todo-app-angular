import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from './todo';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('1s ease-out',
              style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('1s ease-out',
              style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class TodoListComponent implements OnInit {
  @Input()
  todo: Todo;

  @Output()
  completed = new EventEmitter<boolean>();
  @Output()
  remove = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onCompleted() {
    this.completed.emit(true);
  }

  onRemove() {
    this.remove.emit(this.todo.id);
  }
}
