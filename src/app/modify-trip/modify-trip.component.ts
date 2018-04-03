import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TripDate } from '../shared/models/trip-date.model';
import { DataService } from '../shared/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modify-trip',
  templateUrl: './modify-trip.component.html',
  styleUrls: ['./modify-trip.component.scss']
})
export class ModifyTripComponent implements OnInit {
  @Input() tripDates: Array<TripDate>;
  @Output() reloadTripDates = new EventEmitter();
  @Output() modifyTripDate = new EventEmitter();

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  editTripDate(tripDate: TripDate): void {
    this.modifyTripDate.next(tripDate);
  }

  deleteTripDate(tripDate: TripDate): void {
    Swal({
      title: 'Are you sure you want to delete the trip for"' + tripDate.date  + '"?',
      text: 'This trip will no longer appear on the website.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.dataService.deleteTripDate(tripDate).subscribe(data => this.updateTripCallback('Deleted'));
      }
    });
  }

  updateTripStatus(tripDate: TripDate): void {
    const oppositeStatus = this.getOppositeStatus(tripDate.status);

    Swal({
      title: 'Are you sure you want to mark this trip as "' + oppositeStatus  + '"?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, change it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        tripDate.status = oppositeStatus;
        this.dataService.updateTripDate(tripDate).subscribe(data => this.updateTripCallback('Updated'));
      }
    });

  }

  updateTripCallback(finalWord: string): void {
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
}
