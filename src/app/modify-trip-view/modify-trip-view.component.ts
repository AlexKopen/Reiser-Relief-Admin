import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TripDate } from '../shared/models/trip-date.model';

@Component({
  selector: 'app-modify-trip-view',
  templateUrl: './modify-trip-view.component.html',
  styleUrls: ['./modify-trip-view.component.scss']
})
export class ModifyTripViewComponent implements OnInit {
  @Input() selectedTripDate: TripDate;
  @Output() closeTripDate = new EventEmitter();
  @Output() updateTripDate = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  closeClick(): void {
    this.closeTripDate.next();
  }

  updateClick(): void {
    this.updateTripDate.next();
  }
}
