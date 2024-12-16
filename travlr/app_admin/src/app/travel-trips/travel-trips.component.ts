import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripDataService } from '../services/trip-data.service';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-travel-trips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './travel-trips.component.html',
  styleUrl: './travel-trips.component.css',
})
export class TravelTripsComponent implements OnInit {
  trips: any[] = [];

  constructor(
    private tripDataService: TripDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch trip data on component initialization
    this.tripDataService.getTrips().subscribe({
      next: (data: any) => {
        this.trips = data;
      },
      error: (err: any) => {
        console.error('Error fetching trips:', err);
      },
    });
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  onEdit(tripCode: string): void {
    // Store tripCode and navigate to Edit page
    localStorage.setItem('tripCode', tripCode);
    this.router.navigate(['/edit-trip']);
  }

  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  // onDelete(tripCode: string): void {
  //   if (confirm('Are you sure you want to delete this trip?')) {
  //     this.tripDataService.deleteTrip(tripCode).subscribe({
  //       next: () => {
  //         this.trips = this.trips.filter((trip) => trip.code !== tripCode);
  //         console.log('Trip deleted successfully');
  //       },
  //       error: (err: any) => {
  //         console.error('Error deleting trip:', err);
  //       },
  //     });
  //   }
  // }
}
