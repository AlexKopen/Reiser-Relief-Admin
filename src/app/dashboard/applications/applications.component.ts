import {Component, OnInit, ViewChild} from '@angular/core';
import {Application} from '../../shared/models/application.model';
import {DataService} from '../../shared/data.service';
import {Subscription} from 'rxjs/Subscription';
import {TripDate} from '../../shared/models/trip-date.model';
import {FormGroup} from '@angular/forms';
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  tripDates: Array<TripDate>;
  private tripDatesSubscription: Subscription;
  applications: Array<Application>;
  private applicationsSubscription: Subscription;
  @ViewChild('tripDateField') tripDateField;
  @ViewChild('leaderField') leaderField;
  formSubmittedAndNotProcessed = false;
  showModal = false;
  currentModalTripId: number;
  currentModalTrip: TripDate;
  changeLeaderInput: string;
  changeDateInput: string;

  myDatePickerOptions: IMyDpOptions = {
    // other options...
    //dateFormat: 'dd.mm.yyyy',
  };

  // Initialized to specific date (09.10.2018).
  model: Object;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getAllApplications();
    this.applications = this.dataService.allApplications;
    this.applicationsSubscription = this.dataService.allApplicationsSubject.subscribe((value) => {
      this.applications = value;
    });

    this.dataService.getAllTripDates();
    this.tripDates = this.dataService.allTripDates;
    this.tripDatesSubscription = this.dataService.allTripDatesSubject.subscribe((value) => {
      this.tripDates = value;
    });

    this.dataService.setTab();
  }

  onSubmit(tripDateForm: FormGroup) {
    if (tripDateForm.valid) {
      const tripDate = new TripDate();
      const dateField = this.tripDateField.viewModel.date;
      tripDate.date = dateField.year + '-' + ('0' + dateField.month).slice(-2) + '-' + ('0' + dateField.day).slice(-2);
      tripDate.trip_leader = this.leaderField.viewModel;
      tripDate.status = 'Open';
      this.dataService.submitTripDate(tripDate);

      tripDateForm.reset();
    } else {
      this.formSubmittedAndNotProcessed = true;
    }
  }

  modalOpenClick(tripId: number) {
    this.currentModalTripId = tripId;
    this.getCurrentModalTrip();
    this.showModal = true;
  }

  modalCloseClick() {
    this.showModal = false;
  }

  getOppositeStatus() {
    return this.currentModalTrip.status === 'Full' ? 'Open' : 'Full';
  }

  deleteTrip() {
    this.dataService.deleteTrip(this.currentModalTrip);
  }

  changeStatus() {
    this.currentModalTrip.status = this.currentModalTrip.status === 'Full' ? 'Open' : 'Full';
    this.updateTrip();
  }

  updateTrip() {
    const tripDate = new TripDate();
    tripDate.date = this.changeDateInput;
    tripDate.trip_leader = this.changeLeaderInput;
    tripDate.status = this.currentModalTrip.status;
    tripDate.id = this.currentModalTripId;
    this.dataService.submitTripDate(tripDate);
  }

  private getCurrentModalTrip() {
    // This only works in IE 11 :(
    // this.tripDates.find(x => x.id === this.currentModalTripId).status;

    for (const currentModalTrip of this.tripDates) {
      if (currentModalTrip.id === this.currentModalTripId) {
        this.currentModalTrip = currentModalTrip;
      }
    }

    this.changeLeaderInput = this.currentModalTrip.trip_leader;
    this.changeDateInput = this.currentModalTrip.date;

  }

}
