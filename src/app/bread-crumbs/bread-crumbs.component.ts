import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss']
})
export class BreadCrumbsComponent implements OnInit {
  @Input() crumbArray: string[];

  constructor() {}

  ngOnInit() {}

  get crumbs(): string {
    return this.crumbArray.join(' / ');
  }
}
