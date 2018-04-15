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
    window.scrollTo(0, 0);
  }

  get birthDate(): string {
    if (this.applicationToEdit.year === '' || this.applicationToEdit.month === '' || this.applicationToEdit.day === '') {
      return '';
    } else {
      return this.applicationToEdit.year + '-' + this.applicationToEdit.month + '-' + this.applicationToEdit.day;
    }
  }

  get passportIssueDate(): string {
    if (this.applicationToEdit.passportIssueDateYear === '' || this.applicationToEdit.passportIssueDateMonth === ''
      || this.applicationToEdit.passportIssueDateDay === '') {
      return '';
    } else {
      return this.applicationToEdit.passportIssueDateYear + '-'
        + this.applicationToEdit.passportIssueDateMonth + '-'
        + this.applicationToEdit.passportIssueDateDay;
    }
  }

  get passportExpirationDate(): string {
    if (this.applicationToEdit.passportExpirationDateYear === '' || this.applicationToEdit.passportExpirationDateMonth === ''
      || this.applicationToEdit.passportExpirationDateDay === '') {
      return '';
    } else {
      return this.applicationToEdit.passportExpirationDateYear + '-'
        + this.applicationToEdit.passportExpirationDateMonth + '-'
        + this.applicationToEdit.passportExpirationDateDay;
    }
  }

  closeApplicationClick(): void {
    this.close.next();
  }
}
