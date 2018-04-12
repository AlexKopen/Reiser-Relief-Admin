import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { Application } from '../shared/models/application.model';
import { GroupedApplications } from '../shared/models/grouped-applications.model';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-application-submissions',
  templateUrl: './application-submissions.component.html',
  styleUrls: ['./application-submissions.component.scss']
})
export class ApplicationSubmissionsComponent implements OnInit {
  @Input() applications: Array<Application>;
  @Output() viewApplicationEvent = new EventEmitter();
  @Output() deleteApplicationEvent = new EventEmitter();
  @Output() applicationUpdating = new EventEmitter();

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  get applicationsGroupedByTripDate(): Array<GroupedApplications> {
    const groupedApplications = new Array<GroupedApplications>();
    const groupedValues = this.groupBy(this.applications, 'tripDate');
    const groupedValuesKeys = Object.keys(groupedValues);

    for (let i = 0; i < groupedValuesKeys.length; i++) {
      groupedApplications.push(new GroupedApplications(groupedValuesKeys[i], groupedValues[groupedValuesKeys[i]]));
    }

    return groupedApplications;
  }

  viewApplication(application: Application): void {
    this.viewApplicationEvent.next(application);
  }

  deleteApplication(application: Application): void {
    const fullName = application.first + ' ' + application.middle + ' ' + application.last;
    Swal({
      title: 'Are you sure you want to delete ' + fullName  + '\'s application?',
      text: 'This application will no longer be available for review.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.applicationUpdating.next(true);
        this.dataService.deleteApplication(application).subscribe(data => this.deleteApplicationCallback());
      }
    });
  }

  private deleteApplicationCallback(): void {
    this.applicationUpdating.next(false);
    this.deleteApplicationEvent.next();
    Swal(
      'Application Deleted',
      '',
      'success'
    );
  }

  private groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }
}
