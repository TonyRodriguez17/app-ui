import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrapperComponent } from './strapper.component';

describe('StrapperComponent', () => {
  let component: StrapperComponent;
  let fixture: ComponentFixture<StrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
