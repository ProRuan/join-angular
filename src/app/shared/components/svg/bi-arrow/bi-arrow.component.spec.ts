import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiArrowComponent } from './bi-arrow.component';

describe('BiArrowComponent', () => {
  let component: BiArrowComponent;
  let fixture: ComponentFixture<BiArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiArrowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BiArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
