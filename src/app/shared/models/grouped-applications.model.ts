import { Application } from './application.model';

export class GroupedApplications {
  constructor(public tripDate: string,
              public applications: Array<Application>) {
  }
}
