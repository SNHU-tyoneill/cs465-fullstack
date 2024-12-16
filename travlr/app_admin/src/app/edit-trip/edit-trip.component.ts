import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})

export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService,
    private authService: AuthenticationService  // Add this
  ) {}
  
  ngOnInit(): void {
    // First check if user is logged in
    if (!this.authService.isLoggedIn()) {
      console.log('User not logged in, redirecting to login');
      this.router.navigate(['/login']);
      return;
    }

    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    console.log('EditTripComponent::ngOnInit');
    console.log('tripcode:' + tripCode);

    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ["", Validators.required],
      length: ["", Validators.required],
      start: ["", Validators.required],
      resort: ["", Validators.required],
      perPerson: ["", Validators.required],
      image: ["", Validators.required],
      description: ["", Validators.required]
    })

    this.tripDataService.getTrip(tripCode)
      .subscribe({
        next: (value: any) => {
          this.trip = value;
          // Populate our record into the form
          this.editForm.patchValue(value[0]);
          if(!value) {
            this.message = 'No Trip Retrieved!';
          } else {
            this.message = 'Trip: ' + tripCode + ' retrieved!';
          }
          console.log(this.message);
        },
        error:(error: any) => {
          console.log('Error retrieving trip:', error);
          if (error.status === 401) {
            console.log('Auth error - redirecting to login');
            this.authService.logout();
            this.router.navigate(['/login']);
          }
        }
      })
  }

  public onSubmit() {
    if (!this.authService.isLoggedIn()) {
      console.log('User not logged in, redirecting to login');
      this.router.navigate(['/login']);
      return;
    }

    this.submitted = true;
    if(this.editForm.valid) {
      console.log('Submitting updated trip data:', this.editForm.value);
      this.tripDataService.updateTrip(this.editForm.value)
        .subscribe({
          next: (value: any) => {
            console.log('Trip updated successfully:', value);
            this.router.navigate(['/travel-trips']);
          },
          error: (error: any) => {
            console.error('Error updating trip:', error);
            if (error.status === 401) {
              console.log('Auth error - redirecting to login');
              this.authService.logout();
              this.router.navigate(['/login']);
            }
          }
        });
    } else {
      console.log('Form validation errors:', this.editForm.errors);
    }
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }
};