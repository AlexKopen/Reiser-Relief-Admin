import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../../../shared/models/application.model';

@Component({
  selector: 'app-single-application',
  templateUrl: './single-application.component.html',
  styleUrls: ['./single-application.component.scss']
})
export class SingleApplicationComponent implements OnInit {
  years = new Array<number>();
  days = new Array<number>();
  @Input() currentApplication: Application;

  constructor() { }

  ngOnInit() {
    this.generateYears();
    this.generateDays();
  }

  private generateYears() {
    const currentYear = (new Date()).getFullYear();

    for (let i = currentYear; i >= currentYear - 100; i--) {
      this.years.push(i);
    }
  }

  private generateDays() {
    const currentDay = 31;

    for (let i = currentDay; i >= 1; i--) {
      this.days.push(i);
    }
  }

}
