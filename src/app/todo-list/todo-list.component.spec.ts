import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from './todo-list.component';
import { TodosComponent } from '../todos/todos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent, TodosComponent],
      imports: [FormsModule, BrowserAnimationsModule,]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should click onCompleted', () => {
    spyOn(component.completed, 'emit').and.callThrough();
    // Add a Todo to show the button
    component.todo = { title: 'MockTodo', id: '1', isCompleted: false };
    fixture.detectChanges();
    const de = fixture.debugElement;
    de.query(By.css('.check')).nativeElement.click();
    fixture.detectChanges();

    expect(component.completed.emit).toHaveBeenCalledWith(true);
  });

  it('should click remove', () => {
    spyOn(component.remove, 'emit').and.callThrough();
    // Add a Todo to show the button
    component.todo = { title: 'MockTodo', id: '1', isCompleted: false };
    fixture.detectChanges();
    fixture.debugElement.query(By.css('.remove-btn')).nativeElement.click();
    fixture.detectChanges();
    // not use toHaveBeenCalledWith cause the id is a random string
    expect(component.remove.emit).toHaveBeenCalled();
  });

});
