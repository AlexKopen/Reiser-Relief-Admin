import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Application } from '../shared/models/application.model';
import { TripDate } from '../shared/models/trip-date.model';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  @Input() applications: Array<Application>;
  @Input() tripDates: Array<TripDate>;
  @Output() reloadApplications = new EventEmitter();
  @Output() reloadTripDates = new EventEmitter();

  showApplicationView = false;
  selectedApplication: Application;

  showModifyTripView = false;
  selectedTripDate: TripDate;

  constructor() {
  }

  ngOnInit() {
  }

  viewApplication(application: Application): void {
    this.selectedApplication = application;
    this.showApplicationView = true;
  }

  deleteApplication(): void {
    this.reloadApplications.next();
  }

  applicationClose(): void {
    this.showApplicationView = false;
    this.selectedApplication = null;
  }

  tripDateClose(): void {
    this.showModifyTripView = false;
    this.selectedTripDate = null;
  }

  modifyTripDate(tripDate: TripDate): void {
    this.selectedTripDate = tripDate;
    this.showModifyTripView = true;
  }

  updateTripDates(): void {
    this.tripDateClose();
    this.reloadTripDates.next();
  }
}
