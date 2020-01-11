import { Component, OnInit } from '@angular/core';
import { faFile, faNewspaper } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faNewspaper = faNewspaper;
  faFile = faFile;

  constructor() {}

  ngOnInit() {}
}
