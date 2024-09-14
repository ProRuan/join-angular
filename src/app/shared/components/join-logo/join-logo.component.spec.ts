import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinLogoComponent } from './join-logo.component';

describe('JoinLogoComponent', () => {
  let component: JoinLogoComponent;
  let fixture: ComponentFixture<JoinLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinLogoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JoinLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
