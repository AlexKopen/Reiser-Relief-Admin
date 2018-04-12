import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from '../shared/data.service';
import { TripDate } from '../shared/models/trip-date.model';
import Swal from 'sweetalert2';
import * as flatpickr from 'flatpickr';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent implements OnInit {
  @Output() reloadTrips = new EventEmitter();
  tripLeader = '';
  tripDate = '';
  @ViewChild('tripDateElement') tripDateElement;
  flatpickrInstance: any;
  flatpickrInstantiation: any;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.flatpickrInstance = flatpickr;
    this.flatpickrInstantiation = this.flatpickrInstance(this.tripDateElement.nativeElement, {});
  }

  get disabled(): boolean {
    return this.tripLeader.length === 0 || this.tripDate.length === 0;
  }

  submitClick(): void {
    const tripDate = new TripDate(null, this.tripLeader, 'Open', this.tripDate);
    this.tripLeader = '';
    this.tripDate = '';
    this.flatpickrInstantiation.clear();

    this.dataService.submitTripDate(tripDate).subscribe(data => this.submitClickCallback());
  }

  submitClickCallback(): void {
    this.reloadTrips.next();
    Swal(
      'Trip Date Added ',
      '',
      'success'
    );
  }
}
