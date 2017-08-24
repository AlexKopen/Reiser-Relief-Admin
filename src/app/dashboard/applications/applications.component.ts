import {Component, OnInit} from '@angular/core';
import {Application} from '../../shared/models/application.model';
import {DataService} from '../../shared/data.service';
import {Subscription} from 'rxjs/Subscription';
import {ApplicationDate} from '../../shared/models/application-date.model';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  applicationDates: Array<ApplicationDate>;
  private applicationDatesSubscription: Subscription;
  applications: Array<Application>;
  private applicationsSubscription: Subscription;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getAllApplications();
    this.applications = this.dataService.allApplications;
    this.applicationsSubscription = this.dataService.allApplicationsSubject.subscribe((value) => {
      this.applications = value;
    });

    this.dataService.getAllApplicationDates();
    this.applicationDates = this.dataService.allApplicationDates;
    this.applicationDatesSubscription = this.dataService.allApplicationDatesSubject.subscribe((value) => {
      this.applicationDates = value;
    });
  }

}
