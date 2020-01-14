import { TestBed } from '@angular/core/testing';
import { TodoStoreService } from './todo-store.service';

describe('TodoStoreService', () => {
  let service: TodoStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(TodoStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return none uncomplete TODO', (done: DoneFn) => {
    service.uncompleteTodos$.subscribe((list) => {
      expect(list.length).toEqual(0);
      done();
    });
  });

  it('should return one uncomplete TODO', (done: DoneFn) => {
    service.addTodo('first_todo');

    service.uncompleteTodos$.subscribe((list) => {
      expect(list.length).toEqual(1);
      done();
    });
  });

  it('should return none complete TODO', (done: DoneFn) => {
    service.completedTodos$.subscribe((list) => {
      expect(list.length).toEqual(0);
      done();
    });
  });


  it('should return one complete TODO', (done: DoneFn) => {
    service.addTodo('first_todo');
    let firstTodo;
    service.todos$.subscribe((todos) => {
      firstTodo = todos[0];
      done();
    });
    service.setCompleted(firstTodo.id, true);
    service.completedTodos$.subscribe((list) => {
      expect(list.length).toEqual(1);
      done();
    });
  });


  it('should remove the first TODO', (done: DoneFn) => {
    service.addTodo('first_todo');
    service.addTodo('second_todo');
    service.addTodo('third_todo');
    let firstTodo;
    let todosList;
    service.todos$.subscribe((todos) => {
      todosList = todos;
    });
    firstTodo = todosList[0];
    // Remove just the first todo
    service.removeTodo(firstTodo.id);
    expect(todosList).not.toContain(firstTodo);
    done();
  });

  it('should handle remove a TODO that does not exists', (done: DoneFn) => {
    service.addTodo('first_todo');
    service.addTodo('second_todo');
    service.addTodo('third_todo');
    let todosList;
    service.todos$.subscribe((todos) => {
      todosList = todos;
    });
    service.removeTodo('not_exist_id');
    expect(todosList.length).toEqual(3);
    done();
  });
});
