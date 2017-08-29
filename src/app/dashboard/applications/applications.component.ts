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
  @ViewChild('date') date;
  @ViewChild('leader') leader;
  formSubmittedAndNotProcessed = false;

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
      const dateField = this.date.viewModel.date;
      tripDate.date = dateField.year + '-' + ('0' + dateField.month).slice(-2) + '-' + ('0' + dateField.day).slice(-2);
      tripDate.trip_leader = this.leader.viewModel;
      tripDate.status = 'Open';
      this.dataService.submitTripDate(tripDate);

      tripDateForm.reset();
    } else {
      this.formSubmittedAndNotProcessed = true;
    }
  }

  modalClick(tripId: number) {

  }

}
