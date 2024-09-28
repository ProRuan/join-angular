import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableTaskComponent } from './draggable-task.component';

describe('DraggableTaskComponent', () => {
  let component: DraggableTaskComponent;
  let fixture: ComponentFixture<DraggableTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraggableTaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DraggableTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
