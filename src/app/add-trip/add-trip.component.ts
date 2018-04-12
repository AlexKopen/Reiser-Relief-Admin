import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from '../shared/data.service';
import { TripDate } from '../shared/models/trip-date.model';
import Swal from 'sweetalert2';
import * as Pikaday from 'pikaday';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent implements OnInit {
  @Output() reloadTrips = new EventEmitter();
  @Output() tripUpdating = new EventEmitter();
  tripLeader = '';
  @ViewChild('tripDateElement') tripDateElement;
  picker: any;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.picker = new Pikaday({field: this.tripDateElement.nativeElement});
  }

  get disabled(): boolean {
    return this.tripLeader.length === 0 || this.picker.getDate() === null;
  }

  submitClick(): void {
    const tripDate = new TripDate(null, this.tripLeader, 'Open', this.picker.getDate());
    this.tripLeader = '';
    this.picker.setDate('');

    this.tripUpdating.next(true);
    this.dataService.submitTripDate(tripDate).subscribe(data => this.submitClickCallback());
  }

  submitClickCallback(): void {
    this.tripUpdating.next(false);
    this.reloadTrips.next();
    Swal(
      'Trip Date Added ',
      '',
      'success'
    );
  }
}
