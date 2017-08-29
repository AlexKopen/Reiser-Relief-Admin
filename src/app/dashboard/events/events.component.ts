import {Component, OnInit} from '@angular/core';
import {DataService} from '../../shared/data.service';
import {Subscription} from 'rxjs/Subscription';
import {EventEntry} from '../../shared/models/event-entry.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  contentKTWT: string;
  contentGTTMD: string;
  private allEventData: Array<EventEntry>;
  private eventSubscription: Subscription;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getAllEvents();
    this.allEventData = this.dataService.allEvents;
    this.getEventData();
    this.eventSubscription = this.dataService.allEventsSubject.subscribe((value) => {
      this.allEventData = value;
      this.getEventData();
    });

    this.dataService.setTab();
  }

  submitEvent() {
    this.setEventData();
    this.dataService.submitAllEvents(this.allEventData);
  }

  private getEventData() {
    for (const currentEvent of this.allEventData) {
      switch (currentEvent.title.toLowerCase()) {
        case 'keep the wheel turning':
          this.contentKTWT = currentEvent.content;
          break;
        case 'give to the max day':
          this.contentGTTMD = currentEvent.content;
          break;
      }
    }
  }

  private setEventData() {
    for (const currentEvent of this.allEventData) {
      switch (currentEvent.title.toLowerCase()) {
        case 'keep the wheel turning':
          currentEvent.content = this.contentKTWT;
          break;
        case 'give to the max day':
          currentEvent.content = this.contentGTTMD;
          break;
      }
    }
  }

}
