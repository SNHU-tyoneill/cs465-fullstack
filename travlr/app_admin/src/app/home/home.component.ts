import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public destinations = [
    { name: 'Grand Canyon', image: '/assets/images/destination1.jpg', code: 'GC101' },
    { name: 'Maui', image: '/assets/images/destination2.jpg', code: 'MA102' },
    { name: 'Rome', image: '/assets/images/destination3.jpg', code: '234' },
    { name: 'Yellowstone National Park', image: '/assets/images/destination4.jpg', code: 'YN104' },
    { name: 'Glacier National Park', image: '/assets/images/destination5.jpg', code: 'GN105' },
    { name: 'Cape Cod', image: '/assets/images/destination6.jpg', code: 'CC106' },
    { name: 'New Orleans', image: '/assets/images/destination7.jpg', code: 'NO107' },
    { name: 'Amsterdam', image: '/assets/images/destination8.jpg', code: 'AM108' },
    { name: 'Amalfi Coast', image: '/assets/images/destination9.jpg', code: 'AC109' },
  ];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  onDestinationClick(tripCode: string) {
    this.router.navigate(['/trip', tripCode])
  }
}
