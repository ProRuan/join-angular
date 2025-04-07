import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardHeadComponent } from './board-head.component';

describe('BoardHeadComponent', () => {
  let component: BoardHeadComponent;
  let fixture: ComponentFixture<BoardHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardHeadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
