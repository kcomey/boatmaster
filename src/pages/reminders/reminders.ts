import { Component } from '@angular/core';
import { Events, AlertController, IonicPage, NavController, Platform } from 'ionic-angular';
import { AddReminderPage } from '../add-reminder/add-reminder';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DataReminderProvider } from '../../providers/data-reminder/data-reminder';

@IonicPage()
@Component({
  selector: 'page-reminders',
  templateUrl: 'reminders.html',
})
export class RemindersPage {
  frequency: string = "Daily";
  reminders: any = [];
  showReminders: boolean = false;
  todayTime = new Date(new Date().getTime());

  constructor(public events: Events, public dataService: DataReminderProvider, public alertCtrl: AlertController,public localNotifications: LocalNotifications, public navCtrl: NavController, public platform: Platform) {
    events.subscribe('reminders', (reminders)=> {
      this.reminders = reminders;
    });
    events.subscribe('showReminders', (show)=> {
      this.showReminders = show;
    });
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      console.log('ion view did load');
      this.dataService.getData().then((reminders) => {
        if (reminders != null) {
          reminders.forEach(item => {
            if (item.scheduleTime < this.todayTime && item.scheduleFrequency == "One Time") {
              console.log('do not add to the array, it must be expired');
            }
            else {
              this.reminders.push(item);
              this.showReminders = true;
            }
          });
        }
      });
    });
  }

  addReminder() {
    console.log('time is ' + this.frequency);
    this.navCtrl.push(AddReminderPage, { type: this.frequency });
  }

  deleteAllReminders(){
     this.localNotifications.cancelAll();
     this.reminders= [];
     this.dataService.save(this.reminders);
     this.showReminders = false;
  
     let alert = this.alertCtrl.create({
         title: 'All notifications cancelled',
         buttons: ['OK']
     });
  
     alert.present();
   }

   deleteReminder(id){
    // cancel(notificationId)
     this.localNotifications.cancel(id);
  
     let alert = this.alertCtrl.create({
         title: 'Notification cancelled',
         buttons: ['Ok']
     });
  
     alert.present();
   }
  
  

}
