import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';


@Injectable()
export class DataReminderProvider {

  constructor(public storage: Storage) {
    console.log('Hello ReminderProvider Provider');
  }

  getData(): Promise<any> {
    return this.storage.get('reminders');
  }

  save(data): void {
    this.storage.set('reminders', data);
  }

}

// let data = {
//   id: useId,
//   event: this.notifyEvent,
//   scheduleFrequency: "One Time",
//   scheduleTime: formattedTime
// };
