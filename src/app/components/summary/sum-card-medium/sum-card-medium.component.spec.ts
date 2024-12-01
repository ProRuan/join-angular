import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumCardMediumComponent } from './sum-card-medium.component';

describe('SumCardMediumComponent', () => {
  let component: SumCardMediumComponent;
  let fixture: ComponentFixture<SumCardMediumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumCardMediumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SumCardMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
