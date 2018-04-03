import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TripDate } from '../shared/models/trip-date.model';
import { DataService } from '../shared/data.service';
import Swal from 'sweetalert2';

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
  tripDate: string;
  tripStatus: string;
  @ViewChild('dateInput') dateInput;

  loading = false;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.tripLeader = this.selectedTripDate.tripLeader;
    this.tripDate = this.selectedTripDate.date;

    const flatPicker = require('flatpickr');
    flatPicker(this.dateInput.nativeElement, {'defaultDate': this.tripDate});
  }

  get updateDisabled(): boolean {
    return this.tripLeader.length === 0 || this.tripDate.length === 0;
  }

  closeClick(): void {
    this.closeTripDate.next();
  }

  updateClick(): void {
    this.selectedTripDate.tripLeader = this.tripLeader;
    this.selectedTripDate.date = this.tripDate;
    this.selectedTripDate.status = this.tripStatus;

    this.loading = true;
    this.dataService.updateTripDate(this.selectedTripDate).subscribe(data => this.sendUpdate());
  }

  changeTripStatusClick(): void {
    switch (this.selectedTripDate.status) {
      case 'Open':
        this.tripStatus = 'Closed';
        break;
      case 'Closed':
        this.tripStatus = 'Open';
        break;
      default:
        break;
    }

    this.selectedTripDate.status = this.tripStatus;
  }

  get oppositeTripStatus(): string {
    return this.selectedTripDate.status === 'Open' ? 'Closed' : 'Open';
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
