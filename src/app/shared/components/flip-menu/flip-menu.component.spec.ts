import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipMenuComponent } from './flip-menu.component';

describe('FlipMenuComponent', () => {
  let component: FlipMenuComponent;
  let fixture: ComponentFixture<FlipMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlipMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlipMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
