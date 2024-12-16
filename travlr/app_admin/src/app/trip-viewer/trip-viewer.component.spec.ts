import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripViewerComponent } from './trip-viewer.component';

describe('TripViewerComponent', () => {
  let component: TripViewerComponent;
  let fixture: ComponentFixture<TripViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
