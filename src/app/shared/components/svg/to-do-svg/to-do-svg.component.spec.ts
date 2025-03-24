import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoSvgComponent } from './to-do-svg.component';

describe('ToDoSvgComponent', () => {
  let component: ToDoSvgComponent;
  let fixture: ComponentFixture<ToDoSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToDoSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
