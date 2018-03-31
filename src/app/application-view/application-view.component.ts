import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Application } from '../shared/models/application.model';

@Component({
  selector: 'app-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.scss']
})
export class ApplicationViewComponent implements OnInit {
  @Input() applicationToEdit: Application;
  @Output() close = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  get birthDate(): string {
    return this.applicationToEdit.year + '-' + this.applicationToEdit.month + '-' + this.applicationToEdit.day;
  }

  get passportIssueDate(): string {
    return this.applicationToEdit.passportIssueDateYear + '-'
      + this.applicationToEdit.passportIssueDateMonth + '-'
      + this.applicationToEdit.passportIssueDateDay;
  }

  get passportExpirationDate(): string {
    return this.applicationToEdit.passportExpirationDateYear + '-'
      + this.applicationToEdit.passportExpirationDateMonth + '-'
      + this.applicationToEdit.passportExpirationDateDay;
  }

  closeApplicationClick(): void {
    this.close.next();
  }
}
