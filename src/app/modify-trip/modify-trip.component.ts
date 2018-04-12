import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TripDate } from '../shared/models/trip-date.model';
import { DataService } from '../shared/data.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modify-trip',
  templateUrl: './modify-trip.component.html',
  styleUrls: ['./modify-trip.component.scss']
})
export class ModifyTripComponent implements OnInit {
  @Input() tripDates: Array<TripDate>;
  @Output() reloadTripDates = new EventEmitter();
  @Output() modifyTripDate = new EventEmitter();
  @Output() tripUpdating = new EventEmitter();

  showOldValue = false;

  constructor(private dataService: DataService, private datePipe: DatePipe) {
  }

  ngOnInit() {
  }

  editTripDate(tripDate: TripDate): void {
    this.modifyTripDate.next(tripDate);
  }

  deleteTripDate(tripDate: TripDate): void {
    Swal({
      title: 'Are you sure you want to delete the trip of ' +
      this.datePipe.transform(tripDate.date, 'EEEE, MMMM d, y') + '?',
      text: 'This trip will no longer appear on the website.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        window.scrollTo(0, 0);
        this.tripUpdating.next(true);
        this.dataService.deleteTripDate(tripDate).subscribe(data => this.updateTripCallback('Deleted'));
      }
    });
  }

  updateTripStatus(tripDate: TripDate): void {
    const oppositeStatus = this.getOppositeStatus(tripDate.status);

    Swal({
      title: 'Are you sure you want to mark this trip as "' + oppositeStatus + '"?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, change it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        window.scrollTo(0, 0);
        this.tripUpdating.next(true);
        tripDate.status = oppositeStatus;
        this.dataService.updateTripDate(tripDate).subscribe(data => this.updateTripCallback('Updated'));
      }
    });

  }

  updateTripCallback(finalWord: string): void {
    this.tripUpdating.next(false);
    this.reloadTripDates.next();
    Swal(
      'Trip Date ' + finalWord,
      '',
      'success'
    );
  }

  oppositeTripStatus(tripDate: TripDate): string {
    return this.getOppositeStatus(tripDate.status);
  }

  private getOppositeStatus(status: string): string {
    switch (status) {
      case 'Open':
        return 'Closed';
      case 'Closed':
        return 'Open';
      default:
        break;
    }
  }

  showOnToggle(date: string): boolean {
    return new Date(date) < new Date();
  }

  showOldToggle(): void {
    this.showOldValue = !this.showOldValue;
  }
}
