import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css',
})

export class AddTripComponent implements OnInit {
  public addForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  };

  public onSubmit() {
    console.log('Submit button clicked');
    this.submitted = true;
    console.log('Form valid?:', this.addForm.valid);
    console.log('Form values:', this.addForm.value);
    
    if (this.addForm.valid) {
      console.log('Attempting to add trip...');
      this.tripService.addTrip(this.addForm.value).subscribe({
        next: (data: any) => {
          console.log('Trip successfully added!', data);
          this.router.navigate(['/travel-trips']);
        },
        error: (error: any) => {
          console.error('Error while adding trip:', error);
          if (error.status === 401) {
            console.log('Auth error - redirecting to login');
            this.authService.logout();  // Clear the invalid token
            this.router.navigate(['/login']);
          }
        },
      });
    } else {
      console.log('Form validation errors:', this.addForm.errors);
    }
  };

  // get the form short name to access the form fields
  get f() {
    return this.addForm.controls;
  };

};
