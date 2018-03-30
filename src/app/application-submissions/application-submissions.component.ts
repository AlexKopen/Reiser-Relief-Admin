import { Component, Input, OnInit } from '@angular/core';
import { Application } from '../shared/models/application.model';

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

}
