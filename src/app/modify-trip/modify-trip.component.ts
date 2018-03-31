import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TripDate } from '../shared/models/trip-date.model';

@Component({
  selector: 'app-modify-trip',
  templateUrl: './modify-trip.component.html',
  styleUrls: ['./modify-trip.component.scss']
})
export class ModifyTripComponent implements OnInit {
  @Input() tripDates: Array<TripDate>;
  @Output() reloadTripDates = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  editTripDate(tripDate: TripDate): void {
    console.log(tripDate);
  }

  deleteTripDate(tripDate: TripDate): void {
    console.log(tripDate);
  }
}
