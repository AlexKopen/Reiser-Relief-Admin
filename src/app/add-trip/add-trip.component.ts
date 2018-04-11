import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { TripDate } from '../shared/models/trip-date.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent implements OnInit {
  tripLeader = '';
  tripDate = '';

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  get disabled(): boolean {
    return this.tripLeader.length === 0 || this.tripDate.length === 0;
  }

  submitClick(): void {
    const tripDate = new TripDate(null, this.tripLeader, 'Open', this.tripDate);
    this.tripLeader = '';
    this.tripDate = '';

    this.dataService.submitTripDate(tripDate).subscribe(data => this.submitClickCallback());
  }

  submitClickCallback(): void {
    Swal(
      'Trip Date Added ',
      '',
      'success'
    );
  }
}
