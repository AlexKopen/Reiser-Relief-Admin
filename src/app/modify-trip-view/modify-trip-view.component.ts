import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TripDate } from '../shared/models/trip-date.model';
import { DataService } from '../shared/data.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-modify-trip-view',
  templateUrl: './modify-trip-view.component.html',
  styleUrls: ['./modify-trip-view.component.scss']
})
export class ModifyTripViewComponent implements OnInit {
  @Input() selectedTripDate: TripDate;
  @Output() closeTripDate = new EventEmitter();
  @Output() updateTripDate = new EventEmitter();

  tripLeader: string;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.tripLeader = this.selectedTripDate.tripLeader;
  }

  get updateDisabled(): boolean {
    return this.tripLeader.length === 0;
  }

  closeClick(): void {
    this.closeTripDate.next();
  }

  updateClick(): void {
    this.selectedTripDate.tripLeader = this.tripLeader;
    this.dataService.updateTripDate(this.selectedTripDate).subscribe(data => this.sendUpdate());
  }

  private sendUpdate(): void {
    this.updateTripDate.next();

    Swal(
      'Trip Updated',
      '',
      'success'
    );

    this.closeClick();
  }
}
