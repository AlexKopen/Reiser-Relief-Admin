import { Component, Input, OnInit } from '@angular/core';
import { Application } from '../shared/models/application.model';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  @Input() applications: Array<Application>;

  showApplicationView = false;

  constructor() {
  }

  ngOnInit() {
  }

}
