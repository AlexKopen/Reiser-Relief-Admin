import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../../../shared/models/application.model';

@Component({
  selector: 'app-single-application',
  templateUrl: './single-application.component.html',
  styleUrls: ['./single-application.component.scss']
})
export class SingleApplicationComponent implements OnInit {
  @Input() currentApplication: Application;

  constructor() { }

  ngOnInit() {
  }

}
