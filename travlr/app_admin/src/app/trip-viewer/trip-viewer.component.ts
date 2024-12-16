import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-viewer',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './trip-viewer.component.html',
  styleUrl: './trip-viewer.component.css'
})
export class TripViewerComponent implements OnInit {
  public loading: boolean = true;
  public error: string | null = null;
  public trip: Trip | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit() {
    const tripCode = this.route.snapshot.paramMap.get('code');
    if (!tripCode) {
      this.router.navigate(['/']);
      return;
    }

    this.tripService.getTrip(tripCode).subscribe({
      next: (tripData: any) => {
        this.trip = tripData[0]; // Assuming getTrip returns an array
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error fetching trip:', err);
        this.error = 'Failed to load trip details';
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/']); // Navigate back to home page
  }
}