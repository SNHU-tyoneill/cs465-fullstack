// admin.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  groupData = {
    id: '',
    destination: '',
    nights: 3,
    days: 3,
    startDate: '',
    resort: '',
    perPerson: ''
  };

  onSubmit() {
    console.log('Form submitted:', this.groupData);
    // Add your form submission logic here
  }
}