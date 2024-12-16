import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelTripsComponent } from './travel-trips.component';

describe('TravelTripsComponent', () => {
  let component: TravelTripsComponent;
  let fixture: ComponentFixture<TravelTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelTripsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TravelTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
