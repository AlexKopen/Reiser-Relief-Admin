import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TripDate } from '../shared/models/trip-date.model';
import { DataService } from '../shared/data.service';
import Swal from 'sweetalert2';
import * as Pikaday from 'pikaday';

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
  tripStatus: string;
  @ViewChild('dateInput') dateInput;
  picker: any;

  loading = false;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.tripLeader = this.selectedTripDate.tripLeader;
    this.tripStatus = this.selectedTripDate.status;
    this.picker = new Pikaday({field: this.dateInput.nativeElement});

    const tripDate = new Date(this.selectedTripDate.date);
    tripDate.setMinutes(tripDate.getMinutes() + tripDate.getTimezoneOffset());
    this.picker.setDate(tripDate);
  }

  get updateDisabled(): boolean {
    return this.tripLeader.length === 0 || this.picker.getDate() === null;
  }

  closeClick(): void {
    this.closeTripDate.next();
  }

  updateClick(): void {
    this.selectedTripDate.tripLeader = this.tripLeader;
    this.selectedTripDate.date = this.picker.getDate();
    this.selectedTripDate.status = this.tripStatus;

    this.loading = true;
    this.dataService.updateTripDate(this.selectedTripDate).subscribe(data => this.sendUpdate());
  }

  changeTripStatusClick(): void {
    switch (this.tripStatus) {
      case 'Open':
        this.tripStatus = 'Closed';
        break;
      case 'Closed':
        this.tripStatus = 'Open';
        break;
      default:
        break;
    }
  }

  get oppositeTripStatus(): string {
    return this.tripStatus === 'Open' ? 'Closed' : 'Open';
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
