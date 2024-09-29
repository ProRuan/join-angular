import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewableContactComponent } from './viewable-contact.component';

describe('ViewableContactComponent', () => {
  let component: ViewableContactComponent;
  let fixture: ComponentFixture<ViewableContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewableContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewableContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
