import { Component, Input, OnInit } from '@angular/core';
import { Application } from '../shared/models/application.model';
import { GroupedApplications } from '../shared/models/grouped-applications.model';

@Component({
  selector: 'app-application-submissions',
  templateUrl: './application-submissions.component.html',
  styleUrls: ['./application-submissions.component.scss']
})
export class ApplicationSubmissionsComponent implements OnInit {
  @Input() applications: Array<Application>;

  constructor() {
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

  private groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

}
