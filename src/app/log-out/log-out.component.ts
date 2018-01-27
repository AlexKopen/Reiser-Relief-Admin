import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {DataService} from '../shared/data.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent implements OnInit {

  constructor(private dataService: DataService, private authService: AuthService) { }

  ngOnInit() {
    this.dataService.setShowNavBar(false);
    this.authService.logout();
  }

}
