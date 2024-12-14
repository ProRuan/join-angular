import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinTitleComponent } from './join-title.component';

describe('JoinTitleComponent', () => {
  let component: JoinTitleComponent;
  let fixture: ComponentFixture<JoinTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
