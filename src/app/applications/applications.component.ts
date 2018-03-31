import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Application } from '../shared/models/application.model';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  @Input() applications: Array<Application>;
  @Output() reloadApplications = new EventEmitter();

  showApplicationView = false;
  selectedApplication: Application;

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
}
